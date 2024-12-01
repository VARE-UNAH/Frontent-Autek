'use client'
import React from 'react';
import { Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import Link from 'next/link';

type CardProps = {
    brand_name: string;
    model_name: string;
    license_plate: string;
    linkUrl: string;
};

const VehicleCard: React.FC<CardProps> = ({
    brand_name,
    model_name,
    license_plate,
    linkUrl,
}) => {
    return (
        <Link href={linkUrl} className="block">
            {/* Todo el contenedor es un enlace válido */}
            <div className="mb-3">
                <div className="rounded-t-lg rounded-b-none">
                    <Card className="rounded-lg border-2 border-stroke shadow-sm block">
                        <CardHeader className="pt-1 pb-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg">
                            <div className="w-full overflow-hidden flex h-30 rounded-lg items-center justify-center">
                                <Image
                                    src={"/images/cars/rav4.png"}
                                    alt={`Image of ${brand_name} ${model_name}`}
                                    className="w-50 h-auto block z-0"
                                />
                                <Dropdown backdrop="blur">
                                    <DropdownTrigger>
                                        <i className="fa-solid fa-ellipsis absolute top-2 justify-end end-3 text-white text-xl"></i>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="faded" aria-label="Static Actions">
                                        <DropdownItem key="new">Ver Detalles</DropdownItem>
                                        <DropdownItem key="edit">Editar vehículo</DropdownItem>
                                        <DropdownItem key="delete" className="text-danger" color="danger">
                                            Eliminar Vehículo
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody className="pt-1 pb-1">
                            <div className="flex items-baseline space-x-1">
                                <div>
                                    <h4 className="text-md font-bold uppercase text-black">{brand_name}</h4>
                                </div>
                                <p>-</p>
                                <div>
                                    <h4 className="text-sm font-medium text-black/50 uppercase">{model_name}</h4>
                                </div>
                                <p>-</p>
                                <h4 className="text-sm font-medium text-black/50">{license_plate}</h4>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Link>
    );
};

export default VehicleCard;
