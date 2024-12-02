// services/car/carService.ts
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars/create/one/`;

export const createCar = async (data: {
    brand_id: number;
    model_id: number;
    color_id: number;
    year: string;
    license_plate: string;
}): Promise<void> => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Token de acceso no encontrado. Por favor, inicia sesión.");
    }
    console.log(data);
    try {
        const response = await axios.post(
            API_URL,
            data,
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
