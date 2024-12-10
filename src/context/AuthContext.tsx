"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

type AuthContextType = {
  isValidated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const VALID_ROLES = new Set(["Admin", "Cliente"]);

  const validateAuth = () => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token) {
      console.warn("Usuario no autenticado");
      redirectToLogin();
      return false; // Bloquea la validación
    }

    if (!role || !VALID_ROLES.has(role)) {
      console.warn("Rol no válido o ausente");
      redirectToUnauthorized();
      return false; // Bloquea la validación
    }

    // Usuario autenticado y rol válido
    setIsValidated(true);
    return true;
  };

  const redirectToLogin = () => {
    setIsValidated(false);
    setIsLoading(false);
    router.push("/auth/signin");
  };

  const redirectToUnauthorized = () => {
    setIsValidated(false);
    setIsLoading(false);
    router.push("/unauthorized");
  };

  const handleRouteAccess = () => {
    const routeRoleMap: Record<string, string[]> = {
      "/admin": ["Admin"],
      "/user": ["Cliente"],
    };

    const role = localStorage.getItem("role") || "";
    for (const [prefix, roles] of Object.entries(routeRoleMap)) {
      if (pathname.startsWith(prefix) && !roles.includes(role)) {
        console.warn("Acceso denegado para esta ruta");
        redirectToUnauthorized();
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = validateAuth();

      if (isAuthenticated) {
        const hasAccess = handleRouteAccess();

        if (!hasAccess) {
          return; // No continuar si no hay acceso
        }
      }

      setIsLoading(false); // Termina el proceso de carga solo después de todo
    };

    initialize();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ isValidated, isLoading }}>
      {/* Solo renderizar contenido si está validado y no cargando */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
