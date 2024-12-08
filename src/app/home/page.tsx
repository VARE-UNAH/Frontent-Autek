'use client'
import React, { useState } from "react";
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import Beneficios from '@/components/Grid';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
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

            <Card className="w-full h-[50vh] rounded-none relative overflow-hidden rounded-none">
                <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover rounded-none"
                    src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <CardFooter className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm rounded-none">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-white/90 text-xl sm:text-2xl md:text-3xl font-bold mb-2">MONITOREA EN TIEMPO REAL EL MANTENIMIENTO DE TU VEHÍCULO</h1>
                        <p className="text-white/60 font-medium text-sm sm:text-base">Programa citas, paga mantenimientos y más</p>
                    </div>
                </CardFooter>
            </Card>

            <div className="bg-gray-50  py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-6 text-black">
                        Ingresa ahora
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 text-center mb-8">
                        Ingresa para poder ayudarte en todo lo que necesites en{' '}
                        <span className="font-bold text-blue-600">AUTEK</span>
                    </p>
                    <Link href="/auth/signin" passHref>
                        <button
                            type="button"
                            className="w-full py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Ingresa ahora
                        </button>
                    </Link>
                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">O continúa con</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-4 gap-3">
                        {[
                            { Icon: Facebook, color: "text-blue-600" },
                            { Icon: Twitter, color: "text-blue-400" },
                            { Icon: Instagram, color: "text-pink-600" },
                            { Icon: Linkedin, color: "text-blue-800" },
                        ].map(({ Icon, color }, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex justify-center items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
                            >
                                <Icon className={`h-5 w-5 ${color}`} />
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 text-center space-y-2">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <a href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500 transition">
                                Regístrate
                            </a>
                        </p>
                        <p className="text-sm text-gray-600">
                            Para empresas{' '}
                            <a href="/contact" className="font-medium text-blue-600 hover:text-blue-500 transition">
                                Contáctanos
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <Beneficios title="BENEFICIOS" items={items} />

        </LoginLayout>
    );
};

export default Home;