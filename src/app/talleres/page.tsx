'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Link, Image, BreadcrumbItem, Breadcrumbs, Card, CardHeader, Divider, CardBody, Accordion, AccordionItem, CardFooter, Button, Input } from "@nextui-org/react";
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Talleres = () => {
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
            <p className="text-sm text-default-500 pt-2 pb-2">22 Talleres</p>
            <div className="shadow-sm pb-2">
                <div className="rounded-t-lg rounded-b-none">
                    <Image
                        src={"/images/cover/excel.jpeg"}
                        alt="profile cover"
                        className="w-full h-full rounded-b-none rounded-t-lg object-cover object-center shadow-none"
                        width={970}
                        height={120}
                    />
                </div>
                <Card className="py-4 rounded-t-none rounded-b-lg shadow-none">
                    <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold text-lg">Excel Automotriz</h4>
                            <Link
                                className="text-sm font-medium items-center text-zinc-400"
                                href="https://github.com/nextui-org/nextui"
                            >
                                <div className="flex justify-between items-center w-full">
                                    <i className="fa-solid fa-star text-orange-500"></i>
                                    <p className="text-sm font-medium text-black ps-1 pb-0.5">4.5</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center w-full pt-1 pb-1">
                            <i className="fa-solid text-default-500 fa-location-dot pe-1"></i>
                            <p className="text-sm text-default-500 ">Boulevard Suyapa</p>
                        </div>

                    </CardHeader>
                </Card>
            </div>
            <div className="shadow-sm">
                <div className="rounded-t-lg rounded-b-none">
                    <Image
                        src={"/images/cover/dimasa.jpeg"}
                        alt="profile cover"
                        className="w-full h-full rounded-b-none rounded-t-lg object-cover object-center shadow-none"
                        width={970}
                        height={120}
                    />
                </div>
                <Card className="py-4 rounded-t-none rounded-b-lg shadow-none">
                    <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold text-lg">Dimasa Ford</h4>
                            <Link
                                className="text-sm font-medium items-center text-zinc-400"
                                href="https://github.com/nextui-org/nextui"
                            >
                                <div className="flex justify-between items-center w-full">
                                    <i className="fa-solid fa-star text-orange-500"></i>
                                    <p className="text-sm font-medium text-black ps-1 pb-0.5">4.5</p>
                                </div>
                            </Link>
                        </div>
                        <div className="flex items-center w-full pt-1 pb-1">
                            <i className="fa-solid text-default-500 fa-location-dot pe-1"></i>
                            <p className="text-sm text-default-500 ">El Trapiche</p>
                        </div>

                    </CardHeader>
                </Card>
            </div>
        </DefaultLayout>
    );
};

export default Talleres;
