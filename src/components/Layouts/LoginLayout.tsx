"use client";
import React, { useState, ReactNode } from "react";

import { Toaster, toast } from 'sonner'
import Footer from "../Footer";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <div className="flex-1 flex flex-col w-full relative"> {/* Cambié lg:ml-72.5 a w-full */}
                    <main className="flex-grow w-full"> {/* Añadí w-full para asegurar el ancho completo */}
                        {children}
                        <Toaster position="top-right" />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
}