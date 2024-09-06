import React from 'react'
import Slider from 'react-slick'

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type RenderMonthsProps = {
    addMonths: (date: Date, amount: number) => Date,
    startOfYear: (date: Date) => Date,
    selectedDates: Date[],
    startDate: Date,
    startOfMonth: (date: Date) => Date,
    endOfMonth: (date: Date) => Date,
    getDay: (date: Date) => number,
    isSameDay: (date1: Date, date2: Date) => boolean,
    format: (date: Date, format: string) => string,
    addDays: (date: Date, amount: number) => Date,
}

const RenderMonths: React.FC<RenderMonthsProps> = ({
    addMonths,
    startOfYear,
    selectedDates,
    startDate,
    startOfMonth,
    endOfMonth,
    getDay,
    isSameDay,
    format,
    addDays,
}) => {

    const renderMonth = (month: Date) => {
        const firstDayOfMonth = startOfMonth(month);
        const lastDayOfMonth = endOfMonth(month);
        const startingDayOfWeek = getDay(firstDayOfMonth);
        const daysInMonth: JSX.Element[] = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            daysInMonth.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        let currentDay = firstDayOfMonth;
        while (currentDay <= lastDayOfMonth) {
            const isSelected = selectedDates.some((date: Date) => isSameDay(date, currentDay));
            daysInMonth.push(
                <div
                    key={format(currentDay, 'yyyy-MM-dd')}
                    className={`p-2 text-center text-sm ${isSelected
                        ? 'bg-orange-500 text-white rounded-full'
                        : 'text-gray-700'
                        }`}
                >
                    {format(currentDay, 'd')}
                </div>
            );
            currentDay = addDays(currentDay, 1);
        }


        return (
            <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{format(month, 'MMMM yyyy')}</h3>
                <div className="grid grid-cols-7 gap-1">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-center font-medium text-sm text-gray-500">{day}</div>
                    ))}
                    {daysInMonth}
                </div>
            </div>
        );
    };


    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    return (
        <>
            <h3 className="text-sm font-light text-gray-900 mb-2">Selected Dates</h3>
            <Slider {...sliderSettings}>
                {Array.from({ length: 12 }, (_, i) => addMonths(startOfYear(startDate), i)).map((month) => (
                    <div key={format(month, 'yyyy-MM')}>
                        {renderMonth(month)}
                    </div>
                ))}
            </Slider>
        </>
    )
}

export default RenderMonths