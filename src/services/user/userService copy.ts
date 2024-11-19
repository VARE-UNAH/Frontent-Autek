import axios from 'axios';

interface Person {
    firstName: string;
    lastName: string;
  }
  
  interface UserProfile {
    user: {
      id: number;
      email: string;
      active: boolean;
      verified: boolean;
      firebaseUid: string;
    };
    person: Person;
  }

  const checkServerConnection = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
      return response.status === 200; // Si el estado es 200, el servidor está funcionando
    } catch (error) {
      return false; // Si hay un error, el servidor no está disponible
    }
  };

  export const fetchUserProfile = async () => {
    // Obtener el token de localStorage
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      throw new Error("No se encontró ningún token en localStorage.");
    }
  
    // Verificar si el servidor está disponible antes de intentar la solicitud
    const serverAvailable = await checkServerConnection();
  
    if (!serverAvailable) {
      throw new Error("El servidor no está funcionando correctamente. Intenta nuevamente más tarde.");
    }
  
    try {
      // Realizar la solicitud GET para obtener el perfil del usuario
      const response = await axios.get<UserProfile>(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajusta el encabezado según tu configuración
        },
      });
  
      // Retornar la data obtenida
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Manejar errores de la respuesta
        throw new Error(error.response?.data?.message || "Error al obtener el perfil de usuario.");
      } else {
        // Si no es un error de Axios, lanzar un error genérico
        throw new Error("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    }
  };
