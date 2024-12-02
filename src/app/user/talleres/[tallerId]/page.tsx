'use client'
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { today, isWeekend, getLocalTimeZone, DateValue } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { WorkShop } from "@/types/workshop";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Skeleton,
} from "@nextui-org/react";
import { Select, SelectItem, CardFooter, Divider, Image } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import {getCars} from "@/services/car/getService";
import { toast } from "sonner";
import { createAppointment } from "@/services/appointments/appointmentsService";
import TrLoader from "@/components/common/TrLoader";
import { fetchWorkShopData } from "@/services/workshops/workshopsService";
import { useValidateToken } from "@/services/user/authService";
import Loader from "@/components/common/Loader";
import DefaultLayoutBack from "@/components/Layouts/DefaultLayoutBack";

type Car = {
    id_car: number;
    brand: {
        id_brand: number;
        name: string;
    };
    model: {
        id_model: number;
        name: string;
    };
    color: {
        id_color: number;
        name: string;
    };
    license_plate: string;
    year: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        date_of_birth: string;
    };
}

const generateHours = () => {
    const hoursArray: { value: string; label: string }[] = [];
    for (let i = 8; i <= 18; i++) {
        const hour = i < 10 ? `0${i}:00` : `${i}:00`;
        hoursArray.push({ value: hour, label: hour });
    }
    return hoursArray;
};

