// src/services/carBrandService.ts

type Brand = {
    key: string;
    label: string;
  };
  
  export const fetchCarBrands = async (): Promise<Brand[]> => {
    try {
      // Ahora llama a la API interna en lugar de la externa
      const response = await fetch('/api/carBrands');
      if (!response.ok) {
        throw new Error('Failed to fetch car brands');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching car brands:', error);
      return [];
    }
  };
  