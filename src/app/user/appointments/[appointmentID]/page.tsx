'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Image, Divider, Breadcrumbs, BreadcrumbItem, Chip, Skeleton, ScrollShadow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { CalendarDays, Clock, MapPin, PenToolIcon as Tool, User, House, HouseIcon } from 'lucide-react'
import DefaultLayoutBack from '@/components/Layouts/DefaultLayoutBack'
import { Appointment } from '@/types/appointment'
import { WorkShop } from '@/types/workshop'
import { getAppointmentById } from '@/services/appointments/appointmentsService'
import { fetchWorkShopData } from '@/services/workshops/workshopsService'

// Mock data for the appointment
const appointmentData = {
    id: '1',
    workshop: {
        name: 'AutoFix Pro',
        address: '123 Main St, Anytown, USA',
        image: '/placeholder.svg?height=200&width=400'
    },
    car: {
        make: 'Toyota',
        model: 'Camry',
        year: '2020',
        image: '/placeholder.svg?height=150&width=300'
    },
    appointment: {
        title: 'Regular Maintenance',
        date: '2023-06-20',
        time: '10:00 AM',
        status: 'Scheduled',
        description: 'Regular maintenance including oil change, tire rotation, and general inspection.'
    },
    history: [
        { id: 1, date: '2023-06-20', time: '10:15 AM', description: 'Vehicle received', image: '/placeholder.svg?height=100&width=100' },
        { id: 2, date: '2023-06-20', time: '11:30 AM', description: 'Oil change completed', image: '/placeholder.svg?height=100&width=100' },
        { id: 3, date: '2023-06-20', time: '12:45 PM', description: 'Tire rotation completed', image: '/placeholder.svg?height=100&width=100' },
        { id: 4, date: '2023-06-20', time: '12:45 PM', description: 'Tire rotation completed', image: '/placeholder.svg?height=100&width=100' },
    ]
}

type HistoryItem = {
    id: number;
    date: string; // Fecha en formato string, puedes usar un tipo de fecha si es necesario
    time: string; // Hora en formato string
    description: string;
    image: string; // URL de la imagen
};

