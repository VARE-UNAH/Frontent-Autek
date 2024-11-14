'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button } from "@nextui-org/react";
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Cars = () => {
    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="/user/cars">Autos</BreadcrumbItem>
                <BreadcrumbItem href="/user/car">Toyota Corolla 2017</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold pt-2 text-black pb-2">Tu Vehículo</h1>
            <Card className="max-w-full shadow-none border border-stroke rounded-lg">
                <CardHeader className="flex gap-3">
                    <Image
                        src="/images/cars/toyota.png"
                        width={64}
                        height={48}
                        className="rounded-lg"
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Toyota</p>
                        <p className="text-small text-default-500">Corolla 2017</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="">
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Color: Negro
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Placa: HBASJ212K
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Proxima Visita: 12/01/2024
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Ultima Visita: 12/01/2024
                        </p>
                    </div>
                </CardBody>
            </Card>
            <Accordion variant="splitted" className="w-full px-0 rounded-lg shadow-sm mt-2" >
                <AccordionItem className="shadow-sm rounded-lg border border-stroke pb-2 font-bold" key="1" aria-label="Accordion 1" title="Reparaciones Pasadas">
                    <Card className="max-w-full rounded-lg shadow-sm border border-stroke mb-2">
                        <CardHeader className="flex">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-md font-bold">Cambio de Aceite</p>
                                <p className="text-sm font-medium text-zinc-400">23/10/2024</p>
                            </div>
                        </CardHeader>
                        <Divider />
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
                    <Card className="max-w-full rounded-lg shadow-sm border border-stroke mb-2">
                        <CardHeader className="flex">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-md font-bold">Cambio de Aceite</p>
                                <p className="text-sm font-medium text-zinc-400">23/10/2024</p>
                            </div>
                        </CardHeader>
                        <Divider />
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
                    <Divider />
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
                </AccordionItem>
            </Accordion>
        </DefaultLayout>
    );
};

export default Cars;
