/* import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useValidateToken = () => {
    const router = useRouter();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('accessToken');

            if (token) {
            } else {
                // No hay token, limpiar y redirigir
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userProfile");
                router.push('/auth/signin'); // Redirige si no hay usuario
            }
        };

        validateToken();
    }, [router]);
}; */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useValidateToken = () => {
    const router = useRouter();
    const [isValidated, setIsValidated] = useState(false); // Estado de validación

    /**
     * Limpia el almacenamiento local y redirige al inicio de sesión.
     */
    const clearLocalStorageAndRedirect = (router: any) => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        router.push("/auth/signin");
    };

    /**
     * Verifica si el token es válido.
     */
    const isTokenValid = (token: string): boolean => {
        try {
            const [, payload] = token.split(".");
            if (!payload) return false;

            const { exp } = JSON.parse(atob(payload)); // Decodifica el payload
            const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            return exp > now; // Valida que el token no haya expirado
        } catch {
            return false; // Si ocurre un error, el token es inválido
        }
    };

    /**
     * Valida el token del almacenamiento local.
     */
    const validateToken = useCallback(() => {
        const token = localStorage.getItem("accessToken");

        if (!token || !isTokenValid(token)) {
            console.warn("Token no válido o ausente");
            clearLocalStorageAndRedirect(router);
        } else {
            console.log("Token válido");
            setIsValidated(true); // Marca como validado
        }
    }, [router]);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    return isValidated; // Retorna el estado de validación
};

export const logoutUser = async () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
        console.error("No se encontró el token de acceso.");
        return false; // Si no hay token, retornamos false
    }

    try {
        // Realiza la solicitud POST al backend para destruir el token
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/auth/logout/`,
            { refresh_token: refreshToken },  // Enviamos el token en el cuerpo de la solicitud
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviamos el token en el header
                },
            }
        );
        
        // Si la respuesta es exitosa, devuelve true
        if (response.status === 204) {
            return true;
        }

        // Si no es 200, lanza un error
        throw new Error("Error al invalidar el token en el servidor");
    } catch (error) {
        console.error("Error al intentar cerrar sesión:", error);
        return false;
    }
};




