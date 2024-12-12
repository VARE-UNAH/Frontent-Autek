'use client'

import { Payment } from './data';
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { useState } from 'react';
import FilterButtons from './FilterButtons';

interface PaymentsListProps {
  payments: Payment[];
}

export default function PaymentsList({ payments }: PaymentsListProps) {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
    Completado: "success",
    Pendiente: "warning",
    Cancelado: "danger",
  };

  const filteredPayments = payments.filter(payment => 
    activeFilter === "Todos" || payment.status === activeFilter
  );

  return (
    <>
      <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="w-full">
            <CardBody>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{payment.date}</span>
                <Chip color={statusColorMap[payment.status]} variant="flat" className='rounded-md'>
                  {payment.status}
                </Chip>
              </div>
              <h2 className="text-md font-semibold">{payment.concept}</h2>
            </CardBody>
            <CardFooter className="flex justify-between items-center pt-0">
              <span className="text-md font-bold">L. {payment.amount.toFixed(2)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

