'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button, Input, Spinner } from "@nextui-org/react";
import TallerCard from "@/components/Cards/TallerCard"
import { WorkShop } from "@/types/workshop";
import { useEffect, useState } from "react";
import { fetchWorkShops } from "@/services/workshops/workshopsService";
import Loader from "@/components/common/Loader";

const Talleres = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [workShops, setWorkShops] = useState<WorkShop[]>([]);
    useEffect(() => {
        const loadWorkShops = async () => {
            setIsLoading(true);
            try {
                const WorkShopsData = await fetchWorkShops();
                setWorkShops(WorkShopsData);
            } catch (error) {
                console.error("Error cargando marcas:", error);
            }
            setIsLoading(false);
        };

        loadWorkShops();
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumbs size="lg" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="talleres">Talleres</BreadcrumbItem>
            </Breadcrumbs>
            <Input
                label="Buscar"
                isClearable
                variant="bordered"
                color="primary"
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-sm",
                        "bg-white",
                        "rounded-lg",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "!cursor-text",
                    ],
                }}
                placeholder="Buscar talleres..."
                startContent={
                    <i className="fa-solid fa-magnifying-glass text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"></i>
                }
            />
            {isLoading ? (
                // Componente de carga mientras los datos se cargan
                <div className="flex flex-col justify-center items-center">
                    <Loader/>
                </div>
            ) : (

                <ul>
                    <p className="text-sm text-default-500 pt-2 pb-2">{workShops.length} Talleres</p>
                    <li>
                        {workShops.map((workShop, index) => (
                            <TallerCard
                                key={index}
                                taller_name={workShop.name}
                                location={workShop.address.address}
                                imageUrl={"/images/cover/excel.jpeg"}
                                linkUrl={`/talleres/${workShop.id_workshop}`}
                                rating={4.3}
                            />
                        ))}
                    </li>
                </ul>

            )}
        </DefaultLayout>
    );
};

export default Talleres;
