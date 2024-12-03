'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Input, Link, Skeleton, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { getCars } from "@/services/car/getService";
import VehicleCard from "@/components/Cards/VehicleCard";
import { VerticalDotsIcon } from "@/components/svg/VerticalDotsIcon";


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
    return (
        <DefaultLayout>
            <Breadcrumbs size="md" variant="bordered" className="pb-1">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="/user/cars">Tus Vehiculos</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-black/90 text-md font-bold pb-1">Mis vehiculos</h1>
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
                    <Link
                        className=""
                        href="/user/cars/new-car">
                        <Button size='sm' className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition" endContent={<i className="fa-solid fa-car"></i>}>Añadir Vehiculo</Button>
                    </Link>
                    <p className="pb-0 font-normal text-sm mt-2">{cars.length} vehiculos</p>
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
                    {cars.map((car, index) => (
                        <VehicleCard
                            key={index}
                            brand_name={car.brand.name}
                            model_name={car.model.name}
                            license_plate={car.license_plate}
                            linkUrl={`/user/cars/${car.id_car}`}>

                        </VehicleCard>

                    ))}
                </div>
            )}

        </DefaultLayout>
    );
};

export default Cars;
