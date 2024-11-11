'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";


const Cars = () => {
    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                <BreadcrumbItem href="/user/cars">Cars</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold pt-2 text-black pb-2">Tus Vehículos</h1>
            <Vehiculos></Vehiculos>
        </DefaultLayout>
    );
};

export default Cars;
