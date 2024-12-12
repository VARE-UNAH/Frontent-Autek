'use client'

import { Payment } from './data';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const statusColorMap = {
    Completado: "success",
    Pendiente: "warning",
    Cancelado: "danger",
  };

  return (
    <Table aria-label="Tabla de pagos realizados al taller" className="mt-4">
      <TableHeader>
        <TableColumn>FECHA</TableColumn>
        <TableColumn>CONCEPTO</TableColumn>
        <TableColumn>MONTO</TableColumn>
        <TableColumn>ESTADO</TableColumn>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.date}</TableCell>
            <TableCell>{payment.concept}</TableCell>
            <TableCell>${payment.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Chip color="success" variant="flat">
                {payment.status}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

