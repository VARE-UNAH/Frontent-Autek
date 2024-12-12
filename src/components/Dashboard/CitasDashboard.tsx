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
import { Chip, Divider, Input, Select, SelectItem } from '@nextui-org/react';
type AppointmentStatus = 'Agendado' | 'En Proceso' | 'Completado' | 'Cancelado' | 'Solicitud enviada' | 'Nuevo Presupuesto';

export function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'Todas'>('Todas')

  const filteredAppointments = appointments
  .filter(appointment =>
    (
      appointment.workshops?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.car?.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.car?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.car?.license_plate?.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (statusFilter === 'Todas' || appointment.appointment_status?.name === statusFilter)
  )
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    <div className="space-y-2">
      <Input
        label="Buscar"
        isClearable
        variant="bordered"
        color="primary"
        radius="lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-sm",
            "bg-white",
            "rounded-lg",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "!cursor-text",
          ],
        }}
        placeholder="Buscar por lugar, vehciulo..."
        startContent={
          <i className="fa-solid fa-magnifying-glass text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"></i>
        }
      />
      <Select
        placeholder="Filtar por Estado"
        className="mb-2 rounded-lg bg-white"
        size="md"
        color="primary"
        variant="bordered"
        radius="sm"
        onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'Todas')}
      >
        <SelectItem key="Todas" value="Todas">Todas</SelectItem>
        <SelectItem key="Solicitud enviada" value="Solicitud enviada">Solicitud enviada</SelectItem>
        <SelectItem key="Agendado" value="Agendado">Agendado</SelectItem>
        <SelectItem key="En Proceso" value="En Proceso">En Proceso</SelectItem>
        <SelectItem key="Completado" value="Completado">Completado</SelectItem>
        <SelectItem key="Cancelado" value="Cancelado">Cancelado</SelectItem>
      </Select>
      {filteredAppointments.map((appointment) => (
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
              <strong>Car:</strong> {`${appointment.car.brand} ${appointment.car.model} ${appointment.car.year}`}
            </p>
            <Chip
              size="sm"
              color={appointment.appointment_status?.name ? (
                appointment.appointment_status?.name === "Agendado"
                  ? "secondary"
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
              className="rounded-md text-white"
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
