'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminDefaultLayout from "@/components/Layouts/AdminLayout";
import Loader from "@/components/common/Loader";
import { toast } from "sonner";
import { useValidateToken } from "@/services/user/authService";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";

interface AppointmentDetails {
  id_appointment: number;
  user: {
    id: string;
    first_name: string;
    email: string;
  };
  car: {
    id: number;
    brand: string;
    model: string;
    license_plate: string;
    year: string;
  };
  workshops: {
    id: number;
    name: string;
    address: string;
    city: string;
  };
  description: string;
  date: string;
  appointment_status: {
    id: number;
    name: string;
  };
}

const AppointmentDetailsPage = () => {
  const params = useParams();
  const citaId = params.citaId as string;
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/show/${citaId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointment details');
        }
        const data = await response.json();
        setAppointmentDetails(data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
        toast.error('Error al cargar los detalles de la cita');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [citaId]);

  if (isLoading) {
    return (
      <ProtectedLayout>
        <AdminDefaultLayout>
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        </AdminDefaultLayout>
      </ProtectedLayout>
    );
  }

  if (!appointmentDetails) {
    return (
      <ProtectedLayout>
        <AdminDefaultLayout>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black pb-2">Cita no encontrada</h1>
          </div>
        </AdminDefaultLayout>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <AdminDefaultLayout>
        <h1 className="text-3xl font-bold text-black pb-2">Detalles de la Cita</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Cita #{appointmentDetails?.id_appointment || 'No disponible'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Información del Usuario</h3>
              <p><strong>Nombre:</strong> {appointmentDetails?.user?.first_name || 'No disponible'}</p>
              <p><strong>Email:</strong> {appointmentDetails?.user?.email || 'No disponible'}</p>
              <p><strong>ID:</strong> {appointmentDetails?.user?.id || 'No disponible'}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Información del Vehículo</h3>
              <p><strong>Marca:</strong> {appointmentDetails?.car?.brand || 'No disponible'}</p>
              <p><strong>Modelo:</strong> {appointmentDetails?.car?.model || 'No disponible'}</p>
              <p><strong>Placa:</strong> {appointmentDetails?.car?.license_plate || 'No disponible'}</p>
              <p><strong>Año:</strong> {appointmentDetails?.car?.year || 'No disponible'}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Información del Taller</h3>
              <p><strong>Nombre:</strong> {appointmentDetails?.workshops?.name || 'No disponible'}</p>
              <p><strong>Dirección:</strong> {appointmentDetails?.workshops?.address || 'No disponible'}</p>
              <p><strong>Ciudad:</strong> {appointmentDetails?.workshops?.city || 'No disponible'}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Detalles de la Cita</h3>
              <p><strong>Descripción:</strong> {appointmentDetails?.description || 'No disponible'}</p>
              <p><strong>Fecha:</strong> {appointmentDetails?.date ? new Date(appointmentDetails.date).toLocaleString() : 'No disponible'}</p>
              <p><strong>Estado:</strong> {appointmentDetails?.appointment_status?.name || 'No disponible'}</p>
            </div>
          </div>
        </div>
      </AdminDefaultLayout>
    </ProtectedLayout>
  );
};

export default AppointmentDetailsPage;

