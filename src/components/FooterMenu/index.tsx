'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Footermenu: React.FC = () => {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <footer className="bg-blue-600 shadow dark:bg-gray-800 sticky bottom-0 left-0 w-full z-999999">
            <div className="w-full mx-auto max-w-screen-xl border-t-2 border-stroke p-4 items-center">
                <ul className="flex justify-center gap-x-16 items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li className="text-center">
                        <Link
                            href="/user/home"
                            className={`hover:underline text-white ${
                                pathname === '/user/home' ? 'text-yellow-400' : ''
                            }`}
                        >
                            <i className="fa-solid fa-house text-2xl "></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/cars"
                            className={`hover:underline text-white ${
                                pathname === '/user/cars' ? 'text-yellow-400' : ''
                            }`}
                        >
                            <i className="fa-solid fa-car text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/appointments"
                            className={`hover:underline text-white ${
                                pathname === '/user/appointments' ? 'text-yellow-400' : ''
                            }`}
                        >
                            <i className="fa-solid fa-calendar text-2xl"></i>
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            href="/user/payments"
                            className={`hover:underline text-white ${
                                pathname === '/user/payments' ? 'text-yellow-400' : ''
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

export default Footermenu;
