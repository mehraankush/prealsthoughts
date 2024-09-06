import React from "react";

interface DaysRecurrenceProps {
    recurrenceInterval: number;
    setRecurrenceInterval: (value: number) => void;
}

const DaysRecurrence: React.FC<DaysRecurrenceProps> = ({ recurrenceInterval, setRecurrenceInterval }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">Every X Days</label>
        <input
            type="number"
            min="1"
            value={recurrenceInterval}
            onChange={(e) => setRecurrenceInterval(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
        />
    </div>
);

export default DaysRecurrence;