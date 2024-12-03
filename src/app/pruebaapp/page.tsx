'use client'

import React, { useState } from 'react'
import { Input, Button, Card, CardBody, CardFooter, Chip, Select, SelectItem } from "@nextui-org/react"
import { ChevronRight } from 'lucide-react'

type AppointmentStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';

interface Appointment {
  id: string;
  workshopName: string;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
  };
  status: AppointmentStatus;
  date: string;
}
// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    workshopName: 'Quick Fix Auto',
    vehicle: { make: 'Toyota', model: 'Corolla', licensePlate: 'ABC123' },
    status: 'Scheduled',
    date: '2023-06-15'
  },
  {
    id: '2',
    workshopName: 'Speedy Repairs',
    vehicle: { make: 'Honda', model: 'Civic', licensePlate: 'XYZ789' },
    status: 'In Progress',
    date: '2023-06-16'
  },
  {
    id: '3',
    workshopName: 'Elite Motors',
    vehicle: { make: 'Ford', model: 'Mustang', licensePlate: 'DEF456' },
    status: 'Completed',
    date: '2023-06-14'
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All')

  const filteredAppointments = mockAppointments.filter(appointment => 
    (appointment.workshopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
     appointment.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || appointment.status === statusFilter)
  )

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input
        placeholder="Search appointments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Select
        placeholder="Filter by status"
        className="mb-4"
        onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'All')}
      >
        <SelectItem key="All" value="All">All</SelectItem>
        <SelectItem key="Scheduled" value="Scheduled">Scheduled</SelectItem>
        <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
        <SelectItem key="Completed" value="Completed">Completed</SelectItem>
        <SelectItem key="Cancelled" value="Cancelled">Cancelled</SelectItem>
      </Select>
      <Button color="primary" className="w-full mb-4">
        Add New Appointment
      </Button>
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="w-full">
            <CardBody>
              <h3 className="text-lg font-semibold mb-2">{appointment.workshopName}</h3>
              <p className="text-sm mb-1">
                {appointment.vehicle.make} {appointment.vehicle.model}
              </p>
              <p className="text-sm mb-2">License Plate: {appointment.vehicle.licensePlate}</p>
              <Chip color={getStatusColor(appointment.status)} variant="flat">
                {appointment.status}
              </Chip>
            </CardBody>
            <CardFooter>
              <Button
                variant="light"
                color="primary"
                endContent={<ChevronRight className="h-4 w-4" />}
                className="w-full justify-between"
              >
                More Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getStatusColor(status: AppointmentStatus): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
  switch (status) {
    case 'Scheduled':
      return 'primary'
    case 'In Progress':
      return 'warning'
    case 'Completed':
      return 'success'
    case 'Cancelled':
      return 'danger'
    default:
      return 'default'
  }
}

