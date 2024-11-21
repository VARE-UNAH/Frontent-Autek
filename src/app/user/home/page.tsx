'use client'
import Link from "next/link";
import Vehiculos from "@/components/Vehiculos";
import ProgressVehicle from "@/components/ProgressVehicle";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useValidateToken } from "@/services/user/authService";
import { toast } from "sonner";
import Loader from "@/components/common/Loader";

const Home = () => {
    
    const items = [
        { icon: 'fa-calendar-days', title: 'Citas', description: 'Programación de citas según tu conveniencia y disponibilidad' },
        { icon: 'fa-dollar-sign', title: 'Presupuestos', description: 'Aprobación de presupuestos en línea para el mantenimiento de tu auto' },
        { icon: 'fa-clock', title: 'Seguimiento', description: 'Seguimiento en tiempo real del progreso de tu vehículo' },
        { icon: 'fa-credit-card', title: 'Pagos en línea', description: 'Paga de forma segura las facturas de tu mantenimiento' },
    ];
    useValidateToken();
    const isValidated = useValidateToken(); // Hook personalizado

    if (!isValidated) {
        // Mientras se valida, muestra un indicador de carga
        return <div className="flex items-center justify-center h-screen">
            <Loader /> {/* Muestra el componente Loader mientras valida */}
        </div>
    }

    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold text-black pb-2">Inicio</h1>
            <Link href="/appointments/new">
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
        </DefaultLayout>
    );
};

export default Home;