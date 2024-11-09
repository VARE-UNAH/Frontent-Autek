import Image from 'next/image';
import { Progress } from "@nextui-org/react";
import {CircularProgress, Accordion, AccordionItem } from "@nextui-org/react";

const LatestCustomers = () => {
    const customers = [
        { name: "Toyota Corolla 2017", color: "Negro", plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024" },
    ];

    return (

        <div className=" bg-white p-2 rounded-lg mb-2">
            <h1 className="font-bold text-black text-start">En Taller</h1>
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                
                {customers.map((customer, index) => (
                    <li key={index} className="py-3 sm:py-4 border rounded-lg border-whiten shadow-md mb-5">
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
                                    label="Speed"
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
        </div>
    );
};

export default LatestCustomers;
