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
        <div className="max-w-md w-full bg-whiten rounded-b-lg shadow-lg p-8 relative">
            <h1 className="text-title-lg text-center font-bold text-slate-500 pb-2">{title}</h1>
            <div className="grid grid-cols-2 gap-4 place-items-center justify-center pt-8">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <i className={`fa-solid ${item.icon} text-5xl text-slate-500`}></i>
                        <h1 className="text-xl text-center font-bold text-slate-500 pt-2">{item.title}</h1>
                        <p className="text-xs text-center text-slate-500 pb-3">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Beneficios;

