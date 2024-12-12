'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Footermenu: React.FC = () => {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <footer className="bg-blue-600 dark:bg-gray-800 fixed bottom-0 left-0 w-full">
            <div className="w-full mx-auto max-w-screen-xl p-4">
                <ul className="flex justify-center gap-x-16 items-center">
                    <li className="text-center">
                        <Link
                            href="/user/home"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/user/home' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-house text-2xl "></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/cars"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/user/cars' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-car text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/appointments"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/user/appointments' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-calendar text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/payments"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/user/payments' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-wallet text-2xl py-1"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export const AdminFootermenu: React.FC = () => {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <footer className="bg-blue-600 dark:bg-gray-800 fixed bottom-0 left-0 w-full">
            <div className="w-full mx-auto max-w-screen-xl p-4">
                <ul className="flex justify-center gap-x-16 items-center">
                    <li className="text-center">
                        <Link
                            href="/admin/home"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/admin/home' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-house text-2xl "></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/admin/cars"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/admin/cars' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-car text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/admin/appointments"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/admin/appointments' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-calendar text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/admin/payments"
                            className={`flex flex-col items-center hover:text-slate-400 transition-colors ${pathname === '/admin/payments' ? 'text-white' : 'text-slate-400'
                                }`}
                        >
                            <i className="fa-solid fa-wallet text-2xl py-1"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

