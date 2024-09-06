"use client"
import React, { useState, useEffect } from 'react';
import {
    format,
    addDays,
    addMonths,
    addYears,
    startOfMonth,
    endOfMonth,
    getDay,
    isSameDay,
    startOfYear,
    getDate
} from 'date-fns';
import DaysRecurrence from './DaysRecurrence';
import WeeksRecurrence from './WeekRecurrence';
import MonthsRecurrence from './MonthRecurrence';
import RenderMonths from './RenderMonths';


type RecurrenceType = 'days' | 'weeks' | 'months' | 'years';
type PresetFilter = 'custom' | 'daily' | 'monthly' | 'yearly';

interface RecurringDatePickerProps {
    initialStartDate?: Date;
    initialEndDate?: Date;
}

const RecurringDatePicker: React.FC<RecurringDatePickerProps> = ({
    initialStartDate = new Date(),
    initialEndDate,
}) => {
    const [startDate, setStartDate] = useState<Date>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | null>(initialEndDate || null);
    const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>('days');
    const [recurrenceInterval, setRecurrenceInterval] = useState<number>(1);
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [selectedNthDay, setSelectedNthDay] = useState<string>('');
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [activeFilter, setActiveFilter] = useState<PresetFilter>('custom');

    const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        setSelectedDates(generateDates());
    }, [startDate, endDate, recurrenceType, recurrenceInterval, selectedDays, selectedNthDay]);

    const generateDates = (): Date[] => {
        if (!startDate) return [];

        const dates: Date[] = [];
        let currentDate: Date = startOfYear(startDate);

        const endDateToUse: Date = endDate || addYears(currentDate, 100); 

        while (currentDate <= endDateToUse) {
            if (isRecurringDate(currentDate)) {
                dates.push(new Date(currentDate));
            }
            currentDate = addDays(currentDate, 1);
        }

        return dates;
    };

    const isRecurringDate = (date: Date): boolean => {
        if (recurrenceType === 'days') {
            const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            return daysSinceStart % recurrenceInterval === 0;
        } else if (recurrenceType === 'weeks') {
            return selectedDays.includes(getDay(date));
        } else if (recurrenceType === 'months') {
            if (selectedNthDay) {
                const [nth, day] = selectedNthDay.split('-').map(Number);
                return isNthDayOfMonth(date, nth, day);
            }
            return getDate(date) === getDate(startDate);
        } else if (recurrenceType === 'years') {
            return date.getMonth() === startDate.getMonth() && getDate(date) === getDate(startDate);
        }
        return false;
    };

    const isNthDayOfMonth = (date: Date, nth: number, day: number): boolean => {
        const firstDayOfMonth = startOfMonth(date);
        let count = 0;
        let currentDate = firstDayOfMonth;

        while (currentDate <= endOfMonth(date)) {
            if (getDay(currentDate) === day) {
                count++;
                if (count === nth && getDate(date) === getDate(currentDate)) {
                    return true;
                }
            }
            currentDate = addDays(currentDate, 1);
        }
        return false;
    };

    const handleDayToggle = (day: number) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };


    const applyFilter = (filter: PresetFilter) => {
        const today = new Date();
        setActiveFilter(filter);

        switch (filter) {
            case 'daily':
                setRecurrenceType('days');
                setRecurrenceInterval(1);
                setStartDate(today);
                setEndDate(null);
                break;
            case 'monthly':
                setRecurrenceType('months');
                setSelectedNthDay(`${Math.ceil(getDate(today) / 7)}-${getDay(today)}`);
                setStartDate(today);
                setEndDate(null);
                break;
            case 'yearly':
                setRecurrenceType('years');
                setStartDate(today);
                setEndDate(null);
                break;
            default:
                break;
        }
    };

    return (
        <div className="p-5 bg-white ">
            <div className="mb-4">
                <label className="block text-sm font-light text-gray-700">Filters</label>
                <div className="mt-2 flex flex-wrap gap-2">
                    {(['custom', 'daily', 'monthly', 'yearly'] as PresetFilter[]).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => applyFilter(filter)}
                            className={`px-3 py-1 rounded ${activeFilter === filter
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-gray-700'
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex  flex-col sm:flex-row gap-10  justify-between mb-5 text-gray-700'>
                <div className=' flex-1'>
                    <label className=" text-sm font-medium ">Start Date</label>
                    <input
                        type="date"
                        value={format(startDate, 'yyyy-MM-dd')}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                        className="mt-1  w-full rounded-md border-gray-300  shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                </div>

                <div className='flex-1 text-gray-700'>
                    <label className=" text-sm font-light ">End Date <span className='text-xs'>(Optional)</span></label>
                    <input
                        type="date"
                        value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                        className="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between gap-10 mb-5'>

                <div className=" flex-1">
                    <label className="block text-sm font-light text-gray-700">Recurrence Type</label>
                    <select
                        value={recurrenceType}
                        onChange={(e) => setRecurrenceType(e.target.value as RecurrenceType)}
                        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                    </select>
                </div>

                <div className='flex-1'>
                    {recurrenceType === 'days' && (
                        <DaysRecurrence
                            recurrenceInterval={recurrenceInterval}
                            setRecurrenceInterval={setRecurrenceInterval}
                        />
                    )}

                    {recurrenceType === 'weeks' && (
                        <WeeksRecurrence
                            daysOfWeek={daysOfWeek}
                            selectedDays={selectedDays}
                            handleDayToggle={handleDayToggle}
                        />
                    )}

                    {recurrenceType === 'months' && (
                        <MonthsRecurrence
                            daysOfWeek={daysOfWeek}
                            selectedNthDay={selectedNthDay}
                            setSelectedNthDay={setSelectedNthDay}
                        />
                    )}
                </div>

            </div>


            <RenderMonths
                addMonths={addMonths}
                startOfYear={startOfYear}
                selectedDates={selectedDates}
                startDate={startDate}
                startOfMonth={startOfMonth}
                endOfMonth={endOfMonth}
                getDay={getDay}
                isSameDay={isSameDay}
                format={format}
                addDays={addDays}
            />

        </div>
    );
};

export default RecurringDatePicker;
