import axios from "axios";

export const createBudget = async (
    id_appointment: number,
    description: string,
    amount: number
): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Token de acceso no encontrado. Por favor, inicia sesión.");
    }

    const data = {
        id_appointment,
        description,
        amount,
    };

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/budget/new/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Configurar el Bearer token en el header
                },
            }
        );
        return response.data; // Retorna la respuesta de la API
    } catch (error: any) {
        if (error.response) {
            // Manejo de errores específicos del servidor
            console.error("Error del servidor:", error.response.data);
            throw new Error(error.response.data.message || "Error al crear el presupuesto");
        } else {
            // Otros errores (de red, etc.)
            console.error("Error desconocido:", error.message);
            throw new Error("Hubo un problema al comunicarse con el servidor");
        }
    }
};