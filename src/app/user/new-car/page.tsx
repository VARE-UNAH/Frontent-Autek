'use client'
import React, { useState } from "react";
import { Select, SelectItem, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from 'react';
import { fetchCarBrands } from '@/services/car/brandsService';

type Brand = {
    key: string;
    label: string;
};


const Newcar = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        const loadCarBrands = async () => {
            const brandsData = await fetchCarBrands();
            setBrands(brandsData);
            console.log(brands)
        };

        loadCarBrands();
    }, []);
    return (
        <DefaultLayout>
            <h1 className="text-3xl font-bold text-black pb-2">Añadir Vehículo Nuevo</h1>
            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className="mt-4">
                        <form className="space-y-6">
                            <div className="mb-4">
                                <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                    Marca del Vehículo
                                </label>
                                
                                <Autocomplete
                                    label="Selecciona la marca de tu vehiculo"
                                    className="bg-white shadow-none"
                                    variant="bordered"
                                    color="primary"
                                    inputProps={{
                                        classNames: {
                                          input: "ml-1",
                                          inputWrapper: "shadow-none border border-1 rounded-lg",
                                          label: "ms-2 text-gray2 text-md"
                                        },
                                      }}
                                    
                                    classNames={{
                                    }}
                                >
                                    {brands.map((animal) => (
                                        <AutocompleteItem key={animal.key} value={animal.label}>
                                            {animal.label}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                            </div>
                            
                            <div className="mb-4">
                                <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                    Nombre
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ingrese su nombre completo"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        autoComplete="off" //
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <svg
                                            className="fill-current"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.5">
                                                <path
                                                    d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                                    fill=""
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition"
                            >
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Newcar;