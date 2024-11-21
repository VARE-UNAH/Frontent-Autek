// src/services/car/modelsService.ts

import axios from 'axios';

type Model = {
  key: string;
  label: string;
};

export const fetchCarModels = async (brandKey: string): Promise<Model[]> => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('No access token found');
    }

    // Llamar a la API con el token en el encabezado Authorization y pasando el brandKey (ID de la marca)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/show/all/brands/${brandKey}/model`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
        'Content-Type': 'application/json',
      },
    });

    // Si la respuesta es exitosa, formatear los datos de los modelos de autos
    const data = response.data;

    if (!data || !Array.isArray(data)) {
      throw new Error('Unexpected response format');
    }

    // Si la respuesta es válida, formatear los datos de los modelos de autos
    const models = data.map((model: any) => ({
      key: model.id_model, // ID del modelo
      label: model.name, // Nombre del modelo
    }));

    return models;

    return models;
  } catch (error) {
    console.error('Error fetching car models:', error);
    return [];
  }
};
