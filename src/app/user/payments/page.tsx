'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";


const Cars = () => {
    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                <BreadcrumbItem href="/user/cars">Payments</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold pt-2 text-black pb-2">Tus Metodos de Pago</h1>

            <Card isFooterBlurred className="w-full h-[200px] col-span-12 sm:col-span-7 bg-blue-600">
                <CardHeader className="absolute z-10 top-1 flex-col items-stretch">
                    <h4 className="text-white/90 font-medium text-xl">BANCO ATLANTIDA</h4>
                </CardHeader>
                
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="https://nextui.org/images/breathing-app-icon.jpeg"
                        />
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
        </DefaultLayout>
    );
};

export default Cars;
