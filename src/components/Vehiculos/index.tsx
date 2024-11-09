import Image from 'next/image';
import { Button, Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";

const LatestCustomers = () => {
    const customers = [
        { name: "Toyota Corolla 2017", color: "Negro", plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024" },
        { name: "Toyota Corolla 2017", color: "Negro", plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024" },
    ];

    const mySvg = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
    );

    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold">Tus Vehículos</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <ul role="list" className="mt-2">
                    {customers.map((customer, index) => (
                        <Accordion variant="splitted" key={index}>
                            <AccordionItem className="mb-2" key={index} aria-label={customer.name} title={customer.name}>
                                <li key={index} className="pb-3 sm:pb-4 rounded-lg">
                                    <div className="grid grid-cols-2 justify-between">
                                        <div className="">
                                            <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                Color:{customer.color}
                                            </p>
                                            <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                Placa:{customer.plate}
                                            </p>
                                            <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                Proxima Visita:{customer.next}
                                            </p>
                                            <p className="text-sm text-start text-gray-500 truncate dark:text-gray-400">
                                                Ultima Visita:{customer.last}
                                            </p>
                                        </div>
                                        <div className="self-center justify-self-end">
                                            <Image
                                                src={customer.image}
                                                alt={`${customer.name} image`}
                                                width={100}
                                                height={60}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </li>
                            </AccordionItem>
                        </Accordion>

                    ))}
                </ul>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="w-full flex justify-center mb-2">
                    <Link
                        href="/user/new-car"
                    >
                        <Button color="primary" variant="bordered" startContent={<i className="fa-solid fa-plus"></i>}>
                            Añadir Vehículo
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LatestCustomers;
