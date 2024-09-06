interface MonthsRecurrenceProps {
    daysOfWeek: string[];
    selectedNthDay: string;
    setSelectedNthDay: (value: string) => void;
}

const MonthsRecurrence: React.FC<MonthsRecurrenceProps> = ({ daysOfWeek, selectedNthDay, setSelectedNthDay }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Select Nth Day of Month</label>
        <select
            value={selectedNthDay}
            onChange={(e) => setSelectedNthDay(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 text-gray-700"
        >
            <option value="">Select...</option>
            {[1, 2, 3, 4].map(nth => (
                daysOfWeek.map((day, index) => (
                    <option key={`${nth}-${index}`} value={`${nth}-${index}`}>
                        {nth}{['st', 'nd', 'rd', 'th'][nth - 1]} {day}
                    </option>
                ))
            ))}
        </select>
    </div>
);

export default MonthsRecurrence;