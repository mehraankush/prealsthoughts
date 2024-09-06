import RecurringDatePicker from "@/components/CalenderPicker";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="w-full sm:w-[500px]">
        <RecurringDatePicker
          initialStartDate={new Date()}
          initialEndDate={new Date(2024, 11, 31)}
        />
      </div>
    </main>
  );
}
