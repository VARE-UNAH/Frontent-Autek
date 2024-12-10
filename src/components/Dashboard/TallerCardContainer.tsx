'use client';
import React from 'react';
import TallerCard from '../Cards/TallerCard';
import { Address } from '@/app/admin/talleres/page';

type TallerCardContainerProps = {
    cards: {
        name: string;
        address: Address;
        rating: number;
    }[];
};

const TallerCardContainer: React.FC<TallerCardContainerProps> = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <TallerCard
                    key={index}
                    taller_name={card.name}
                    location={card.address.address}
                    imageUrl={"https://cdn.aarp.net/content/dam/aarp/auto/2020/09/1140-auto-shop-esp.jpg"}
                    linkUrl={"1"}
                    rating={card.rating}
                />
            ))}
        </div>
    );
};

export default TallerCardContainer;
