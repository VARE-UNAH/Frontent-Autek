import Image from 'next/image';
import { Button, Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter, Divider, Spinner, Skeleton, ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importa Link de next/link
import { getCars } from '@/services/car/getService';
import Loader from '../common/Loader';
import { CarFront, RectangleHorizontal, SprayCan } from 'lucide-react';

type Car = {
    id_car: number;
    brand: {
        id_brand: number;
        name: string;
    };
    model: {
        id_model: number;
        name: string;
    };
    color: {
        id_color: number;
        name: string;
    };
    license_plate: string;
    year: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        date_of_birth: string;
    };
}


const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchCars = async () => {
        try {
            const carData = await getCars(); // Llamar al servicio para obtener los vehículos
            setCars(carData); // Almacenar los datos de los vehículos en el estado
        } catch (error) {
            console.error('Error al cargar los vehículos:', error);
        } finally {
            setIsLoading(false);  // Asegúrate de que se ejecute solo una vez cuando termine la carga
            console.log("Vehículos cargados");
        }
    };
    useEffect(() => {
        fetchCars(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, []);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const mySvg = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
    );

    return (
        <Card className="w-full rounded-lg">
            <CardBody className="pb-2">
                <ScrollShadow className="max-h-90">
                    <div className="space-y-2">
                        {isLoading ? (
                            <div className='space-y-2'>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="space-y-2">
                                        <Skeleton className='rounded-lg'>
                                            <div
                                                className="p-4 border border-stroke rounded-lg bg-gray-50"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="flex items-center text-lg font-semibold">
                                                        <CarFront className="w-4 h-4 mr-2" /> load
                                                    </span>
                                                </div>
                                                <Divider></Divider>
                                                <div className="mt-1">
                                                    <p className="flex items-center text-gray-600"><RectangleHorizontal className="w-4 h-4 mr-2" /> load</p>
                                                    <div className="flex justify-between items-center">
                                                        <p className="flex items-center text-gray-600">
                                                            <SprayCan className="w-4 h-4 mr-2" /> Rojo
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Skeleton>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            cars.map((car) => (
                                <div
                                    key={car.id_car}
                                    className="p-4 border border-stroke rounded-lg bg-gray-50"
                                >
                                    <Link href={`/user/cars/${car.id_car}`}>
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center text-lg font-semibold">
                                                <CarFront className="w-4 h-4 mr-2" /> {capitalizeFirstLetter(car.brand.name)} {capitalizeFirstLetter(car.model.name)} {car.year}
                                            </span>
                                        </div>
                                        <Divider></Divider>
                                        <div className="mt-1">
                                            <p className="flex items-center text-gray-600"><RectangleHorizontal className="w-4 h-4 mr-2" /> {car.license_plate}</p>
                                            <div className="flex justify-between items-center">
                                                <p className="flex items-center text-gray-600">
                                                    <SprayCan className="w-4 h-4 mr-2" /> Rojo
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollShadow>
            </CardBody>
            <Divider></Divider>
            <CardFooter className="pt-2 flex">
                {isLoading ? (
                    <Skeleton className='rounded-lg w-full'>
                        <Link
                            className='w-full'
                            href="/user/cars/new-car">
                            <Button radius="sm" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white self-end">Añadir Vehiculo</Button>
                        </Link>
                    </Skeleton>
                ) : (
                    <Link
                        className='w-full'
                        href="/user/cars/new-car">
                        <Button radius="sm" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white self-end">Añadir Vehiculo</Button>
                    </Link>
                )}
            </CardFooter>
        </Card>

    );
};

{/* <Card className="shadow-sm rounded-lg">
            <CardHeader className="flex gap-3 pb-0">
                {isLoading ? (
                    <div className="flex flex-col">
                        {Array(1).fill(null).map((_, index) => (
                            <div key={index} className="">
                                <Skeleton className="rounded-lg border border-stroke">
                                    <p className="text-md font-bold">Tus Vehículos</p>
                                </Skeleton>
                            </div>
                        ))}
                    </div>) : (
                    <div className="flex flex-col">
                        <p className="text-md font-bold">Tus Vehículos</p>
                    </div>
                )}
            </CardHeader>
            <CardBody className='pt-1 ps-1 pe-1'>
                {isLoading ? (
                    // Componente de carga mientras los datos se cargan
                    <div className="mt-2">
                        {Array(4).fill(null).map((_, index) => (
                            <div key={index} className="">
                                <Skeleton className="rounded-lg mx-2 mb-2 border border-stroke">
                                    <div className="h-17 rounded-lg bg-white"></div>
                                </Skeleton>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ul role="list" className="mt-2">
                        {cars.map((car, index) => (
                            <Accordion variant="splitted" key={index}>
                                <AccordionItem className="mb-2 pb-0 rounded-lg shadow-sm border border-stroke font-normal" title={
                                    <div className="flex items-center space-x-2 pb-0 mt-0">
                                        <Image
                                            src={`/images/cars/${car.brand.name.toLowerCase()}.png`}
                                            alt={`${car.brand.name} logo`}
                                            width={40}
                                            height={40}
                                            className="rounded-lg object-cover"
                                        />
                                        <span className="font-medium text-sm">
                                            {`${capitalizeFirstLetter(car.brand.name)} ${capitalizeFirstLetter(car.model.name)} ${car.year}`}
                                        </span>
                                    </div>
                                }>
                                    <li key={index} className="pb-1 pt-0 sm:pb-4 rounded-lg">
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className="">
                                                <p className="text-sm text-start truncate dark:text-gray-400">
                                                    Color: {car.color.name}
                                                </p>
                                                <p className="text-sm text-start truncate dark:text-gray-400">
                                                    Placa: {car.license_plate}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/user/cars/${car.id_car}`} className='w-full'>
                                            <Button size='sm' className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">Ver Detalles</Button>
                                        </Link>
                                    </li>
                                </AccordionItem>
                            </Accordion>

                        ))}
                    </ul>
                )}
            </CardBody>
            <Divider />
            <CardFooter>
                {isLoading ? (<div className="w-full flex justify-center mb-2">
                    {Array(1).fill(null).map((_, index) => (
                        <div key={index} className="">
                            <Skeleton className="rounded-lg border border-stroke">
                                <Button color="primary" className='w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition' startContent={<i className="fa-solid fa-plus"></i>}>
                                    Añadir Vehículo
                                </Button>
                            </Skeleton>
                        </div>
                    ))}
                </div>) : (
                    <div className="w-full flex justify-center mb-2">
                        <Link
                            href="/user/cars/new-car"
                            className='w-full'
                        >
                            <Button color="primary" className='w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition' startContent={<i className="fa-solid fa-plus"></i>}>
                                Añadir Vehículo
                            </Button>
                        </Link>
                    </div>)}

            </CardFooter>
        </Card> */}

export default Cars;
