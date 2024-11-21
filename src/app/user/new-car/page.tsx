'use client'
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from 'react';
import { fetchCarBrands } from '@/services/car/brandsService';
import { fetchCarModels } from '@/services/car/modelService';
import { toast } from "sonner";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import TrLoader from "@/components/common/TrLoader";

type Brand = {
    key: string;
    label: string;
};

type Model = {
    key: string;
    label: string;
};

const Newcar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Cargar marcas solo una vez
    useEffect(() => {
        const loadCarBrands = async () => {
            try {
                const brandsData = await fetchCarBrands();
                setBrands(brandsData);
            } catch (error) {
                console.error("Error cargando marcas:", error);
            }
        };

        loadCarBrands();
    }, []); // La dependencia está vacía, se ejecuta solo una vez al montar el componente

    const handleCreateCar = () => {
        // Lógica para añadir el vehículo puede ir aquí, si es necesario
        // Mostrar notificación de éxito
        toast.success("Vehículo añadido correctamente");
    };

    // Cargar modelos cuando se seleccione una marca
    useEffect(() => {
        const loadCarModels = async () => {
            if (selectedBrand) {
                try {
                    setIsLoading(true);  // Mostrar cargando
                    const modelsData = await fetchCarModels(selectedBrand);
                    setModels(modelsData);
                    setIsLoading(false);  // Ocultar cargando
                } catch (error) {
                    setIsLoading(false);  // Ocultar cargando en caso de error
                    console.error("Error cargando modelos:", error);
                }
            }
        };

        // Solo cargar modelos si se selecciona una marca
        if (selectedBrand) {
            loadCarModels();
        }
    }, [selectedBrand]); // Dependencia solo en selectedBrand

    const onSelectionChange = (key: React.Key | null) => {
        if (typeof key === "string") {
            setSelectedBrand(key);
            console.log(key);
        } else {
            setSelectedBrand(null);
        }
    };

    return (

        <DefaultLayout>
            {isLoading && <TrLoader />}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Confirmar nuevo vehículo</ModalHeader>
                            <ModalBody>
                                <p>
                                    Esta seguro que sea añadir este nuevo vehículo
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose} className="bg-gradient-to-r from-red to-#f87171 text-white py-4 px-4 rounded-md hover:bg-red transition">
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleCreateCar} className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition" >
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Breadcrumbs size="lg" variant="bordered">
                <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                <BreadcrumbItem href="/profile">Profile</BreadcrumbItem>
                <BreadcrumbItem href="/user/new-car">New Car</BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-3xl font-bold pt-2 text-black pb-2">Añadir Vehículo Nuevo</h1>
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
                                    isRequired
                                    onSelectionChange={onSelectionChange}
                                    inputProps={{
                                        classNames: {
                                            input: 'ml-1',
                                            inputWrapper: 'shadow-none border border-1 rounded-lg',
                                            label: 'ms-2 text-gray2 text-md',
                                        },
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
                                    Modelo del Vehículo
                                </label>

                                <Autocomplete
                                    label="Selecciona el modelo de tu vehiculo"
                                    className="bg-white shadow-none"
                                    variant="bordered"
                                    isRequired
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
                                    {models.length > 0 ? (
                                        models.map((model) => (
                                            <AutocompleteItem key={model.key} value={model.label}>
                                                {model.label}
                                            </AutocompleteItem>
                                        ))
                                    ) : (
                                        <AutocompleteItem key="no-models" isDisabled value="No hay modelos disponibles">
                                            No hay modelos disponibles
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                    Color del Vehículo
                                </label>

                                <Autocomplete
                                    label="Selecciona el color de tu vehiculo"
                                    className="bg-white shadow-none"
                                    variant="bordered"
                                    isRequired
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
                                    {models.length > 0 ? (
                                        models.map((model) => (
                                            <AutocompleteItem key={model.key} value={model.label}>
                                                {model.label}
                                            </AutocompleteItem>
                                        ))
                                    ) : (
                                        <AutocompleteItem key="no-models" isDisabled value="No hay modelos disponibles">
                                            No hay modelos disponibles
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                    Año
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Ingresa el año de tu vehiculo"
                                    isRequired
                                    variant="bordered"
                                    labelPlacement="outside"
                                    color="primary"
                                    size="lg"
                                    classNames={{
                                        label: "text-gray2 text-md",
                                        input: [
                                            "bg-transparent",
                                            "text-black/90 dark:text-white/90",
                                            "ps-2",
                                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                        inputWrapper: "shadow-none border border-1 border-stroke rounded-lg h-5",

                                    }}

                                />

                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                    Número de Placa
                                </label>
                                <Input
                                    type="string"
                                    placeholder="Ingresa la placa de tu vehiculo"
                                    isRequired
                                    variant="bordered"
                                    labelPlacement="outside"
                                    color="primary"
                                    size="lg"
                                    classNames={{
                                        label: "text-gray2 text-md",
                                        input: [
                                            "bg-transparent",
                                            "text-black/90 dark:text-white/90",
                                            "ps-2",
                                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                        inputWrapper: "shadow-none border border-1 border-stroke rounded-lg h-5",

                                    }}

                                />

                            </div>

                            <Button onPress={onOpen} className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">Añadir Vehículo</Button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Newcar;