'use client'
import Calendar from "@/components/Calender";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useValidateToken } from "@/services/user/authService";

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default CalendarPage;
