"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export const useValidateToken = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isValidated, setIsValidated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    const VALID_ROLES = new Set(["Admin", "Cliente"]);

    const clearLocalStorageAndRedirect = useCallback((path: string = "/auth/signin") => {
        ["user", "accessToken", "userProfile", "role"].forEach((key) =>
            localStorage.removeItem(key)
        );
        router.push(path);
    }, [router]);

    const isTokenValid = (token: string): boolean => {
        try {
            const [, payload] = token.split(".");
            if (!payload) return false;

            const { exp } = JSON.parse(atob(payload));
            const now = Math.floor(Date.now() / 1000);
            return exp > now;
        } catch {
            return false;
        }
    };

    const validateTokenAndRole = useCallback(() => {
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");

        if (!token || !isTokenValid(token)) {
            console.warn("Token no válido o ausente");
            clearLocalStorageAndRedirect();
            return;
        }

        if (!role || !VALID_ROLES.has(role)) {
            console.warn("Rol no válido o ausente");
            clearLocalStorageAndRedirect();
            return;
        }

        console.log("Token y rol válidos");
        setIsValidated(true);
        setUserRole(role);
    }, [clearLocalStorageAndRedirect]);

    const handleRouteAccess = useCallback(() => {
        if (!isValidated || !userRole) {
            return;
        }

        const routeRoleMap: Record<string, string[]> = {
            "/admin": ["Admin"],
            "/user": ["Cliente", "Admin"],
        };

        let isAuthorized = true;

        for (const [prefix, roles] of Object.entries(routeRoleMap)) {
            if (pathname.startsWith(prefix) && !roles.includes(userRole)) {
                isAuthorized = false;
                break;
            }
        }

        if (!isAuthorized) {
            console.warn("Usuario no autorizado para esta ruta");
            router.push("/unauthorized");
        }
    }, [isValidated, userRole, pathname, router]);

    useEffect(() => {
        validateTokenAndRole();
    }, [validateTokenAndRole]);

    useEffect(() => {
        handleRouteAccess();
    }, [handleRouteAccess]);

    return { isValidated, userRole };
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

export async function signIn(email: string, password: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in.");
      }
  
      const data = await response.json();
  
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("role", data.role);
  
      return { success: true, role: data.role };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  }




