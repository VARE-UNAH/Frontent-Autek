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
import Grid from "@/components/Dashboard/AdminGrid";

const Home = () => {

    /* useValidateToken();
    const isValidated = useValidateToken(); // Hook personalizado

    if (!isValidated) {
        // Mientras se valida, muestra un indicador de carga
        return <div className="flex items-center justify-center h-screen">
            <Loader /> {/* Muestra el componente Loader mientras valida }
        </div>
    } 
    */

    return (
        <AdminDefaultLayout>
            <h1 className="text-3xl font-bold text-black pb-2">Administración</h1>
            <Grid></Grid>
             
        </AdminDefaultLayout>
    );
};

export default Home;