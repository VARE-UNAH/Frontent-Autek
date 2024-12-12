'use client'

import { Button } from "@nextui-org/react";

interface FilterButtonsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterButtons({ activeFilter, setActiveFilter }: FilterButtonsProps) {
  const filters = ["Todos", "Completado", "Pendiente", "Cancelado"];

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter}
          size="sm"
          variant={activeFilter === filter ? "solid" : "bordered"}
          onPress={() => setActiveFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}

