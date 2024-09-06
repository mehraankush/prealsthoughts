interface WeeksRecurrenceProps {
    daysOfWeek: string[];
    selectedDays: number[];
    handleDayToggle: (index: number) => void;
}

const WeeksRecurrence: React.FC<WeeksRecurrenceProps> = ({ daysOfWeek, selectedDays, handleDayToggle }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Select Days of Week</label>
        <div className="mt-2 flex flex-wrap gap-2">
            {daysOfWeek.map((day, index) => (
                <button
                    key={day}
                    onClick={() => handleDayToggle(index)}
                    className={`px-3 py-1 rounded ${selectedDays.includes(index)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    {day}
                </button>
            ))}
        </div>
    </div>
);

export default WeeksRecurrence;