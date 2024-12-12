import React from "react";
import Card from "../Cards/AdminOptionCard";
import { Wrench } from "lucide-react";

const Grid: React.FC = () => {
  const icons = {
    wrench: (
      <Wrench className="w-10 h-10"></Wrench>
    ),
    dealership: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-10 h-10 sm:w-full sm:h-full"
      >
        <path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM5 6h6v5H5zm14 12h-2v-3H7v3H5V4h14z" />
      </svg>
    ),
    client: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-10 h-10 sm:w-full sm:h-full"
      >
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm7 2h-1a8 8 0 0 1-12 0H5a5 5 0 0 0-5 5v1a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-1a5 5 0 0 0-5-5z" />
      </svg>
    ),
    cog: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-10 h-10 sm:w-full sm:h-full"
      >
        <path d="M19.14 12.94l2.08-.54a8.23 8.23 0 0 0-1.5-3.63l-1.4 1.4a6.28 6.28 0 0 1 0 2.8l1.4 1.4zM12 15.4a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8zm5.62-6.24l1.4-1.4a8.23 8.23 0 0 0-3.63-1.5l-.54 2.08a6.28 6.28 0 0 1 2.8 0zM9.2 3.77l-.54-2.08a8.23 8.23 0 0 0-3.63 1.5l1.4 1.4a6.28 6.28 0 0 1 2.8 0zM3.77 14.8l-2.08.54a8.23 8.23 0 0 0 1.5 3.63l1.4-1.4a6.28 6.28 0 0 1 0-2.8zM14.8 20.23l.54 2.08a8.23 8.23 0 0 0 3.63-1.5l-1.4-1.4a6.28 6.28 0 0 1-2.8 0z" />
      </svg>
    ),
  };

  const cardsData = [
    { color: "#4CAF50", icon: icons.wrench, link: "/admin/my-workshop", title: "Mi Taller" },
    { color: "#FFC107", icon: icons.cog, link: "/admin/appointments", title: "Citas" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          color={card.color}
          icon={card.icon}
          link={card.link}
          title={card.title}
        />
      ))}
    </div>
  );
};

export default Grid;
