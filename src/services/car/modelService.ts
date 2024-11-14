// src/services/car/modelsService.ts

type Model = {
    key: string;
    label: string;
  };

export const fetchCarModels =  async (brandKey: string): Promise<Model[]> => {
    try {
      const response = await fetch(`/api/carModels?brand=${brandKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch car models');
      }
      
      const data = await response.json();
      console.log("funcion fetch",data)
      return data.models;
    } catch (error) {
      console.error('Error fetching car models:', error);
      return [];
    }
  };
  