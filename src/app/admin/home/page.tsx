'use client'
import Link from "next/link";
import Vehiculos from "@/components/Vehiculos";
import ProgressVehicle from "@/components/ProgressVehicle";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useValidateToken } from "@/services/user/authService";
import { toast } from "sonner";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import AdminDefaultLayout from "@/components/Layouts/AdminLayout";

const Home = () => {
    useValidateToken();
    const isValidated = useValidateToken(); // Hook personalizado

    if (!isValidated) {
        // Mientras se valida, muestra un indicador de carga
        return <div className="flex items-center justify-center h-screen">
            <Loader /> {/* Muestra el componente Loader mientras valida */}
        </div>
    }

    return (
        <AdminDefaultLayout>
            <h1 className="text-3xl font-bold text-black pb-2">Inicio</h1>
            <Link href="/talleres">
                <div
                    className="relative bg-cover bg-center p-2 rounded-lg mb-2 h-20 shadow-md"
                    style={{
                        backgroundImage: "url('/images/cover/bg.jpg')",
                    }}
                >
                    {/* Capa de color superpuesta solo dentro del div */}
                    <div className="absolute inset-0 bg-green-600 opacity-60 rounded-lg pointer-events-none"></div>

                    {/* Contenido del div */}
                    <h2 className="relative font-bold text-white text-xl">Crear Nueva Cita</h2>
                </div>
            </Link>
            <ProgressVehicle />
            <Vehiculos /> 
        </AdminDefaultLayout>
    );
};

export default Home;