'use client';
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
    rating,
}) => {
    return (
        <Link href={linkUrl} className="block">
            <div className="mb-3 w-full mx-auto">
                {/* Image Section */}
                <div className="rounded-t-lg overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`${taller_name} cover`}
                        className="w-full h-[160px] sm:h-[200px] object-cover"
                        width={970}
                        height={160}
                    />
                </div>

                {/* Card Content */}
                <Card className="py-4 rounded-t-none rounded-b-lg shadow-md">
                    <CardHeader className="pb-0 pt-0 px-4 flex flex-col items-start">
                        {/* Header */}
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold text-base sm:text-lg">{taller_name}</h4>
                            <div className="flex items-center text-sm font-medium text-zinc-400">
                                <i className="fa-solid fa-star text-orange-500"></i>
                                <p className="text-sm font-medium text-black ps-1 pb-0.5">{rating}</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center w-full pt-2 pb-1 text-sm text-gray-500">
                            <i className="fa-solid fa-location-dot pe-1 text-default-500"></i>
                            <p className="truncate">{location}</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </Link>
    );
};

export default TallerCard;