export default function AppointmentDetails(
    { params }: {
        params: { appointmentID: number };
    }
) {
    const [isLoading, setIsLoading] = useState(true);
    const appointmentId = params.appointmentID;
    console.log(appointmentId);
    const [page, setPage] = React.useState(1);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [selectedWorkshop, setSelectedWorkshop] = useState<WorkShop | null>(null);
    const rowsPerPage = 4;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const appointmentData = await getAppointmentById(appointmentId);
            const workshopData = await fetchWorkShopData(appointmentData.workshops.id);
            console.log(appointmentData);
            setSelectedAppointment(appointmentData);
            setSelectedWorkshop(workshopData);
        } catch (error) {
            console.error('Error al obtener las citas:', error);
        } finally {
            setIsLoading(false);  // Asegúrate de que se ejecute solo una vez cuando termine la carga
            console.log("Vehículos cargados");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, [appointmentId]);
    return (
        <DefaultLayoutBack>
            <Breadcrumbs size="md" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="/user/appointments">Citas</BreadcrumbItem>
                <BreadcrumbItem href="/user/car" className="">Detalles Cita</BreadcrumbItem>
            </Breadcrumbs>
            <div className="container mx-auto space-y-4">
                <h1 className="text-2xl font-bold mb-2">Detalles Cita</h1>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Detalles Taller</h2>
                    <Card className='rounded-lg'>
                        <CardBody>
                            <div className="flex flex-col md:flex-row gap-4">
                                {isLoading ? (
                                    <div>
                                        <Skeleton className='rounded-lg'>
                                            <Image
                                                alt={selectedAppointment?.workshops.name}
                                                className="object-cover rounded-lg shadow-sm p-0 "
                                                src="/images/cover/dimasa.jpeg"
                                                width={400}
                                                height={200}
                                            />
                                        </Skeleton>
                                        <div>
                                            <h3 className="text-lg font-semibold"><Skeleton className='rounded-md h-5 my-1 w-70'>load</Skeleton></h3>
                                            <h3 className="text-lg font-semibold"><Skeleton className='rounded-md h-5 mt-4 w-60'>load</Skeleton></h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Image
                                            alt={selectedAppointment?.workshops.name}
                                            className="object-cover rounded-lg shadow-sm p-0 "
                                            src="/images/cover/dimasa.jpeg"
                                            width={400}
                                            height={200}
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold mt-1">{selectedAppointment?.workshops.name}</h3>
                                            <p className="text-gray-600 flex items-center mt-2">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {selectedWorkshop?.address.address}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Información Vehículo</h2>
                    <Card className='rounded-lg'>
                        <CardBody>
                            <div className="flex flex-col md:flex-row gap-4">
                                {isLoading ? (
                                    <div>
                                        <Skeleton className='rounded-lg'>
                                            <div className="w-full flex justify-center items-center">
                                                <Image
                                                    alt={`${appointmentData.car.make} ${appointmentData.car.model}`}
                                                    className="object-cover rounded-xl"
                                                    src="/images/cars/rav4.png"
                                                    width={300}
                                                    height={150}
                                                />
                                            </div>
                                        </Skeleton>
                                        <h3 className="text-lg font-semibold"><Skeleton className='rounded-md h-5 my-1 w-70'>load</Skeleton></h3>
                                        <h3 className="text-lg font-semibold"><Skeleton className='rounded-md h-5 mt-2 w-60'>load</Skeleton></h3>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-full flex justify-center items-center">
                                            <Image
                                                alt={`${appointmentData.car.make} ${appointmentData.car.model}`}
                                                className="object-cover rounded-xl"
                                                src="/images/cars/rav4.png"
                                                width={300}
                                                height={150}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{selectedAppointment?.car.brand} {selectedAppointment?.car.model}</h3>
                                            <p className="text-gray-600">Placa: {selectedAppointment?.car.license_plate}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Detalles Cita</h2>
                    <Card className='rounded-lg'>
                        <CardBody>
                            {isLoading ? (
                                <h3 className="text-lg font-semibold mb-2"><Skeleton className='rounded-md h-8 mB-2 w-70'>load</Skeleton></h3>
                            ) : (
                                <h3 className="text-lg font-semibold mb-2">{appointmentData.appointment.title}</h3>
                            )}

                            <div className="space-y-2">
                                {isLoading ? (
                                    <div>
                                        <Skeleton className='rounded-md w-40 h-5 mb-2'>
                                            <p className="flex items-center text-gray-600">
                                                <CalendarDays className="w-4 h-4 mr-2" />
                                                {selectedAppointment?.date ? new Date(selectedAppointment.date).toLocaleDateString() : "Fecha no disponible"}
                                            </p>
                                        </Skeleton>
                                        <Skeleton className='rounded-md w-40 h-5 mb-2'>
                                            <p className="flex items-center text-gray-600 uppercase">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {selectedAppointment?.date ? new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Hora no disponible"}
                                            </p>
                                        </Skeleton>
                                        <div className="flex items-center text-gray-600">
                                            <Skeleton className='rounded-md me-1'>
                                                Status:
                                            </Skeleton>
                                            <Chip
                                                size="sm"
                                                color="default"
                                                className="rounded-md ms-1"
                                            >
                                                {selectedAppointment?.appointment_status.name}
                                            </Chip>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="flex items-center text-gray-600">
                                            <CalendarDays className="w-4 h-4 mr-2" />
                                            {selectedAppointment?.date ? new Date(selectedAppointment.date).toLocaleDateString() : "Fecha no disponible"}
                                        </p>
                                        <p className="flex items-center text-gray-600 uppercase">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {selectedAppointment?.date ? new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Hora no disponible"}
                                        </p>
                                        <div className="flex items-center text-gray-600">
                                            <Tool className="w-4 h-4 mr-2" />
                                            Status:
                                            <Chip
                                                size="sm"
                                                color={
                                                    selectedAppointment?.appointment_status.name === "Agendado"
                                                        ? "default"
                                                        : selectedAppointment?.appointment_status.name === "En Proceso"
                                                            ? "primary"
                                                            : selectedAppointment?.appointment_status.name === "Completado"
                                                                ? "success"
                                                                : selectedAppointment?.appointment_status.name === "Cancelado"
                                                                    ? "danger"
                                                                    : selectedAppointment?.appointment_status.name === "Solicitud enviada"
                                                                        ? "warning"
                                                                        : selectedAppointment?.appointment_status.name === "Nuevo Presupuesto"
                                                                            ? "secondary"
                                                                            : "default" // Color por defecto para otros casos
                                                }
                                                className="rounded-md ms-1"
                                            >
                                                {selectedAppointment?.appointment_status.name}
                                            </Chip>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Divider className="my-4" />
                            {isLoading ? (
                                <h2><Skeleton className='rounded-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium delectus fugit vitae et incidunt ab numquam a dolor, molestias placeat iusto cumque ipsam dolorum ratione maxime. Exercitationem maxime fugit quidem!</Skeleton></h2>
                            ) : (
                                <p>{selectedAppointment?.description}</p>
                            )}
                        </CardBody>
                    </Card>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Historial Servicio</h2>
                    <Card className='rounded-lg'>
                        <CardBody>
                            <ScrollShadow className={`w-full ${appointmentData.history.length > 2 ? 'h-80' : 'h-auto'}`}>
                                <div className="space-y-4">
                                    {appointmentData.history.map((item) => (
                                        <div key={item.id} className="flex items-start space-x-4">
                                            <Image
                                                alt={`Service step ${item.id}`}
                                                className="object-cover rounded-xl"
                                                src="/images/cars/R.jpg"
                                                width={100}
                                                height={100}
                                                onClick={() => {
                                                    setSelectedHistoryItem(item);
                                                    onOpen();
                                                }}
                                            />
                                            <div>
                                                <p className="font-semibold">{item.date} - {item.time}</p>
                                                <p className="text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                </section>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} placement="center" className='rounded-lg'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle del Servicio</ModalHeader>
                            <ModalBody>
                                {selectedHistoryItem && (
                                    <>
                                        <Image
                                            alt={`Service step ${selectedHistoryItem.id}`}
                                            className="object-cover rounded-xl w-full"
                                            src="/images/cars/R.jpg"
                                            width={400}
                                            height={400}
                                        />
                                        <p className="font-semibold mt-4">{selectedHistoryItem.date} - {selectedHistoryItem.time}</p>
                                        <p className="text-gray-600">{selectedHistoryItem.description}</p>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </DefaultLayoutBack >
    )
}

