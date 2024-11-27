import React from 'react';
import Image from 'next/image';

const Footermenu: React.FC = () => {
    return (
        <footer className="bg-blue-600 shadow dark:bg-gray-800 sticky bottom-0 left-0 w-full">
            <div className="w-full mx-auto max-w-screen-xl border-t-2 border-stroke p-4 md:flex md:items-center md:justify-between">
                <ul className="flex justify-center gap-x-16 items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li className="text-center">
                        <a href="/user/home" className="hover:underline text-white h-full">
                            <i className="fa-solid fa-house text-lg"></i>
                        </a>
                    </li>
                    <li className="text-center">
                        <a href="/user/cars" className="hover:underline text-white">
                            <i className="fa-solid fa-car text-lg"></i>
                        </a>
                    </li>
                    <li className="text-center">
                        <a href="/user/calendar" className="hover:underline text-white">
                            <i className="fa-solid fa-calendar text-lg"></i>
                        </a>
                    </li>
                    <li className="text-center">
                        <a href="/user/payments" className="hover:underline text-white">
                            <i className="fa-solid fa-wallet text-lg"></i>
                        </a>
                    </li>
                </ul>
            </div>


        </footer>
    );
};

export default Footermenu;