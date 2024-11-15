import axios from 'axios';

  interface UserProfile {
      access_token: string;
      email: string;
      full_name: string;
      refresh_token: string;

};

  const checkServerConnection = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
      return response.status === 200; // Si el estado es 200, el servidor está funcionando
    } catch (error) {
      return false; // Si hay un error, el servidor no está disponible
    }
  };

  export const fetchUserProfile = async (): Promise<UserProfile> => {
    try {
      // Obtain the token from localStorage
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        throw new Error("No se encontró ningún token en localStorage.");
      }
  
      // Configure the request to fetch the user profile
      const response = await fetch("https://api.example.com/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener el perfil del usuario: ${response.status}`);
      }
  
      const data: UserProfile = await response.json();
  
      // Validate that the profile data is not null or empty
      if (!data || Object.keys(data).length === 0) {
        throw new Error("El perfil del usuario está vacío o no es válido.");
      }
  
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for higher-level handling
    }
  
    // Verificar si el servidor está disponible antes de intentar la solicitud
  /* 
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
    } */
  };
