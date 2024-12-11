'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Appointment } from '@/types/appointment';
import { formatDate } from '../../types/utils';
import { Eye, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusUpdateModal } from '../Dashboard/StatusUpdateModal';
import Loader from '../common/Loader';

export function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/show/all/`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError('An error occurred while fetching appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
  
      if (!token) {
        throw new Error('No hay token');
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/${appointmentId}/status/update/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appointment_status: 1}),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };
  

  if (isLoading) return <Loader></Loader>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id_appointment}
          className="border rounded-lg p-4 bg-white shadow-md space-y-2"
        >
          <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold">ID: {appointment.id_appointment}</h4>

            <span className="text-sm text-gray-500">{formatDate(appointment.date)}</span>
          </div>
          <div className="text-sm text-gray-700">
            <p>
              <strong>User:</strong> {appointment.user.first_name}
            </p>
            <p>
              <strong>Car:</strong> {`${appointment.car.brand} ${appointment.car.model}`}
            </p>
            <p>
              <strong>Workshop:</strong> {appointment.workshops.name}
            </p>
            <p>
              <strong>Status:</strong> {appointment.appointment_status?.name || 'No status'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href={`/admin/citas/${appointment.id_appointment}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </div>
      ))}

      {selectedAppointment && (
        <StatusUpdateModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
