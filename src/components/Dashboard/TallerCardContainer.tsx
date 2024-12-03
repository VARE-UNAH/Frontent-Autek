'use client';
import React from 'react';
import TallerCard from '../Cards/TallerCard';

type TallerCardContainerProps = {
    cards: {
        taller_name: string;
        location: string;
        imageUrl: string;
        linkUrl: string;
        rating: number;
    }[];
};

const TallerCardContainer: React.FC<TallerCardContainerProps> = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <TallerCard
                    key={index}
                    taller_name={card.taller_name}
                    location={card.location}
                    imageUrl={card.imageUrl}
                    linkUrl={card.linkUrl}
                    rating={card.rating}
                />
            ))}
        </div>
    );
};

export default TallerCardContainer;
