'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Vehiculos from "@/components/Vehiculos"
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { CreditCard } from "lucide-react";

const cardData = [
    {
        bankName: "BANCO ATLANTIDA",
        cardNumber: "**** 6126",
        cardType: "fa-cc-visa",
        titular: "Hector Manuel Varela",
        expDate: "09/29" // Tipo de tarjeta (ícono de FontAwesome)
    },
    {
        bankName: "BANCO FICOHSA",
        cardNumber: "**** 7843",
        cardType: "fa-cc-mastercard",
        titular: "Hector Manuel Varela",
        expDate: "09/29"
    },
    {
        bankName: "BANCO DAVIVIENDA",
        cardNumber: "**** 1290",
        cardType: "fa-cc-amex",
        titular: "Hector Manuel Varela",
        expDate: "09/29"
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
    const {
        isOpen: isDeleteModalOpen,
        onOpen: onOpenDeleteModal,
        onOpenChange: onDeleteModalChange,
    } = useDisclosure();
    const {
        isOpen: isAddModalOpen,
        onOpen: onOpenAddModal,
        onOpenChange: onAddModalChange,
    } = useDisclosure();
    return (
        <DefaultLayout>
            <Modal isOpen={isDeleteModalOpen}
                onOpenChange={onDeleteModalChange} size="sm" placement="center" backdrop="blur" className="rounded-lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black">¿Quieres eliminar este medio de pago?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Tendras que volver a agregarlo para usarlo
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="bordered" onPress={onClose} className=" border border-2 border-stroke py-4 px-4 rounded-md ">
                                    No
                                </Button>
                                <Button color="danger" onPress={onClose}/*  onClick={handleCreateCar} */ className="bg-gradient-to-r from-red to-#f87171 text-white py-4 px-4 rounded-md hover:bg-red transition" >
                                    Si, eliminarlo
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-black/90 text-md font-bold mb-2">Tus medios de pago</h1>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-md shadow-sm mb-3"
                >
                    <CardHeader className="flex gap-3 justify-between h-30">
                        <div className="flex flex-col self-start h-full">
                            <p className="text-sm font-bold text-white">{card.bankName}</p>
                            <p className="text-sm font-bold text-white">{card.cardNumber}</p>
                            <div className="mt-auto">
                                <p className="text-xs font-bold text-white">Vence el {card.expDate}</p>
                                <p className="text-tiny font-bold text-white uppercase">{card.titular}</p>
                            </div>

                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <button onClick={onOpenDeleteModal}>
                                <Avatar showFallback src='https://images.unsplash.com/broken' className="bg-black/30 h-6 w-6 self-center" fallback={
                                    <i className="fa-solid fa-trash font-bold text-white"></i>
                                } />
                            </button>
                            <i className={`fa-brands ${card.cardType} text-white text-2xl`}></i>
                        </div>
                    </CardHeader>
                </Card>
            ))}
            <Button variant="bordered" color="primary" className="w-full flex items-center justify-center rounded-lg" onClick={onOpenAddModal}>
                <CreditCard className="w-12 h-12 text-primary" />
                <span>Agregar nuevo método de pago</span>
            </Button>
            <Modal isOpen={isAddModalOpen}
                onOpenChange={onAddModalChange}>
                <ModalContent>
                    <form>
                        <ModalHeader>Agregar nuevo método de pago</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Banco"
                                placeholder="Nombre del banco"
                            />
                            <Input
                                label="Número de tarjeta"
                                placeholder="**** **** **** ****"
                            />
                            <Select
                                label="Tipo de tarjeta"
                            >
                                <SelectItem key="visa" value="visa">Visa</SelectItem>
                                <SelectItem key="mastercard" value="mastercard">Mastercard</SelectItem>
                                <SelectItem key="amex" value="amex">American Express</SelectItem>
                            </Select>
                            <Input
                                label="Titular"
                                placeholder="Nombre del titular"
                            />
                            <Input
                                label="Fecha de vencimiento"
                                placeholder="MM/YY"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Agregar tarjeta</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
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
