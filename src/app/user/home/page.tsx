'use client'
import Link from "next/link";
import Vehiculos from "@/components/Vehiculos";
import ProgressVehicle from "@/components/ProgressVehicle";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useValidateToken } from "@/services/user/authService";
import { toast } from "sonner";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import { Wrench } from "lucide-react";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";

const Home = () => {


  return (
    <ProtectedLayout>
      <DefaultLayout>
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Inicio</h2>
        <Link href="/user/talleres" className="w-full">
          <div
            className="relative bg-cover bg-center p-2 rounded-lg mb-4 h-20 shadow-md w-full"
            style={{
              backgroundImage: "url('/images/cover/bg.jpg')",
            }}
          >
            {/* Capa de color superpuesta solo dentro del div */}
            <div className="absolute inset-0 bg-green-600 opacity-70 rounded-lg pointer-events-none"></div>

            {/* Contenido del div */}
            <div className="flex rounded-full w-auto">
              <h2 className="relative font-semibold text-white text-lg">Agendar Cita</h2>
              <Wrench className="relative text-white"></Wrench>
            </div>

          </div>
        </Link>
        <div className="flex justify-between items-center mb-1 pt-0 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Mis Citas Activas</h2>
        </div>
        <ProgressVehicle />
        <div className="flex justify-between items-center mb-1 pt-0 mt-4">
          <h2 className="text-lg font-semibold text-gray-700">Mis Vehículos</h2>
        </div>
        <Vehiculos />
      </DefaultLayout>
    </ProtectedLayout>
  );
};

export default Home;