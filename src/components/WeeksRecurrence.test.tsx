import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeeksRecurrence from './WeekRecurrence';
import { describe, expect, it, jest } from '@jest/globals';
import '@testing-library/jest-dom';

const mockHandleDayToggle = jest.fn();

describe('WeeksRecurrence Integration Test', () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    it('should correctly handle day toggling and update button styles', () => {
        const { rerender } = render(
            <WeeksRecurrence
                daysOfWeek={daysOfWeek}
                selectedDays={[0, 2]} 
                handleDayToggle={mockHandleDayToggle}
            />
        );

        daysOfWeek.forEach((day, index) => {
            const button = screen.getByText(day);
            const isSelected = [0, 2].includes(index); 
            expect(button).toBeInTheDocument();
            expect(button).toHaveClass(isSelected ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700');
        });


        const buttonToClick = screen.getByText('Wed');
        fireEvent.click(buttonToClick);


        expect(mockHandleDayToggle).toHaveBeenCalledWith(3);
        expect(mockHandleDayToggle).toHaveBeenCalledTimes(1);


        rerender(
            <WeeksRecurrence
                daysOfWeek={daysOfWeek}
                selectedDays={[0, 2, 3]} 
                handleDayToggle={mockHandleDayToggle}
            />
        );

        daysOfWeek.forEach((day, index) => {
            const button = screen.getByText(day);
            const isSelected = [0, 2, 3].includes(index); // Check updated selected days
            expect(button).toHaveClass(isSelected ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700');
        });
    });
});
