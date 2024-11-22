'use client'
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from 'react';
import { fetchCarBrands } from '@/services/car/brandsService';
import { fetchCarModels } from '@/services/car/modelService';
import { fetchCarColors } from '@/services/car/colorService';
import { toast } from "sonner";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import TrLoader from "@/components/common/TrLoader";
import { validateYear, validatePlate } from "@/validators/cars/carValidator"; // Importa los validadores
import { createCar } from "@/services/car/createService";

type Brand = {
    key: number;
    label: string;
};

type Model = {
    key: number;
    label: string;
};

type Color = {
    key: number;
    label: string;
};

const Newcar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedModel, setSelectedModel] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [year, setYear] = useState<string>("");
    const [plate, setPlate] = useState<string>("");
    const [brandKey, setBrandKey] = useState<string | null>(null);
    const [modelKey, setModelKey] = useState<string | null>(null);
    const [colorKey, setColorKey] = useState<string | null>(null);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Cargar marcas solo una vez
    useEffect(() => {
        const loadCarBrands = async () => {
            try {
                const brandsData = await fetchCarBrands();
                const colorsData = await fetchCarColors();
                setColors(colorsData);
                setBrands(brandsData);
            } catch (error) {
                console.error("Error cargando marcas:", error);
            }
        };

        loadCarBrands();
    }, []); // La dependencia está vacía, se ejecuta solo una vez al montar el componente

    const validateForm = (): boolean => {
        const yearError = validateYear(year);
        const plateError = validatePlate(plate);

        if (!selectedBrand) {
            toast.error("Debe seleccionar una marca.");
            return false;
        }

        if (!selectedModel) {
            toast.error("Debe seleccionar un modelo.");
            return false;
        }

        if (!selectedColor) {
            toast.error("Debe seleccionar un color.");
            return false;
        }

        if (yearError) {
            toast.error(yearError);
            return false;
        }

        if (plateError) {
            toast.error(plateError);
            return false;
        }

        return true;

    };

    const handleCreateCar = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Llama al servicio para crear el vehículo
            await createCar({
                brand_id: selectedBrand as number, // TypeScript sabe que no es null por validateForm
                model_id: selectedModel as number,
                color_id: selectedColor as number,
                year: year,
                license_plate: plate.toUpperCase(),
            });

            toast.success("Vehículo añadido correctamente");
            // Resetear el formulario después de la creación
            setYear("");
            setPlate("");
            setSelectedBrand(null);
            setSelectedModel(null);
            setSelectedColor(null);
            setBrandKey(null)
            setModelKey(null)
            setColorKey(null)
        } catch (error) {
            console.error("Error creando vehículo:", error);
            toast.error("Hubo un error al añadir el vehículo. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
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

    const handleBrandSelection = (value: React.Key | null) => {
        const selectedValue = value ? value.toString() : null; // Convertir Key a string
        setBrandKey(selectedValue);
        if (selectedValue) {
            const selectedId = parseInt(selectedValue, 10); // Convertir string a número
            console.log("Marca seleccionada:", selectedId);
            setSelectedBrand(selectedId); // Guardar el ID como número en el estado
        } else {
            console.log("Selección no válida.");
            setSelectedBrand(null);
        }
    };

    const handleModelSelection = (value: React.Key | null) => {
        const selectedValue = value ? value.toString() : null; // Convertir Key a string
        setModelKey(selectedValue);
        if (selectedValue) {
            const selectedId = parseInt(selectedValue, 10); // Convertir string a número
            console.log("Modelo seleccionado:", selectedId);
            setSelectedModel(selectedId); // Guardar el ID como número en el estado
        } else {
            console.log("Selección no válida.");
            setSelectedModel(null);
        }
    };

    const handleColorSelection = (value: React.Key | null) => {
        const selectedValue = value ? value.toString() : null; // Convertir Key a string
        setColorKey(selectedValue);
        if (selectedValue) {
            const selectedId = parseInt(selectedValue, 10); // Convertir string a número
            console.log("Color seleccionado:", selectedId);
            setSelectedColor(selectedId); // Guardar el ID como número en el estado
        } else {
            console.log("Selección no válida.");
            setSelectedColor(null);
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
                        <form className="space-y-6" onSubmit={(event) => {
                            event.preventDefault(); // Evita el comportamiento predeterminado // Llama a la lógica de creación
                        }}>
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
                                    onSelectionChange={handleBrandSelection}
                                    selectedKey={brandKey}
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
                                    selectedKey={modelKey}
                                    onSelectionChange={handleModelSelection}
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
                                    selectedKey={colorKey}
                                    onSelectionChange={handleColorSelection}
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
                                    {colors.length > 0 ? (
                                        colors.map((color) => (
                                            <AutocompleteItem key={color.key} value={color.label}>
                                                {color.label}
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
                                    placeholder="Ingresa el año de tu vehículo"
                                    isRequired
                                    variant="bordered"
                                    labelPlacement="outside"
                                    color="primary"
                                    size="lg"
                                    value={year}
                                    onValueChange={setYear}
                                    min={1900}  // Año mínimo permitido
                                    max={new Date().getFullYear()}  // Año máximo es el año actual
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
                                    value={plate}
                                    onValueChange={setPlate}
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

                            <Button type="submit" onPress={() => {
                                if (validateForm()) {
                                    onOpen(); // Solo abre el modal si la validación es exitosa
                                }
                            }} className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">Añadir Vehículo</Button>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Newcar;