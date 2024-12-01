'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";

const cardData = [
    {
        bankName: "BANCO ATLANTIDA",
        cardNumber: "**** 6126",
        cardType: "fa-cc-visa", // Tipo de tarjeta (ícono de FontAwesome)
    },
    {
        bankName: "BANCO FICOHSA",
        cardNumber: "**** 7843",
        cardType: "fa-cc-mastercard",
    },
    {
        bankName: "BANCO DAVIVIENDA",
        cardNumber: "**** 1290",
        cardType: "fa-cc-amex",
    },
];

const cardDetails = [
    { title: "CAMBIO DE ACEITE", date: "23/10/2024", location: "Porsche Tegucigalpa", debitCard: "****6126", cost: "L. 1,000", detailsLink: "https://github.com/nextui-org/nextui" },
    { title: "MANTENIMIENTO GENERAL", date: "15/09/2024", location: "Toyota San Pedro", debitCard: "****7890", cost: "L. 2,500", detailsLink: "https://github.com/nextui-org/nextui" },
    { title: "INSPECCIÓN DE FRENOS", date: "10/08/2024", location: "Honda La Ceiba", debitCard: "****4563", cost: "L. 800", detailsLink: "https://github.com/nextui-org/nextui" },
    { title: "REVISION ANUAL", date: "05/07/2024", location: "Mazda Choluteca", debitCard: "****1234", cost: "L. 3,000", detailsLink: "https://github.com/nextui-org/nextui" },
    { title: "CAMBIO DE NEUMÁTICOS", date: "20/06/2024", location: "Goodyear Tegucigalpa", debitCard: "****5678", cost: "L. 1,200", detailsLink: "https://github.com/nextui-org/nextui" },
];



const Cars = () => {
    const latestCards = cardDetails.slice(-3);
    return (
        <DefaultLayout>
            <h1 className="text-black/90 text-md font-bold mb-2">Tus medios de pago</h1>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-md shadow-sm mb-3"
                >
                    <CardHeader className="flex gap-3 justify-between h-24">
                        <div className="flex flex-col">
                            <p className="text-md font-bold text-white">{card.bankName}</p>
                            <p className="text-md font-bold text-white">{card.cardNumber}</p>
                        </div>
                        <i
                            className={`fa-brands ${card.cardType} text-white self-end text-2xl`}
                        ></i>
                    </CardHeader>
                </Card>
            ))}
            <h1 className="text-black/90 text-md font-bold mb-2">Movimientos</h1>
            <Card className="w-full rounded-lg mb-3 shadow-sm border-2 border-stroke">
                <CardBody className="mb-0">
                    {latestCards.map((card, index) => (
                        <Card
                            key={index}
                            className="max-w-full rounded-md shadow-none border-none"
                        >
                            <CardHeader className="flex rounded-md bg-zinc-100">
                                <div className="flex justify-between items-center w-full">
                                    <h2 className="text-black/90 text-xs font-medium">{card.title}</h2>
                                    <p className="text-xs font-medium text-zinc-400">{card.date}</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-col">
                                    <p className="font-normal text-sm">Lugar: {card.location}</p>
                                    <p className="font-normal text-sm">Debito: {card.debitCard}</p>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="font-normal text-sm">Costo: {card.cost}</p>
                                        <Link
                                            className="text-sm font-medium items-center text-zinc-400"
                                            href={card.detailsLink}
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-sm font-medium text-zinc-400 pb-0.5">
                                                    Ver Detalles
                                                </p>
                                                <i className="fa-solid fa-angle-right text-center ps-1"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                    <Divider className="mt-0" />
                </CardBody>
                <CardFooter className="pt-0 mt-0">
                    <div className="w-full flex justify-center mb-2">
                        <Link
                            className="w-full"
                            href="/user/new-car"
                        >
                            <Button color="primary" className='w-full h-10 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mt-2' >
                                Ver Todos
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </DefaultLayout>
    );
};

export default Cars;
