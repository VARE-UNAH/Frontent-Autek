'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Link, Select, SelectItem, Skeleton, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import VehicleCard from "@/components/Cards/VehicleCard";
import { getAppointments } from "@/services/appointments/appointmentsService";
import { Appointment } from "@/types/appointment";
import UserAppointmentsCard from "@/components/Cards/UserAppointmentsCard";
import { useValidateToken } from "@/services/user/authService";
import { Loader } from "lucide-react";
type AppointmentStatus = 'Agendado' | 'En Proceso' | 'Completado' | 'Cancelado' | 'Solicitud enviada' | 'Nuevo Presupuesto';

const Appointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'Todas'>('Todas')

    const filteredAppointments = appointments.filter(appointment =>
        (appointment.workshops.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.car.license_plate.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'Todas' || appointment.appointment_status?.name === statusFilter)
    )
    //Funcion obtener appintments usuario
    const fetchAppointmentsUser = async () => {
        try {
            const appointmentsData = await getAppointments(); // Llamar al servicio para obtener los vehículos
            setAppointments(appointmentsData); // Almacenar los datos de los vehículos en el estado
        } catch (error) {
            console.error('Error al cargar las citas:', error);
        } finally {
            setIsLoading(false);  // Asegúrate de que se ejecute solo una vez cuando termine la carga
            console.log("Vehículos cargados");
        }
    };
    useEffect(() => {
        fetchAppointmentsUser(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, []);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <DefaultLayout>
            <Breadcrumbs size="md" variant="bordered" className="pb-1">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="/user/appointments">Tus Citas</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-black/90 text-lg font-bold pb-1">Mi historial de citas</h1>
            {isLoading ? (
                <div>
                    <Skeleton className="rounded-lg" >
                        <Input
                            label="Buscar"
                            isClearable
                            variant="bordered"
                            color="primary"
                            radius="lg"
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
                            placeholder="Buscar vehículo..."
                            startContent={
                                <i className="fa-solid fa-magnifying-glass text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"></i>
                            }
                        />
                    </Skeleton>
                    <Skeleton className="rounded-md h-8 mt-2">
                        <Button size='sm' className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition" endContent={<i className="fa-solid fa-car"></i>}>Añadir Vehiculo</Button>
                    </Skeleton>
                    <Skeleton className="w-20 h-5 my-2 rounded-md">
                        <p className="text-sm text-default-500">Cargando</p>
                    </Skeleton>
                </div>
            ) : (
                <div>
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
                        className="mb-2 rounded-lg mt-2 bg-white"
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
                    <Link
                        className="w-auto"
                        href="user/talleres">
                        <Button size='sm' className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition" endContent={<i className="fa-solid fa-car"></i>}>Nueva Cita</Button>
                    </Link>
                    <p className="pb-0 font-normal text-sm mt-2 mb-1">{filteredAppointments.length} citas</p>
                </div>
            )}
            {isLoading ? (
                <div className="">
                    {Array(4).fill(null).map((_, index) => (
                        <div key={index} className="mb-3">
                            <Skeleton className="rounded-lg">
                                <div className="rounded-t-lg rounded-b-none">
                                    <Card className="rounded-lg border-2 border-stroke shadow-sm block">
                                        <CardHeader className="pt-1 pb-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg">
                                            <div className="w-full overflow-hidden flex h-30 rounded-lg items-center justify-center">
                                                <Image
                                                    src={"/images/cars/rav4.png"}
                                                    alt={`Image of prueba`}
                                                    className="w-50 h-auto block z-0"
                                                />
                                                <Dropdown backdrop="blur">
                                                    <DropdownTrigger>
                                                        <i className="fa-solid fa-ellipsis absolute top-2 justify-end end-3 text-white text-xl"></i>
                                                    </DropdownTrigger>
                                                    <DropdownMenu variant="faded" aria-label="Static Actions">
                                                        <DropdownItem key="new">Ver Detalles</DropdownItem>
                                                        <DropdownItem key="edit">Editar vehículo</DropdownItem>
                                                        <DropdownItem key="delete" className="text-danger" color="danger">
                                                            Eliminar Vehículo
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </CardHeader>
                                        <Divider></Divider>
                                        <CardBody className="pt-1 pb-1">
                                            <div className="flex items-baseline space-x-1">
                                                <div>
                                                    <h4 className="text-md font-bold uppercase text-black">carga</h4>
                                                </div>
                                                <p>-</p>
                                                <div>
                                                    <h4 className="text-sm font-medium text-black/50 uppercase">carga</h4>
                                                </div>
                                                <p>-</p>
                                                <h4 className="text-sm font-medium text-black/50">carga</h4>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Skeleton>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {filteredAppointments.map((appointment, index) => (
                        <UserAppointmentsCard
                            key={index}
                            brand_name={appointment.car.brand}
                            model_name={appointment.car.model}
                            workshop_name={appointment.workshops.name}
                            license_plate={appointment.car.license_plate}
                            linkUrl={`/user/appointments/${appointment.id_appointment}`}
                            descripcion={appointment.description}
                            status={appointment.appointment_status?.name ?? "Pendiente"}
                            date={new Date(appointment.date)}
                        >
                        </UserAppointmentsCard>


                    ))}
                </div>
            )}

        </DefaultLayout>
    );
};

/* <Card className="max-w-full rounded-md shadow-sm mb-2 border-2 border-stroke">
                            <CardHeader className="flex rounded-md bg-zinc-100">
                                <div className="flex justify-between items-center w-full">
                                    <h2 className="text-black/90 text-xs font-medium">
                                        CAMBIO DE ACEITE
                                    </h2>
                                    <p className="text-xs font-medium text-zinc-400">23/10/2024</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-col">
                                    <p className="font-normal text-sm">Mecanico: Jeremy Figueroa</p>
                                    <p className="font-normal text-sm">Kilometraje: 75,000 KM</p>
                                    <p className="font-normal text-sm">Costo: L. 1,000</p>
                                    <div className="flex justify-between items-center w-full">
                                        <Chip size="sm" color="warning" className="rounded-md">Pendiente</Chip>
                                        <Link
                                            className="text-sm font-medium items-center text-zinc-400"
                                            href="https://github.com/nextui-org/nextui"
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-sm font-medium text-zinc-400 pb-0.5">Ver Detalles</p>
                                                <i className="fa-solid fa-angle-right text-center ps-1"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card> */

export default Appointments;
