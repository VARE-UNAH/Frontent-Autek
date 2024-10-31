'use client'
import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import LoginLayout from "@/components/Layouts/LoginLayout";
import { useRouter } from "next/navigation"; // Reemplaza `next/router` por `next/navigation`
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase"; // Importa la configuración de Firebase
import { FirebaseError } from "firebase/app";
import { fetchUserProfile } from "@/services/user/userService";
import Beneficios from '@/components/Grid';

const home = () => {
    const items = [
        { icon: 'fa-calendar-days', title: 'Citas', description: 'Programación de citas según tu conveniencia y disponibilidad' },
        { icon: 'fa-dollar-sign', title: 'Presupuestos', description: 'Aprobación de presupuestos en línea para el mantenimiento de tu auto' },
        { icon: 'fa-clock', title: 'Seguimiento', description: 'Seguimiento en tiempo real del progreso de tu vehículo' },
        { icon: 'fa-credit-card', title: 'Pagos en línea', description: 'Paga de forma segura las facturas de tu mantenimiento' },
    ];
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const token = await user.getIdToken();
            console.log("Token de ID:", token);

            // Aquí haces el console log del usuario
            console.log("Usuario autenticado:", user);

            localStorage.setItem("user", JSON.stringify(user)); // Guardar el objeto user
            localStorage.setItem("accessToken", token); // Guardar solo el token
            const userProfile = await fetchUserProfile();
            localStorage.setItem("userProfile", JSON.stringify(userProfile));

            router.push("/"); // Redirige a la página del dashboard tras iniciar sesión
        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            if (error instanceof FirebaseError) {
                console.log(error.code)
                switch (error.code) {
                    case "auth/invalid-credential":
                        setError("El usuario o contraseña no son validos, Inténtalo de nuevo.");
                        break;
                    case "auth/user-disabled":
                        setError("Este usuario ha sido deshabilitado.");
                        break;
                    case "auth/user-not-found":
                        setError("No se encontró una cuenta con este correo electrónico.");
                        break;
                    case "auth/wrong-password":
                        setError("La contraseña es incorrecta.");
                        break;
                    case "auth/too-many-requests":
                        setError("Demsiados intentos usuario bloqueado momentaneamente.");
                        break;
                    default:
                        setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
                }
            } else {
                setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
            }

        }
    };

    return (
        <LoginLayout>
            <nav className="bg-black border-gray-200 items-center justify-center dark:bg-gray-900 h-15">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center transform rtl:space-x-reverse">
                        <img src="/images/autek/autek_white.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center ps-2 text-2xl font-normal whitespace-nowrap text-white dark:text-white">AUTEK</span>
                    </a>
                </div>
            </nav>
            <div className="relative w-full h-55 shadow-black shadow-lg">
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
            <div className="max-w-md w-full bg-white  shadow-lg  p-8 relative">
                <h1 className="text-title-lg font-bold text-black pb-2">Ingresa ahora</h1>
                <p className="text-base text-black pb-3">
                    Ingresa para poder audarte en todo lo que necesites en <span className="font-bold">AUTEK</span>
                </p>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Ingresa ahora
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <a href="/auth/signup" className="text-blue-600 hover:underline">
                        Regístrate
                    </a>
                </p>
                {/* Iconos redes sociales */}
                <div className="flex items-center justify-center pt-4 space-x-3 ">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 12 7 L 14 7 C 14 8.005 15.471 9 16 9 L 16 11 C 15.395 11 14.668 10.734156 14 10.285156 L 14 14 C 14 15.654 12.654 17 11 17 C 9.346 17 8 15.654 8 14 C 8 12.346 9.346 11 11 11 L 11 13 C 10.448 13 10 13.449 10 14 C 10 14.551 10.448 15 11 15 C 11.552 15 12 14.551 12 14 L 12 7 z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                    </svg>
                </div>
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
            <Beneficios title="BENEFICIOS" items={items} />;
        </LoginLayout>
    );
};

export default home;