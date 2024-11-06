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
                <div className="flex-1 flex flex-col lg:ml-72.5 relative">
                    <main className="flex-grow">
                        {children}
                        <Toaster position="top-right" />
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
}