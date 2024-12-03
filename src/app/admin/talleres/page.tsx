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
import TallerCardContainer from "@/components/Dashboard/TallerCardContainer";

const sampleCards = [
    {
        taller_name: 'Taller A',
        location: 'El pedregal',
        imageUrl: '/images/taller-a.jpg',
        linkUrl: '/taller-a',
        rating: 4.5,
    },
    {
        taller_name: 'Taller B',
        location: 'Kennedy',
        imageUrl: '/images/taller-b.jpg',
        linkUrl: '/taller-b',
        rating: 4.2,
    },
    {
        taller_name: 'Taller C',
        location: 'Valimos',
        imageUrl: '/images/taller-c.jpg',
        linkUrl: '/taller-c',
        rating: 4.8,
    },
    {
        taller_name: 'Taller D',
        location: 'Tuani',
        imageUrl: '/images/taller-d.jpg',
        linkUrl: '/taller-d',
        rating: 4.6,
    },
];

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
            <h1 className="text-3xl font-bold text-black pb-2">Talleres</h1>
            <TallerCardContainer cards={sampleCards}></TallerCardContainer>
             
        </AdminDefaultLayout>
    );
};

export default Home;