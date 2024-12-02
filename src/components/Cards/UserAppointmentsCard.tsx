'use client'
import React from 'react';
import { Card, CardBody, CardHeader, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react';
import Link from 'next/link';

type CardProps = {
    brand_name: string;
    model_name: string;
    license_plate: string;
    linkUrl: string;
    descripcion: string,
    workshop_name: string,
    status: string,
    date: Date,
};

const UserAppointmentsCard: React.FC<CardProps> = ({
    brand_name,
    model_name,
    license_plate,
    linkUrl,
    descripcion,
    workshop_name,
    status,
    date
}) => {
    return (
        <Link href={linkUrl} className="block">
            {/* Todo el contenedor es un enlace válido */}
            <div className="mb-3">
                <div className="rounded-t-lg rounded-b-none">
                <Card className="max-w-full rounded-md shadow-sm mb-2 border-2 border-stroke">
                            <CardHeader className="flex rounded-md bg-zinc-100">
                                <div className="flex justify-between items-center w-full">
                                    <h2 className="text-black/90 text-xs font-medium uppercase">
                                        {workshop_name}
                                    </h2>
                                    <p className="text-xs font-medium text-zinc-400">{date.toLocaleDateString()}</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-col">
                                    <p className="font-normal text-sm uppercase">Auto: {brand_name} - {model_name} - {license_plate}</p>
                                    <p className="font-normal text-sm pb-2">Descripcion: {descripcion}</p>
                                    <div className="flex justify-between items-center w-full">
                                        <Chip size="sm" color="warning" className="rounded-md">{status}</Chip>
                                        <Link
                                            className="text-sm font-medium items-center text-zinc-400"
                                            href="https://github.com/nextui-org/nextui"
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-sm font-medium text-zinc-400 pb-0.5">Ver Detalles</p>
                                                <i className="fa-solid fa-angle-right text-center ps-1"></i>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                </div>
            </div>
        </Link>
    );
};

export default UserAppointmentsCard;
