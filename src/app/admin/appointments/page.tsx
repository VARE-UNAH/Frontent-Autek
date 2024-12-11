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
import { AppointmentsDashboard } from "@/components/Dashboard/CitasDashboard";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";

const Home = () => {
    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
                <h1 className="text-3xl font-bold text-black pb-2">Citas</h1>
                <AppointmentsDashboard></AppointmentsDashboard>

            </AdminDefaultLayout>
        </ProtectedLayout>
    );
};

export default Home;