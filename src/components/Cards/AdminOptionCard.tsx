import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";

interface MenuCardProps {
  gradient: string;
  icon: React.ReactNode;
  link: string;
  title: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ gradient, icon, link, title }) => {
  return (
    <Link href={link} className="block w-full h-full">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full shadow-lg rounded-lg">
          <CardBody className="p-0">
            <div
              className="relative p-6 flex flex-col items-center justify-center h-full bg-opacity-90 backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${gradient})`,
              }}
            >
              <div className="mb-4 w-16 h-16 flex items-center justify-center text-4xl bg-white bg-opacity-50 rounded-full shadow-inner">
                {icon}
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800">{title}</h2>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out" />
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </Link>
  );
};

export default MenuCard;

