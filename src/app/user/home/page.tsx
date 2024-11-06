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
import Footer from "@/components/Footer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

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
        <DefaultLayout>

            <Beneficios title="BENEFICIOS" items={items} />
        </DefaultLayout>
    );
};

export default Home;