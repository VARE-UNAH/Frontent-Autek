"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function ProtectedLayout({   children,
}: {
  children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            
            <div>
                {children}
            </div>
        </AuthProvider>
    );
}