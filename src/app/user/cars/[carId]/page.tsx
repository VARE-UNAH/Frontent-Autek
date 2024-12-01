'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu, Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, getKeyValue, Pagination } from "@nextui-org/react";
import React from "react";
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
        params: { carId: number};
    }
) {
    const carId = params.carId;
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;
    const pages = Math.ceil(users.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <DefaultLayout>
            <Breadcrumbs size="md" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="/user/cars">Autos</BreadcrumbItem>
                <BreadcrumbItem href="/user/car">Toyota Corolla 2017</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-black/90 text-md font-bold my-2">TOYOTA RAV4 2016</h1>
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
                                <TableCell>TOYOTA</TableCell>
                                <TableCell>RAV4</TableCell>
                                <TableCell>2016</TableCell>
                                <TableCell>HBG996</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                </CardBody>

            </Card>
            <Card className="w-full rounded-lg mb-3 shadow-sm border-2 border-stroke">
                <CardHeader className="pb-0">
                    <h2 className="text-black/90 text-md font-bold my-2 w-40">
                        Historial de Visitas
                    </h2>
                </CardHeader>
                <CardBody className="mb-0">
                    <Card className="max-w-full rounded-md shadow-none border-none">
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
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-normal text-sm">Costo: L. 1,000</p>
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
                    </Card>
                    <Divider className="mt-0 mb-2" />
                    <Card className="max-w-full rounded-md shadow-none border-none">
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
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-normal text-sm">Costo: L. 1,000</p>
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
                    </Card>
                    <Divider className="mt-0 mb-2" />
                    <Card className="max-w-full rounded-md shadow-none border-none">
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
                                <div className="flex justify-between items-center w-full">
                                    <p className="font-normal text-sm">Costo: L. 1,000</p>
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
                    </Card>
                    <Divider className="mt-0" />
                </CardBody>
                <CardFooter className="pt-0 mt-0">
                    <div className="w-full flex justify-center mb-2">
                        <Link
                            className="w-full"
                            href="/user/new-car"
                        >
                            <Button color="primary" className='w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mt-2' >
                                Ver Todas
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </DefaultLayout>
    );
};

export default CarDetails;
