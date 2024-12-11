import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Servicio para agregar una imagen a una cita
 * @param idAppointment - ID de la cita
 * @param imageUrl - URL de la imagen
 * @param description - Descripción de la imagen
 * @returns Respuesta del servidor
 */
export const addAppointmentImage = async (
    idAppointment: number,
    imageUrl: string,
    description: string
): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Token de acceso no encontrado. Por favor, inicia sesión.");
    }

    if (!idAppointment || typeof idAppointment !== 'number') {
        return { error: 'El ID de la cita es obligatorio y debe ser un número.' };
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !/^https?:\/\//.test(imageUrl)) {
        return { error: 'La URL de la imagen es obligatoria y debe ser válida.' };
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return { error: 'La descripción es obligatoria y debe ser un texto válido.' };
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/service/appointment/image/add/`,
            {
                id_appointment: idAppointment,
                url: imageUrl,
                description: description.trim(),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Agrega el token al encabezado
                },
            }
            
        );

        return response.data;
    } catch (error: any) {
        console.error('Error al agregar la imagen a la cita:', error);
        throw error.response ? error.response.data : error;
    }
};
