import Image from 'next/image';

const LatestCustomers = () => {
    const customers = [
        { name: "Toyota Corolla 2017", color: "Negro",plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024"},
        { name: "Toyota Corolla 2017", color: "Negro",plate: "HBG9393", image: "/images/cars/toyota.png", next: "25/10/2024", last: "25/11/2024"},
    ];

    return (

        <div className="pt-2">
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
                ))}
            </ul>
        </div>
    );
};

export default LatestCustomers;