function TallerDetails({ params }: {
    params: { tallerId: number, tallerName: string };
}) {
    useValidateToken();
    const isValidated = useValidateToken(); // Hook personalizado
    const tallerId = params.tallerId;
    console.log("ID TALLER", tallerId);
    const hours = generateHours();
    const [selected, setSelected] = useState<string>("Detalle"); // Inicia en el tab "Detalle"
    const [isSelected, setIsSelected] = useState<Boolean>(false);
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [selectedWorkShop, setSelectedWorkShop] = useState<WorkShop | null>(null);
    const [selectedCarKey, setSelectedCarKey] = useState<string[]>([]);
    const [detalleCita, setDetalleCita] = useState<string>("");
    const [isValidteFirst, setIsValidteFirst] = useState<Boolean>(false);
    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
    const [selectedHour, setSelectedHour] = useState<String | null>(null);
    const [selectedHourKey, setSelectedHourKey] = useState<string[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    /* Obtener vehiculos para llenar el select */
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const carData = await getCars(); // Llamar al servicio para obtener los vehículos
            const workShopData = await fetchWorkShopData(tallerId);
            console.log(workShopData);
            setSelectedWorkShop(workShopData);
            setCars(carData); // Almacenar los datos de los vehículos en el estado
        } catch (error) {
            console.error('Error al cargar los vehículos:', error);
        } finally {
            setIsLoading(false);  // Asegúrate de que se ejecute solo una vez cuando termine la carga
            console.log("Vehículos cargados");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(); // Llamar a la función para obtener los datos cuando el componente se monta
    }, [tallerId]);

    const validateForm = (): boolean => {

        if (!selectedCar) {
            toast.error("Debe seleccionar su vehiculo.");
            return false;
        }

        if (detalleCita === "") {
            toast.error("Debe ingresar los detalles de la cita.");
            return false;
        }

        if (!selectedDate) {
            toast.error("Debe seleccionar una fecha para su cita.");
            return false;
        }

        console.log("validacion", selectedHour);
        if (!selectedHour) {
            toast.error("Por favor selecciona una hora válida.");
            return false;
        }

        return true;

    };

    const handleCreateAppointment = async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {

            const combinedDate = combineDateAndHour(selectedDate as DateValue, selectedHour as String);
            const combinedDateString = combinedDate.toISOString();
            console.log("Fecha", combinedDate);
            // Llama al servicio para crear el vehículo

            await createAppointment({
                id_car: selectedCar?.id_car as number,
                id_workshop: selectedWorkShop?.id_workshop as number,
                description: detalleCita,
                date: combinedDateString
            });

            toast.success("Cita creada correctamente");
            // Resetear el formulario después de la creación
            setSelectedCar(null);
            setSelectedCarKey([]);
            setDetalleCita("");
            setSelected("Detalle");
            setIsSelected(false);
            setIsValidteFirst(false);
            setSelectedDate(null);
            setSelectedHour(null);
            setSelectedHourKey([]);
        } catch (error) {
            console.error("Error creando vehículo:", error);
            toast.error("Hubo un error al crear tu cita. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    const combineDateAndHour = (dateValue: DateValue, hourString: String): Date => {
        if (!hourString) throw new Error("Hora no válida.");

        // Convertir DateValue a un objeto Date estándar
        const { year, month, day } = dateValue as any; // Ajusta según la estructura exacta de DateValue
        const baseDate = new Date(year, month - 1, day); // Meses en JS son 0-indexados

        // Extraer horas y minutos del string (formato "HH:mm")
        const [hours, minutes] = hourString.split(":").map(Number);

        // Establecer horas y minutos
        baseDate.setHours(hours, minutes);

        return baseDate;
    };

    const handleHourSelection = (keys: "all" | (Set<React.Key> & { anchorKey?: string; currentKey?: string })) => {
        if (keys === "all") {
            console.log("Seleccionar todos no está permitido en este caso");
        } else {
            const keyArray = [...keys]; // Convertimos a array para mayor control
            if (keyArray.length === 0) {
                console.error("No se seleccionó ninguna clave.");
                return;
            }

            const selectedKey = keyArray[0] as number; // Tomar el primer valor del conjunto
            console.log("Elemento seleccionado:", selectedKey);
            setSelectedHourKey([selectedKey.toString()]);
            if (typeof selectedKey !== "string") {
                console.error("El valor seleccionado no es un número válido:", selectedKey);
                return;
            }

            const selectedHour = selectedKey; // Convertir a cadena
            setSelectedHour(selectedHour); // Actualizamos el estado
            console.log("Hora seleccionada:", selectedHour);
        }
    };

    const handleCarSelection = (keys: "all" | Set<React.Key> & { anchorKey?: string; currentKey?: string }) => {
        if (keys === "all") {
            console.log("Seleccionar todos no está permitido en este caso");
        } else {
            console.log("Tienda", selectedWorkShop?.name);
            const selectedKey = [...keys][0] as number; // Tomar solo el primer valor del conjunto
            setSelectedCarKey([selectedKey.toString()]);
            console.log("Elemento seleccionado:", selectedKey);
            const selectedCarItem = cars.find(car => car.id_car === Number(selectedKey)) || null;
            console.log(cars);
            setSelectedCar(selectedCarItem);
            setIsSelected(true);
            console.log("Carro:", selectedCarItem);
        }
    };

    const handleSelectedTab = () => {
        if (!isSelected || detalleCita === "") {
            toast.error("Debe llenar todos los campos");
            setIsValidteFirst(false);
        } else {
            setSelected("Fecha y Ubicación");
            setIsValidteFirst(true);
        }
        console.log(selected);
    }

    if (!isValidated) {
        // Mientras se valida, muestra un indicador de carga
        return <div className="flex items-center justify-center h-screen">
            <Loader /> {/* Muestra el componente Loader mientras valida */}
        </div>
    }

    return (
        <DefaultLayoutBack>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">Confirmar nuevo vehículo</ModalHeader>
                            <ModalBody>
                                <p>
                                    Esta seguro que desea realizar esta cita?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose} className="bg-gradient-to-r from-red to-#f87171 text-white py-4 px-4 rounded-md hover:bg-red transition">
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleCreateAppointment} className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition" >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div>
                <Breadcrumbs size="md" variant="bordered" className="pb-2">
                    <BreadcrumbItem href="/user/home">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/talleres">Talleres</BreadcrumbItem>
                    {isLoading ? (
                        <BreadcrumbItem href="/talleres">
                            <Skeleton className="rounded-md w-20">
                                Hola
                            </Skeleton>
                        </BreadcrumbItem>

                    ) : (
                            <BreadcrumbItem href="/talleres">{selectedWorkShop?.name}</BreadcrumbItem>   
                    )}
                </Breadcrumbs>
            </div>
            <div className="border border-stroke shadow-sm rounded-2xl bg-white">
                <Card className="col-span-12 sm:col-span-4 rounded-b-none border-none shadow-none">
                    {isLoading ? (
                        <Skeleton>
                            <CardHeader className="absolute z-10 flex-col !items-start shadow-none bg-black/40 backdrop-blur-sm">
                                <h4 className="text-white font-bold text-xl">{selectedWorkShop?.name}</h4>
                            </CardHeader>
                            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                                <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full object-cover rounded-b-none"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover", // Asegura que la imagen se ajuste correctamente
                                    }}
                                    src="/images/cover/excel.jpeg"
                                />
                            </div>
                        </Skeleton>

                    ) : (
                        <div>
                            <CardHeader className="absolute z-10 flex-col !items-start shadow-none bg-black/40 backdrop-blur-sm">
                                <h4 className="text-white font-bold text-xl">{selectedWorkShop?.name}</h4>
                            </CardHeader>
                            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                                <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full object-cover rounded-b-none"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover", // Asegura que la imagen se ajuste correctamente
                                    }}
                                    src="/images/cover/excel.jpeg"
                                />
                            </div>
                        </div>
                    )}


                </Card>
                <div className="flex flex-col w-full">
                    <Card className="max-w-full rounded-t-none">
                        <CardBody className="overflow-hidden">
                            <Tabs
                                fullWidth
                                size="lg"
                                aria-label="Tabs form"
                                selectedKey={selected}
                                onSelectionChange={(key) => setSelected(key as string)}
                            >
                                <Tab key="Detalle" title="Detalle">
                                    <form className="flex flex-col gap-4">
                                        <div className="">
                                            {isLoading ? (
                                                <div className="">
                                                    <Skeleton className="rounded-md w-40 h-7 mb-2.5">
                                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                            Selecciona el Vehículo
                                                        </label>
                                                    </Skeleton>
                                                    <Skeleton className="rounded-lg">
                                                        <Select
                                                            isRequired
                                                            label="Vehiculo"
                                                            placeholder="Selecciona tu Vehiculo"
                                                            className="bg-white shadow-none"
                                                            selectionMode="single"
                                                            items={cars}
                                                            variant="bordered"
                                                            color="primary"
                                                            selectedKeys={selectedCarKey}
                                                            onSelectionChange={handleCarSelection}
                                                            classNames={{
                                                                trigger: "shadow-none border border-1 rounded-lg",
                                                            }}
                                                        >
                                                            {cars.map((car) => (
                                                                <SelectItem key={car.id_car} textValue={car.brand.name && car.model.name}>
                                                                    <div className="flex gap-2 items-center">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-small">{car.brand.name} {car.model.name} {car.year}</span>
                                                                        </div>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </Select>
                                                    </Skeleton>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                        Selecciona el Vehículo
                                                    </label>
                                                    <Select
                                                        isRequired
                                                        label="Vehiculo"
                                                        placeholder="Selecciona tu Vehiculo"
                                                        className="bg-white shadow-none"
                                                        selectionMode="single"
                                                        items={cars}
                                                        variant="bordered"
                                                        color="primary"
                                                        selectedKeys={selectedCarKey}
                                                        onSelectionChange={handleCarSelection}
                                                        classNames={{
                                                            trigger: "shadow-none border border-1 rounded-lg",
                                                        }}
                                                    >
                                                        {cars.map((car) => (
                                                            <SelectItem key={car.id_car} textValue={car.brand.name && car.model.name}>
                                                                <div className="flex gap-2 items-center">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-small">{car.brand.name} {car.model.name} {car.year}</span>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            )}

                                        </div>
                                        {isSelected && (
                                            <Card className="max-w-full shadow-none border-stroke rounded-lg">
                                                <CardHeader className="flex gap-3">
                                                    <Image
                                                        src="/images/cars/toyota.png"
                                                        width={64}
                                                        height={48}
                                                        className="rounded-lg"
                                                        alt="un carro"
                                                    />
                                                    <div className="flex flex-col">
                                                        <p className="text-md text-black uppercase font-bold">{selectedCar?.brand.name}</p>
                                                        <p className="text-small text-default-500">{selectedCar?.model.name} {selectedCar?.year}</p>
                                                    </div>
                                                </CardHeader>
                                                <Divider />
                                                <CardBody>
                                                    <div>
                                                        <p className="text-sm">Color: {selectedCar?.color.name}</p>
                                                        <p className="text-sm">Placa: {selectedCar?.license_plate}</p>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        )}

                                        <div className="">
                                            {isLoading ? (
                                                <div className="">
                                                    <Skeleton className="rounded-md w-40 h-7 mb-2.5">
                                                        <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                            Selecciona el Vehículo
                                                        </label>
                                                    </Skeleton>
                                                    <Skeleton className="rounded-lg h-22">
                                                        <Textarea
                                                            variant="bordered"
                                                            color="primary"
                                                            placeholder="Enter your description"
                                                            description="Ingrese los detalles de su visita al taller."
                                                            className="col-span-12 md:col-span-6"
                                                            classNames={{
                                                                inputWrapper: "border rounded-lg"
                                                            }}
                                                        />
                                                    </Skeleton>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                        Detalles de la Cita
                                                    </label>
                                                    <Textarea
                                                        variant="bordered"
                                                        color="primary"
                                                        placeholder="Enter your description"
                                                        description="Ingrese los detalles de su visita al taller."
                                                        className="col-span-12 md:col-span-6"
                                                        value={detalleCita}
                                                        onValueChange={setDetalleCita}
                                                        classNames={{
                                                            inputWrapper: "border rounded-lg"
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {isLoading ? (
                                            <Skeleton className="rounded-lg">
                                                <Button fullWidth color="primary" className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">
                                                    Siguiente
                                                </Button>
                                            </Skeleton>
                                        ) : (
                                            <div className="flex gap-2 justify-end">
                                                <Button onClick={handleSelectedTab} fullWidth color="primary" className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">
                                                    Siguiente
                                                </Button>
                                            </div>
                                        )}
                                    </form>
                                </Tab>
                                <Tab key="Fecha y Ubicación" title="Fecha" isDisabled={!isValidteFirst}>
                                    <form className="flex flex-col gap-4 h-[300px]">
                                        <div className="">
                                            <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                Selecciona la fecha de tu visita
                                            </label>
                                            <DatePicker color="primary" label={"Fecha de la Cita"} variant="bordered"
                                                minValue={today(getLocalTimeZone())}
                                                value={selectedDate} // El valor debe ser de tipo DateValue o null
                                                onChange={(date) => setSelectedDate(date)} // DateValue o null según lo que devuelva el componente
                                                classNames={{
                                                    inputWrapper: "border rounded-lg"

                                                }}
                                            />
                                        </div>
                                        <div className="">
                                            <label className="mb-2.5 block font-bold text-start text-black dark:text-white">
                                                Selecciona la hora
                                            </label>
                                            <Select
                                                variant="bordered"
                                                color="primary"
                                                label="Hora de tu cita"
                                                placeholder="Selecciona la hora de tu cita"
                                                selectionMode="single"
                                                className="max-w-xs"
                                                selectedKeys={selectedHourKey}
                                                onSelectionChange={handleHourSelection}
                                                items={hours}
                                            >

                                                {hours.map((hour) => (
                                                    <SelectItem key={hour.value} textValue={hour.value}>
                                                        <div className="flex gap-2 items-center">
                                                            <div className="flex flex-col">
                                                                <span className="text-small">{hour.value}</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                        </div>
                                        <div className="flex">
                                            <Button onPress={() => {
                                                if (validateForm()) {
                                                    onOpen(); // Solo abre el modal si la validación es exitosa
                                                }
                                            }} fullWidth color="primary" className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition">
                                                Hacer Cita
                                            </Button>
                                        </div>
                                    </form>
                                </Tab>

                            </Tabs>
                        </CardBody>
                    </Card>
                </div>
            </div>



        </DefaultLayoutBack>
    );
};

export default TallerDetails;