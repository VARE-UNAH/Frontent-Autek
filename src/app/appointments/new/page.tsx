'use client'
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import {
    Tabs,
    Tab,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
} from "@nextui-org/react";
import { Select, SelectItem, Divider, Image } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";

interface Car {
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

const Newappointment = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState(cars[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState<string>("Detalle");
    const [formData, setFormData] = useState({
        vehicle: "",
        details: "",
        appointmentDate: "",
        appointmentTime: "",
    });

    const handleSelectChange = (id: number) => {
        const car = cars.find((car) => car.id_car === id);
        if (car) setSelectedCar(car);
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/show/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('AccessToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }

                const data: Car[] = await response.json();
                setCars(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching cars:", error);
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/create/one/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Appointment successfully created!");
            } else {
                console.error("Failed to create appointment.");
            }
        } catch (error) {
            console.error("An error occurred while submitting the form:", error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                <BreadcrumbItem href="/appointments">Citas</BreadcrumbItem>
                <BreadcrumbItem href="/appointments/new">Nueva Cita</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold pt-2 text-black pb-2">Nueva Cita</h1>
            <div className="flex flex-col w-full">
                <Card className="max-w-full">
                    <CardBody className="overflow-hidden">
                        <Tabs
                            fullWidth
                            size="lg"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => setSelected(key as string)}
                        >
                            <Tab key="Detalle" title="Detalle">
                                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                                    <div className="">
                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                            Selecciona el Vehículo
                                        </label>
                                        <Select
                isRequired
                label="Vehiculo"
                placeholder="Selecciona tu Vehiculo"
                className="bg-white shadow-none"
                variant="bordered"
                color="primary"
                defaultSelectedKeys={[selectedCar.id_car.toString()]}
                classNames={{
                    trigger: "shadow-none border border-1 rounded-lg",
                }}
                onChange={(key) => handleSelectChange(Number(key))}
            >
                {cars.map((car) => (
                    <SelectItem key={car.id_car} textValue={car.brand.name}>
                        <div className="flex gap-2 items-center">
                            <div className="flex flex-col">
                                <span className="text-small">
                                    {car.brand.name} {car.model.name} {car.year}
                                </span>
                                <span className="text-tiny text-default-400">{car.model.name}</span>
                            </div>
                        </div>
                    </SelectItem>
                ))}
            </Select>
                                    </div>
                                    
                                    <Card className="max-w-full shadow-none border-stroke rounded-lg">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">{selectedCar.brand.name}</p>
                        <p className="text-small text-default-500">
                            {selectedCar.model.name} {selectedCar.year}
                        </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Color: {selectedCar.color.name}
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Placa: {selectedCar.license_plate}
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Próxima Visita: 
                        </p>
                        <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                            Última Visita: 
                        </p>
                    </div>
                </CardBody>
            </Card>
                                    <div className="">
                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                            Detalles de la Cita
                                        </label>
                                        <Textarea
                                            variant="bordered"
                                            color="primary"
                                            placeholder="Enter your description"
                                            className="col-span-12 md:col-span-6"
                                            classNames={{
                                                inputWrapper: "border rounded-lg"
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">
                                            Siguiente
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="Fecha y Ubicación" title="Fecha y Ubicación">
                                <form className="flex flex-col gap-4 h-[300px]">
                                    <div className="">
                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                            Selecciona la fecha de tu visita
                                        </label>
                                        <DatePicker color="primary" label={"Fecha de la Cita"} variant="bordered"
                                            classNames={{
                                                inputWrapper: "border rounded-lg"
                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                            Selecciona la hora
                                        </label>
                                        <Select
                                            variant="bordered"
                                            color="primary"
                                            label="Hora de tu cita"
                                            placeholder="Select an animal"
                                            className="max-w-xs"
                                        >
                                            <SelectItem key={""}>12:00</SelectItem>
                                        </Select>
                                    </div>
                                    <div className="flex">
                                        <Button fullWidth color="primary" className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">
                                            Hacer Cita
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default Newappointment;