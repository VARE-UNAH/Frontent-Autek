'use client'
import React, { useState } from "react";
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import Beneficios from '@/components/Grid';
import Social from '@/components/Social';
import Footer from "@/components/Footer";
import { Navbar, Image, NavbarContent, NavbarBrand, Card, CardFooter } from "@nextui-org/react";

const Home = () => {
    const items = [
        { icon: 'fa-calendar-days', title: 'Citas', description: 'Programación de citas según tu conveniencia y disponibilidad' },
        { icon: 'fa-dollar-sign', title: 'Presupuestos', description: 'Aprobación de presupuestos en línea para el mantenimiento de tu auto' },
        { icon: 'fa-clock', title: 'Seguimiento', description: 'Seguimiento en tiempo real del progreso de tu vehículo' },
        { icon: 'fa-credit-card', title: 'Pagos en línea', description: 'Paga de forma segura las facturas de tu mantenimiento' },
    ];
    return (
        <LoginLayout>
            <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-15 object-cover rounded-none absolute"
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Navbar className="bg-black/40 backdrop-blur-md shadow-lg h-15">
                <NavbarContent className="relative flex items-center justify-center">
                    <NavbarBrand className="flex items-center justify-center">
                        {/* <Image
              src="/images/autek/autek_white.png"
              alt="Autek Logo"
              className="h-8"
              width={30}
              height={32}
              layout="intrinsic"
            /> */}
                        <Image
                            src="/images/autek/autek_white.png"
                            alt="Autek Logo"
                            width={30}
                            height={32}
                            style={{ height: 'auto', maxWidth: '100%' }}
                        />
                        <p className="font-bold text-inherit ps-1 text-white">AUTEK</p>
                    </NavbarBrand>
                </NavbarContent>
            </Navbar>

            <Card className="w-full h-50 col-span-12 sm:col-span-7 rounded-none">
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover rounded-none"
                    src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <CardFooter className="absolute flex flex-col bg-black/5 bottom-0 z-10 items-start backdrop-blur-sm" >
                    <h1 className="text-white/90 text-md font-bold">MONITOREA EN TIEMPO REAL EL MANTENIMIENTO DE TU VEHÍCULO</h1>
                    <p className="text-white/60 font-medium text-sm">Programa citas, paga mantenimientos y más</p>
                </CardFooter>
            </Card>
            <div className="max-w-full md:max-w-lg lg:max-w-xl w-full bg-white justify-center p-8 relative mx-auto">
                <h1 className="text-title-lg font-bold text-black pb-2">Ingresa ahora</h1>
                <p className="text-base text-black pb-3">
                    Ingresa para poder ayudarte en todo lo que necesites en <span className="font-bold">AUTEK</span>
                </p>
                <Link href="/auth/signin" passHref>
                    <button
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                        Ingresa ahora
                    </button>
                </Link>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Regístrate
                    </a>
                </p>
                {/* Iconos redes sociales */}
                <Social />
                {/* Contactanos */}
                <div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Para empresas{' '}
                        <a href="/auth/signup" className="text-blue-600 hover:underline">
                            Contactanos
                        </a>
                    </p>
                </div>


            </div>
            <Beneficios title="BENEFICIOS" items={items} />

        </LoginLayout>
    );
};

export default Home;