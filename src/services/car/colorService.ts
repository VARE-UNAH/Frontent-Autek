// src/services/carBrandService.ts

import axios from 'axios';

type Color = {
  key: number;
  label: string;
};

export const fetchCarColors = async (): Promise<Color[]> => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    // Llamar a la API con el token en el encabezado Authorization
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/show/all/colors/`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
        'Content-Type': 'application/json',
      },
    });

    // Si la respuesta es exitosa, formatear los datos de las marcas
    const data = response.data; // Axios maneja la respuesta como un JSON automáticamente
    const colors = data.map((color: any) => ({
      key: color.id_color,
      label: color.name,
    }));

    return colors;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return [];
  }
};