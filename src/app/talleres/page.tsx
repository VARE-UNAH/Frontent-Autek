'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button, Input, Spinner, Skeleton } from "@nextui-org/react";
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
            <Breadcrumbs size="md" variant="bordered" className="pb-2">
                <BreadcrumbItem href="/user/home">Inicio</BreadcrumbItem>
                <BreadcrumbItem href="talleres">Talleres</BreadcrumbItem>
            </Breadcrumbs>
            {isLoading ? (
                <Skeleton className="rounded-lg">
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
                </Skeleton>
            ) : (
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
            )}

            {isLoading ? (
                // Componente de carga mientras los datos se cargan

                <ul>
                    <Skeleton className="w-20 h-5 my-2 rounded-md">
                        <p className="text-sm text-default-500">Cargando</p>
                    </Skeleton>
                    <div className="">
                        {Array(4).fill(null).map((_, index) => (
                            <div key={index} className="">
                                <div className="mb-3">
                                    <div className="rounded-t-lg rounded-b-none">
                                        <Skeleton className="rounded-t-lg">
                                            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                                                <Image
                                                    src={""} // Asegúrate de que `imageUrl` sea dinámico
                                                    alt="profile cover"
                                                    className="w-full h-full rounded-b-none rounded-t-lg object-cover object-center shadow-none"
                                                    width={970}
                                                    height={120}
                                                />
                                            </div>
                                        </Skeleton>
                                    </div>
                                    <Card className="py-4 rounded-t-none rounded-b-lg shadow-none">
                                        <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                                            <div className="flex justify-between items-center w-full">
                                                <Skeleton className="w-50 rounded-lg">
                                                    <h4 className="font-bold text-lg">Load</h4>
                                                </Skeleton>
                                                <div className="text-sm font-medium items-center text-zinc-400">
                                                    <Skeleton className="w-10 rounded-lg">
                                                        <div className="flex justify-between items-center w-full">
                                                            <i className="fa-solid fa-star text-orange-500"></i>
                                                            <p className="text-sm font-medium text-black ps-1 pb-0.5">Load</p>
                                                        </div>
                                                    </Skeleton>
                                                </div>
                                            </div>
                                            <Skeleton className="w-40 rounded-lg mt-1">
                                                <div className="flex items-center w-full pt-1 pb-1">

                                                    <i className="fa-solid text-default-500 fa-location-dot pe-1"></i>
                                                    <p className="text-sm text-default-500 ">Load</p>

                                                </div>
                                            </Skeleton>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                    <li>
                        {workShops.map((workShop, index) => (
                            <TallerCard
                                key={index}
                                taller_name={workShop.name}
                                location={workShop.address.address}
                                imageUrl={"/images/cover/excel.jpeg"}
                                linkUrl={`/talleres/${workShop.id_workshop}/${workShop.name}`}
                                rating={4.3}
                            />
                        ))}
                    </li>
                </ul>
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
