import Image from 'next/image';
import { Button, Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter, Divider, Link, Spinner, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import {getCars} from '@/services/car/getService';
import Loader from '../common/Loader';

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
        <Card className="shadow-sm rounded-lg">
            <CardHeader className="flex gap-3">
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
            <Divider />
            <CardBody>
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
                                <AccordionItem className="mb-2 rounded-lg shadow-sm border border-stroke font-normal" startContent={
                                    <Image
                                        alt="logo"
                                        src="/images/cars/toyota.png"
                                        width={51}
                                        height={38}
                                        className="rounded-lg uppercase"
                                    />} key={index} aria-label={car.brand.name} title={`${capitalizeFirstLetter(car.brand.name)} ${capitalizeFirstLetter(car.model.name)} ${car.year}`}>
                                    <li key={index} className="pb-3 sm:pb-4 rounded-lg">
                                        <div className="grid grid-cols-2 justify-between">
                                            <div className="">
                                                <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                    Color:{car.color.name}
                                                </p>
                                                <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                    Placa:{car.license_plate}
                                                </p>
                                                <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                    Proxima Visita: pendiente implementacion
                                                </p>
                                                <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                    Ultima Visita: pendiente implementacion
                                                </p>
                                            </div>
                                            <div className="self-center justify-self-end">
                                                <Image
                                                    src={"/images/cars/toyota.png"}
                                                    alt={`/images/cars/toyota.png image`}
                                                    width={100}
                                                    height={60}
                                                    className="rounded-lg"
                                                />
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
        </Card>
    );
};

export default Cars;
