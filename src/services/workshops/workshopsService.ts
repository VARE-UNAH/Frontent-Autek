import axios from 'axios';
import { WorkShop } from "@/types/workshop";

// Función para obtener vehículos
export const fetchWorkShops = async (): Promise<WorkShop[]> => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workshop/show/all/`, {
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

export const fetchWorkShopData = async (workShopId: number): Promise<WorkShop> => {
    try {
        const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
        if (!accessToken) {
            throw new Error('No access token found');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workshop/show/${workShopId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Configurar el Bearer token en el header
            },
        });
        console.log(response.data);
        return response.data; // Retorna los datos de los vehículos
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        throw error; // Lanza el error para manejarlo en el componente o en otro lugar
    }
};
