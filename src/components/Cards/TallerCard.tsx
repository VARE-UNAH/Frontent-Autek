'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardHeader } from '@nextui-org/react';
import Link from 'next/link';

type CardProps = {
    taller_name: string;
    location: string;
    imageUrl: string;
    linkUrl: string;
    rating: number;
};

const TallerCard: React.FC<CardProps> = ({
    taller_name,
    location,
    imageUrl,
    linkUrl,
    rating
}) => {
    return (
        <Link href={linkUrl} className="block">
            {/* Todo el contenedor es un enlace válido */}
            <div className="mb-3">
                <div className="rounded-t-lg rounded-b-none">
                    <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                        <Image
                            src={imageUrl} // Asegúrate de que `imageUrl` sea dinámico
                            alt="profile cover"
                            className="w-full h-full rounded-b-none rounded-t-lg object-cover object-center shadow-none"
                            width={970}
                            height={120}
                        />
                    </div>
                </div>
                <Card className="py-4 rounded-t-none rounded-b-lg shadow-none">
                    <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold text-lg">{taller_name}</h4>
                            <div className="text-sm font-medium items-center text-zinc-400">
                                <div className="flex justify-between items-center w-full">
                                    <i className="fa-solid fa-star text-orange-500"></i>
                                    <p className="text-sm font-medium text-black ps-1 pb-0.5">{rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full pt-2 pb-1">
                            <i className="fa-solid text-default-500 fa-location-dot pe-1"></i>
                            <p className="text-sm text-default-500 ">{location}</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </Link>
    );
};

export default TallerCard;
