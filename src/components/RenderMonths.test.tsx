import React from 'react';
import { render } from '@testing-library/react';
import RenderMonths from './RenderMonths';
import { describe, it, jest } from '@jest/globals';

describe('RenderMonths Component', () => {
    const mockAddMonths = jest.fn<(date: Date, amount: number) => Date>();
    const mockStartOfYear = jest.fn<(date: Date) => Date>();
    const mockStartOfMonth = jest.fn<(date: Date) => Date>();
    const mockEndOfMonth = jest.fn<(date: Date) => Date>();
    const mockGetDay = jest.fn<(date: Date) => number>();
    const mockIsSameDay = jest.fn<(date1: Date, date2: Date) => boolean>();
    const mockFormat = jest.fn<(date: Date, format: string) => string>();
    const mockAddDays = jest.fn<(date: Date, amount: number) => Date>();

    const selectedDates = [new Date(2023, 8, 15)];
    const startDate = new Date(2023, 0, 1);

    it('renders the RenderMonths component without crashing', () => {
        render(
            <RenderMonths
                addMonths={mockAddMonths}
                startOfYear={mockStartOfYear}
                selectedDates={selectedDates}
                startDate={startDate}
                startOfMonth={mockStartOfMonth}
                endOfMonth={mockEndOfMonth}
                getDay={mockGetDay}
                isSameDay={mockIsSameDay}
                format={mockFormat}
                addDays={mockAddDays}
            />
        );
    });
});
