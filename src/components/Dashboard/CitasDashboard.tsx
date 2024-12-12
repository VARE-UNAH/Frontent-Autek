'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Appointment } from '@/types/appointment';
import { formatDate } from '../../types/utils';
import { Eye, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusUpdateModal } from '../Dashboard/StatusUpdateModal';
import Loader from '../common/Loader';
import { toast } from 'sonner';
import { Chip, Divider } from '@nextui-org/react';

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

  const handleStatusUpdate = async (appointmentId: number, newStatus: number) => {
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
          body: JSON.stringify({ appointment_status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      } else {
        toast.success("Estado Actualizado Correctamente");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };


  if (isLoading) return <div className='h-screen'><Loader></Loader></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id_appointment}
          className="border border-stroke shadow-sm rounded-lg p-4 w-full bg-white space-y-2"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">ID: {appointment.id_appointment}</h4>

            <span className="text-sm text-gray-500">{formatDate(appointment.date)}</span>
          </div>
          <Divider></Divider>
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
            <Chip
              size="sm"
              color={appointment.appointment_status?.name ? (
                appointment.appointment_status?.name === "Agendado"
                  ? "default"
                  : appointment.appointment_status?.name === "En Proceso"
                    ? "primary"
                    : appointment.appointment_status?.name === "Completado"
                      ? "success"
                      : appointment.appointment_status?.name === "Cancelado"
                        ? "danger"
                        : appointment.appointment_status?.name === "Solicitud enviada"
                          ? "warning"
                          : appointment.appointment_status?.name === "Nuevo Presupuesto"
                            ? "secondary"
                            : "default" // Color por defecto para otros casos
              ) : "default"} // Utiliza un color por defecto si el estado es nulo o indefinido
              className="rounded-md"
            >
              {appointment.appointment_status?.name ? appointment.appointment_status.name : "Status no disponible"}
            </Chip>
          </div>
          <div className="flex space-x-2">
            <Link href={`/admin/appointments/${appointment.id_appointment}`}>
              <Button variant="outline" size="sm" color="primary">
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
