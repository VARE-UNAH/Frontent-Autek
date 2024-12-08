import React from 'react';

interface Item {
    icon: string;
    title: string;
    description: string;
}

interface BeneficiosProps {
    title: string;
    items: Item[];
}

const Beneficios: React.FC<BeneficiosProps> = ({ title, items }) => {
    return (
        <section className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <i className={`fa-solid ${item.icon} text-4xl text-blue-600 mb-4`}></i>
                        <h1 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h1>
                        <p className="text-gray-600 text-center">{item.description}</p>
                    </div>
                ))}
            </div>
            
        </div>
        </section>
    );
};

export default Beneficios;

