// services/car/carService.ts
import { Appointment } from "@/types/appointment";
import { Budget } from "@/types/budget";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/create/one/`;



export const createAppointment = async (data: {
    id_car: number;
    id_workshop: number;
    description: string;
    date: string;
}): Promise<void> => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Token de acceso no encontrado. Por favor, inicia sesión.");
    }

    const user = (localStorage.getItem("userProfile"));

    if (!user) {
        throw new Error("No hay un usuario, inicia sesión.");
    }

    const parsedUser = JSON.parse(user);

    const user_id = parsedUser.id;

    const requestData = {
        ...data,
        user_id, // Añadimos el user_id al objeto de datos
    };

    console.log(data);
    try {
        const response = await axios.post(
            API_URL,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Manejo de errores específicos del servidor
            console.error("Error del servidor:", error.response.data);
            throw new Error(error.response.data.message || "Error al crear el vehículo");
        } else {
            // Otros errores (de red, etc.)
            console.error("Error desconocido:", error.message);
            throw new Error("Hubo un problema al comunicarse con el servidor");
        }
    }
};

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/show/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Configurar el Bearer token en el header
            },
        });

        return response.data; // Retorna los datos de los vehículos
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        throw error; // Lanza el error para manejarlo en el componente o en otro lugar
    }
};

export const getAppointmentById = async (appointmentId: number): Promise<Appointment> => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/show/${appointmentId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Configurar el Bearer token en el header
            },
        });

        return response.data; // Retorna los datos de los vehículos
    } catch (error) {
        console.error('Error al obtener el appointment:', error);
        throw error; // Lanza el error para manejarlo en el componente o en otro lugar
    }
};

export const getBudgetsByAppointmentId = async (appointmentId: number): Promise<Budget[]> => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/${appointmentId}/budget/show/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Configurar el Bearer token en el header
            },
        });

        return response.data; // Retorna los datos de los vehículos
    } catch (error) {
        console.error('Error al obtener el appointment:', error);
        throw error; // Lanza el error para manejarlo en el componente o en otro lugar
    }
};
