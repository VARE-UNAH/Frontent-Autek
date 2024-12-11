'use client'
import Calendar from "@/components/Calender";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";
import { useValidateToken } from "@/services/user/authService";

const CalendarPage = () => {
  return (
    <ProtectedLayout>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </ProtectedLayout>
  );
};

export default CalendarPage;
