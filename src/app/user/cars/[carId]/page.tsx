'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DefaultLayoutBack from "@/components/Layouts/DefaultLayoutBack";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";
import { getAppointmentsByCarId, getCarById } from "@/services/car/getService";
import { Appointment } from "@/types/appointment";
import { Car } from "@/types/car";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, getKeyValue, Pagination, Skeleton } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const rows = [
    {
        key: "1",
        name: "TOYOTA",
        role: "RAV4",
    }
];

const columns = [
    {
        key: "name",
        label: "MARCA",
    },
    {
        key: "role",
        label: "MODELO",
    }
];

const users = [
    {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        status: "Active",
    },
    {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused",
    },
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
    },
    {
        key: "5",
        name: "Emily Collins",
        role: "Marketing Manager",
        status: "Active",
    },
    {
        key: "6",
        name: "Brian Kim",
        role: "Product Manager",
        status: "Active",
    },
    {
        key: "7",
        name: "Laura Thompson",
        role: "UX Designer",
        status: "Active",
    },
    {
        key: "8",
        name: "Michael Stevens",
        role: "Data Analyst",
        status: "Paused",
    },
    {
        key: "9",
        name: "Sophia Nguyen",
        role: "Quality Assurance",
        status: "Active",
    },
    {
        key: "10",
        name: "James Wilson",
        role: "Front-end Developer",
        status: "Vacation",
    },
    {
        key: "11",
        name: "Ava Johnson",
        role: "Back-end Developer",
        status: "Active",
    },
    {
        key: "12",
        name: "Isabella Smith",
        role: "Graphic Designer",
        status: "Active",
    },
    {
        key: "13",
        name: "Oliver Brown",
        role: "Content Writer",
        status: "Paused",
    },
    {
        key: "14",
        name: "Lucas Jones",
        role: "Project Manager",
        status: "Active",
    },
    {
        key: "15",
        name: "Grace Davis",
        role: "HR Manager",
        status: "Active",
    },
    {
        key: "16",
        name: "Elijah Garcia",
        role: "Network Administrator",
        status: "Active",
    },
    {
        key: "17",
        name: "Emma Martinez",
        role: "Accountant",
        status: "Vacation",
    },
    {
        key: "18",
        name: "Benjamin Lee",
        role: "Operations Manager",
        status: "Active",
    },
    {
        key: "19",
        name: "Mia Hernandez",
        role: "Sales Manager",
        status: "Paused",
    },
    {
        key: "20",
        name: "Daniel Lewis",
        role: "DevOps Engineer",
        status: "Active",
    },
    {
        key: "21",
        name: "Amelia Clark",
        role: "Social Media Specialist",
        status: "Active",
    },
    {
        key: "22",
        name: "Jackson Walker",
        role: "Customer Support",
        status: "Active",
    },
    {
        key: "23",
        name: "Henry Hall",
        role: "Security Analyst",
        status: "Active",
    },
    {
        key: "24",
        name: "Charlotte Young",
        role: "PR Specialist",
        status: "Paused",
    },
    {
        key: "25",
        name: "Liam King",
        role: "Mobile App Developer",
        status: "Active",
    },
];
function CarDetails(
    { params }: {
        params: { carId: number };
    }
) {
    const [isLoading, setIsLoading] = useState(true);
    const carId = params.carId;
    const [page, setPage] = React.useState(1);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const rowsPerPage = 4;
    const pages = Math.ceil(users.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const carData = await getCarById(carId);
            const appointmentData = await getAppointmentsByCarId(carId);
            console.log(carData);
            setSelectedCar(carData);
            setAppointments(appointmentData)
        } catch (error) {
            console.error('Error al cargar los vehículos:', error);
        } finally {
            setIsLoading(false);  // Asegúrate de que se ejecute solo una vez cuando termine la carga
            console.log("Vehículos cargados");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, [carId]);

    return (
        <ProtectedLayout>
            <DefaultLayoutBack>
                <Breadcrumbs size="md" variant="bordered" className="pb-2">
                    <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                    <BreadcrumbItem href="/user/cars">Mis Vehiculos</BreadcrumbItem>
                    {isLoading ? (
                        <BreadcrumbItem href="/talleres">
                            <Skeleton className="rounded-md w-20">
                                Hola
                            </Skeleton>
                        </BreadcrumbItem>

                    ) : (
                        <BreadcrumbItem href="/user/car" className="uppercase">{selectedCar?.brand.name} - {selectedCar?.license_plate}</BreadcrumbItem>
                    )}
                </Breadcrumbs>
                {isLoading ? (
                    <div>
                        <h1 className="text-black/90 text-md font-bold my-2 uppercase"><Skeleton className="w-40 rounded-lg">hola</Skeleton></h1>
                        <Card className="w-full col-span-12 sm:col-span-7 rounded-lg mb-3 shadow-sm border-2 border-stroke">
                            <CardHeader className="p-0">
                                <Skeleton className="w-full">
                                    <div className="w-full overflow-hidden flex h-40 rounded-b-none items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                        <Image
                                            src={"/images/cars/rav4.png"}
                                            alt={`/images/cars/toyota.png image`}
                                            className="w-50 h-auto block z-0"
                                        />
                                    </div>
                                </Skeleton>
                            </CardHeader>
                            <CardBody className="">
                                <div className="flex items-center justify-between mb-2">
                                    <Skeleton className="h-6 rounded-lg my-2 w-40">
                                        <h2 className="text-black/90 text-md font-bold my-2 w-40">
                                            Datos del Vehículo
                                        </h2>
                                    </Skeleton>
                                    <Link
                                        isExternal
                                        className="text-slate-500 pe-2 underline"
                                        href="https://github.com/nextui-org/nextui"
                                    >
                                        Editar
                                    </Link>
                                </div>

                                <Table removeWrapper aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>MARCA</TableColumn>
                                        <TableColumn>MODELO</TableColumn>
                                        <TableColumn>AÑO</TableColumn>
                                        <TableColumn>PLACA</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="1">
                                            <TableCell className="uppercase"><Skeleton className="rounded-lg">hola</Skeleton></TableCell>
                                            <TableCell className="uppercase"><Skeleton className="rounded-lg">hola</Skeleton></TableCell>
                                            <TableCell className="uppercase"><Skeleton className="rounded-lg">hola</Skeleton></TableCell>
                                            <TableCell className="uppercase"><Skeleton className="rounded-lg">hola</Skeleton></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </CardBody>

                        </Card>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-black/90 text-md font-bold my-2 uppercase">{selectedCar?.brand.name} {selectedCar?.model.name} {selectedCar?.year}</h1>
                        <Card className="w-full col-span-12 sm:col-span-7 rounded-lg mb-3 shadow-sm border-2 border-stroke">
                            <CardHeader className="p-0">
                                <div className="w-full overflow-hidden flex h-40 rounded-b-none items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                    <Image
                                        src={"/images/cars/rav4.png"}
                                        alt={`/images/cars/toyota.png image`}
                                        className="w-50 h-auto block z-0"
                                    />
                                </div>
                            </CardHeader>
                            <CardBody className="">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-black/90 text-md font-bold my-2 w-40">
                                        Datos del Vehículo
                                    </h2>
                                    <Link
                                        isExternal
                                        className="text-slate-500 pe-2 underline"
                                        href="https://github.com/nextui-org/nextui"
                                    >
                                        Editar
                                    </Link>
                                </div>

                                <Table removeWrapper aria-label="Example static collection table">
                                    <TableHeader>
                                        <TableColumn>MARCA</TableColumn>
                                        <TableColumn>MODELO</TableColumn>
                                        <TableColumn>AÑO</TableColumn>
                                        <TableColumn>PLACA</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key="1">
                                            <TableCell className="uppercase">{selectedCar?.brand.name}</TableCell>
                                            <TableCell className="uppercase">{selectedCar?.model.name}</TableCell>
                                            <TableCell className="uppercase">{selectedCar?.year}</TableCell>
                                            <TableCell className="uppercase">{selectedCar?.license_plate}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </CardBody>

                        </Card>
                    </div>
                )}


                <Card className="w-full rounded-lg mb-3 shadow-sm border-2 border-stroke">
                    <CardHeader className="pb-0">
                        <h2 className="text-black/90 text-md font-bold my-2 w-40">
                            Historial de Citas
                        </h2>
                    </CardHeader>
                    <CardBody className="mb-0">
                        {appointments.map((appointment) => (
                            <React.Fragment key={appointment.id_appointment}>
                                <Card className="max-w-full rounded-md shadow-none border-none">
                                    <CardHeader className="flex rounded-md bg-zinc-100">
                                        <div className="flex justify-between items-center w-full">
                                            <h2 className="text-black/90 text-xs font-medium">
                                                {appointment.description}
                                            </h2>
                                            <p className="text-xs font-medium text-zinc-400">{appointment.date}</p>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="flex flex-col">
                                            <p className="font-normal text-sm">Taller: {appointment.workshops.name}</p>
                                            <p className="font-normal text-sm">Estado: {appointment.appointment_status?.name || 'N/A'}</p>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-normal text-sm">Ciudad: {appointment.workshops.city}</p>
                                                <Link
                                                    className="text-sm font-medium items-center text-zinc-400"
                                                    href={`/appointment/${appointment.id_appointment}`}
                                                >
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className="text-sm font-medium text-zinc-400 pb-0.5">Ver Detalles</p>
                                                        <i className="fa-solid fa-angle-right text-center ps-1"></i>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Divider className="mt-0 mb-2" />
                            </React.Fragment>
                        ))}
                    </CardBody>
                    <CardFooter className="pt-0 mt-0">
                        {appointments.length === 0 ? (
                            <p className="text-center w-full">No hay citas registradas.</p>
                        ) : (
                            <div className="w-full flex justify-center mb-2">
                                <Link
                                    className="w-full"
                                    href={`/user/appointments/${carId}`}
                                >
                                    <Button color="primary" className='w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mt-2'>
                                        Ver Todas
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </DefaultLayoutBack>
        </ProtectedLayout>
    );
};

export default CarDetails;
