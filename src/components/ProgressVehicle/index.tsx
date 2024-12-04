import { Card, CardBody, CardHeader, Chip, Divider, Progress, ScrollShadow, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { CalendarDays, CarFront, Clock, MapPinHouse } from 'lucide-react';
import { Appointment } from '@/types/appointment';
import { getAppointments } from '@/services/appointments/appointmentsService';
import Link from "next/link";
type AppointmentStatus = 'Agendado' | 'En Proceso' | 'Completado' | 'Cancelado' | 'Solicitud enviada' | 'Nuevo Presupuesto';


const LatestCustomers = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'Todas'>('Todas')
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        // Esta función se ejecuta cuando appointments cambia
        const filtered = appointments.filter(appointment =>
            appointment.appointment_status?.name !== 'Cancelado' &&
            appointment.appointment_status?.name !== 'Completado'
        );
        setFilteredAppointments(filtered);
        setIsLoading(false);

    }, [appointments]); // Este useEffect se ejecuta cuando appointments cambia
    //Funcion obtener appintments usuario
    const fetchAppointmentsUser = async () => {
        setIsLoading(true);
        try {
            const appointmentsData = await getAppointments(); // Llamar al servicio para obtener los vehículos
            setAppointments(appointmentsData); // Almacenar los datos de los vehículos en el estado
        } catch (error) {
            console.error('Error al cargar las citas:', error);
        } finally {
            console.log("Vehículos cargados");
        }
    };
    useEffect(() => {
        fetchAppointmentsUser(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, []);

    const capitalizeWords = (str: string): string => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Card className="w-full border-none rounded-lg">
            <CardBody>
                <ScrollShadow className="max-h-90">
                    <div className="space-y-2">
                        {isLoading ? (
                            <div className="space-y-2">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <Skeleton className="rounded-lg space-y-2">
                                            <Card className="rounded-lg shadow-none border border-stroke">
                                                <CardBody>
                                                    <h3 className="flex items-center text-lg font-semibold">
                                                        <MapPinHouse className="w-4 h-4 mr-2" /> Cargando...
                                                    </h3>
                                                    <Divider />
                                                    <p className="flex items-center text-gray-600 mt-1">
                                                        <CarFront className="w-4 h-4 mr-2" />
                                                        Cargando...
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <CalendarDays className="w-4 h-4 mr-2" />
                                                        Cargando...
                                                    </p>
                                                    <p className="flex items-center text-gray-600 uppercase">
                                                        <Clock className="w-4 h-4 mr-2" />
                                                        Cargando...
                                                    </p>
                                                    <div className="flex items-center text-gray-600">
                                                        <Chip
                                                            size="sm"
                                                            color="default"
                                                            className="rounded-md font-semibold mt-1"
                                                        >
                                                            Cargando...
                                                        </Chip>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Skeleton>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            filteredAppointments.map((appointment) => (
                                <Card key={appointment.id_appointment} className='rounded-lg shadow-none border border-stroke'>
                                    <Link href={`/user/appointments/${appointment.id_appointment}`}>
                                        <CardBody>
                                            <h3 className="flex items-center text-lg font-semibold">
                                                <MapPinHouse className="w-4 h-4 mr-2" />
                                                {appointment.workshops.name}
                                            </h3>
                                            <Divider />
                                            <p className="flex items-center text-gray-600 mt-1">
                                                <CarFront className="w-4 h-4 mr-2" />
                                                {capitalizeWords(appointment.car.brand)} {capitalizeWords(appointment.car.model)} {appointment.car.year}
                                            </p>
                                            <p className="flex items-center text-gray-600">
                                                <CalendarDays className="w-4 h-4 mr-2" />
                                                {new Date(appointment.date).toLocaleDateString()}  {/* Muestra solo la fecha */}
                                            </p>
                                            <p className="flex items-center text-gray-600 uppercase">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {new Date(appointment.date).toLocaleTimeString()}  {/* Muestra solo la hora */}
                                            </p>
                                            <div className="flex items-center text-gray-600">
                                                <Chip
                                                    size="sm"
                                                    color={
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
                                                    }
                                                    className="rounded-md font-semibold mt-1"
                                                >
                                                    {appointment.appointment_status?.name ?? "Pendiente"}
                                                </Chip>
                                            </div>
                                        </CardBody>
                                    </Link>
                                </Card>
                            ))
                        )}
                    </div>

                </ScrollShadow>
            </CardBody>
        </Card>
    );
};

export default LatestCustomers;
