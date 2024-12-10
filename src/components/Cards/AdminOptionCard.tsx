import React from "react";

interface CardProps {
  color: string;
  icon: React.ReactNode;
  link: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ color, icon, link, title }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-white`}
      style={{ backgroundColor: color }}
    >
      <div className="mb-4 w-12 h-12">{icon}</div>
      
      <a
        href={link}
        className="mt-2 text-sm underline text-white hover:text-gray-200"
      >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      </a>
    </div>
  );
};

export default Card;
