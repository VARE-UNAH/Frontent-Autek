'use client'
import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import Beneficios from '@/components/Grid';
import Social from '@/components/Social';
import Footer from "@/components/Footer";

const Home = () => {
    const items = [
        { icon: 'fa-calendar-days', title: 'Citas', description: 'Programación de citas según tu conveniencia y disponibilidad' },
        { icon: 'fa-dollar-sign', title: 'Presupuestos', description: 'Aprobación de presupuestos en línea para el mantenimiento de tu auto' },
        { icon: 'fa-clock', title: 'Seguimiento', description: 'Seguimiento en tiempo real del progreso de tu vehículo' },
        { icon: 'fa-credit-card', title: 'Pagos en línea', description: 'Paga de forma segura las facturas de tu mantenimiento' },
    ];
    return (
        <LoginLayout>
            <nav className="bg-black border-gray-200 items-center justify-center dark:bg-gray-900 h-15">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                    <a href="/home" className="flex items-center transform rtl:space-x-reverse">
                        <Image src="/images/autek/autek_white.png" className="h-8" alt="Autek Logo" width={40} // Set your desired width here
                            height={32} />
                        <span className="self-center ps-2 text-2xl font-normal whitespace-nowrap text-white dark:text-white">AUTEK</span>
                    </a>
                </div>
            </nav>
            <div className="relative w-full h-55 shadow-black">
                {/* Imagen de fondo */}
                <Image
                    src={'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                    alt="Fondo de mantenimiento de vehículo"
                    layout="fill"
                    objectFit="cover"
                    className="-z-10"
                    
                />
                {/* Superposición con texto */}
                <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 px-6 pb-6 text-white">
                    <h1 className="text-xl font-bold">MONITOREA EN TIEMPO REAL EL MANTENIMIENTO DE TU VEHÍCULO</h1>
                    <p className="text-base">Programa citas, paga mantenimientos y más</p>
                </div>
            </div>
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