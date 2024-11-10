'use client'
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
} from "@nextui-org/react";
import { Select, SelectItem, CardFooter, Divider, Image } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
const cars = [
    {
        id: 1,
        brand: "Toyota",
        year: "2019",
        model: "Corolla",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    },
];

const Newappointment = () => {
    const [selected, setSelected] = useState<string>("login");
    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                <BreadcrumbItem href="/profile">Citas</BreadcrumbItem>
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
                                <form className="flex flex-col gap-4">
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
                                            defaultSelectedKeys={["cat"]}
                                            classNames={{
                                                trigger: "shadow-none border border-1 rounded-lg",
                                            }}
                                        >
                                            {cars.map((user) => (
                                                <SelectItem key={user.id} textValue={user.brand && user.model}>
                                                    <div className="flex gap-2 items-center">
                                                        <Avatar alt={user.brand} className="flex-shrink-0" size="sm" src={user.avatar} />
                                                        <div className="flex flex-col">
                                                            <span className="text-small">{user.brand} {user.model} {user.year}</span>
                                                            <span className="text-tiny text-default-400">Corolla</span>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <Card className="max-w-full shadow-none border border-1 border-stroke rounded-lg">
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
                                        <DatePicker color="primary" label={"Birth date"} variant="bordered"
                                            classNames={{
                                                inputWrapper: "border rounded-lg"

                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                            Selecciona la hora
                                        </label>
                                        <DatePicker color="primary" label={"Birth date"} variant="bordered"
                                            classNames={{
                                                inputWrapper: "border rounded-lg"

                                            }}
                                        />
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