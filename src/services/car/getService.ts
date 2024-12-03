import axios from 'axios';
import useSWR from 'swr';

type Car = {
    id_car: number;
    brand: {
      id_brand: number;
      name: string;
    };
    model: {
      id_model: number;
      name: string;
    };
    color: {
      id_color: number;
      name: string;
    };
    license_plate: string;
    year: string;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      date_of_birth: string;
    };
  }
// Función para obtener vehículos
export const getCars = async (): Promise<Car[]> => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/show/`, {
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

export const getCarById = async (carId: number): Promise<Car> => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Obtener el token del localStorage
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/show/${carId}/`, {
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
