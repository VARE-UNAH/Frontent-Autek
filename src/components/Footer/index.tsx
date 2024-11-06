import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white shadow dark:bg-gray-800  bottom-0 left-0 w-full">
            <div className="w-full mx-auto max-w-screen-xl border-t-2 border-stroke p-4 md:items-center md:justify-between sticky bottom-0 left-0">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024 <a href="/home" className="hover:underline">Autek™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
