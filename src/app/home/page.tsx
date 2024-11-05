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
import Social from '@/components/Social';

const Home = () => {
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
                        <Image src="/images/autek/autek_white.png" className="h-8" alt="Autek Logo" width={40} // Set your desired width here
                            height={32} />
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
            <Beneficios title="BENEFICIOS" items={items} />;
        </LoginLayout>
    );
};

export default Home;