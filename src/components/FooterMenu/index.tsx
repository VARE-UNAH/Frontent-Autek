import React from 'react';
import Image from 'next/image';

const Footermenu: React.FC = () => {
    return (
        <footer className="bg-primary shadow dark:bg-gray-800 sticky bottom-0 left-0 w-full">
            <div className="w-full mx-auto max-w-screen-xl border-t-2 border-stroke p-4 md:flex md:items-center md:justify-between">

                <ul className="flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-white">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-white">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 text-white">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline text-white">Contact</a>
                    </li>
                </ul>

            </div>
        </footer>
    );
};

export default Footermenu;