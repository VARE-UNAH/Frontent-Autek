import Image from 'next/image';
import { Card, CardBody, CardHeader, Divider, Progress } from "@nextui-org/react";
import { CircularProgress, Accordion, AccordionItem } from "@nextui-org/react";

const LatestCustomers = () => {
    const customers = [
        { name: "Toyota Corolla 2017", color: "Negro", plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024" },
    ];

    return (
        <Card className="shadow-sm rounded-lg mb-2">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md font-bold">En Taller</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {customers.map((customer, index) => (
                        <li key={index} className="py-3 sm:py-4 border rounded-lg border-stroke shadow-sm mb-5 me-2 ms-2 hover:bg-whiten">
                            <div className="grid grid-cols-2 justify-between">
                                <div className="ps-3">
                                    <p className="text-sm text-start font-medium text-black truncate dark:text-white">
                                        {customer.name}
                                    </p>
                                    <p className="text-xs text-start text-gray-500 truncate dark:text-gray-400">
                                        Color:{customer.color}
                                    </p>
                                    <p className="text-xs text-start text-gray-500 truncate dark:text-gray-400">
                                        Placa:{customer.plate}
                                    </p>
                                    <p className="text-xs text-start text-gray-500 truncate dark:text-gray-400">
                                        Proxima Visita:{customer.next}
                                    </p>
                                    <p className="text-xs text-start text-gray-500 truncate dark:text-gray-400">
                                        Ultima Visita:{customer.last}
                                    </p>
                                </div>
                                <div className="self-center justify-self-end pe-2">
                                    <CircularProgress
                                        label="Progreso"
                                        size="lg"
                                        value={70}
                                        color="success"
                                        showValueLabel={true}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
};

export default LatestCustomers;
