'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout"
import { Button } from "@nextui-org/react"
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { Plus, ChevronRight, Car } from 'lucide-react'
import Image from "next/image"

export default function Home() {
  const appointments = [
    { id: 1, vehicle: "Toyota Corolla", workshop: "AutoFix", status: "In Progress", date: "2023-05-15", time: "14:30" },
    { id: 2, vehicle: "Honda Civic", workshop: "MechaniCare", status: "Pending", date: "2023-05-17", time: "10:00" },
    { id: 3, vehicle: "Honda Civic", workshop: "MechaniCare", status: "Pending", date: "2023-05-17", time: "10:00" },
  ]

  const vehicles = [
    { id: 1, make: "Toyota", model: "RAV4", year: 2016, image: "/toyota-logo.png" },
    { id: 2, make: "Honda", model: "Civic", year: 2018, image: "/honda-logo.png" },
    { id: 3, make: "Ford", model: "Mustang", year: 2020, image: "/ford-logo.png" },
  ]

  return (
    <DefaultLayout>
    <div className="container mx-auto px-4 py-8">
      <Button color="primary" className="w-full mb-6" startContent={<Plus size={24} />}>
        New Appointment
      </Button>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="w-full">
              <CardHeader className="flex justify-between">
                <span className="font-bold">{appointment.vehicle}</span>
                <span className="text-default-500">{appointment.status}</span>
              </CardHeader>
              <CardBody>
                <p>{appointment.workshop}</p>
                <p>{`${appointment.date} at ${appointment.time}`}</p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="flat">
                  More Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {appointments.length > 2 && (
          <Button className="w-full mt-4" variant="flat" endContent={<ChevronRight size={24} />}>
            See All Appointments
          </Button>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>
        <Accordion>
          {vehicles.map((vehicle) => (
            <AccordionItem
              key={vehicle.id}
              aria-label={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
              title={
                <div className="flex items-center">
                  <Image src="/images/cars/toyota.png" alt={`${vehicle.make} logo`} width={40} height={40} className="mr-4" />
                  <span>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</span>
                </div>
              }
            >
              <div className="p-2">
                <p>Make: {vehicle.make}</p>
                <p>Model: {vehicle.model}</p>
                <p>Year: {vehicle.year}</p>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-4 space-x-4">
          <Button color="primary" startContent={<Plus size={24} />}>
            Add Car
          </Button>
          {vehicles.length > 3 && (
            <Button variant="flat" endContent={<ChevronRight size={24} />}>
              View All Your Cars
            </Button>
          )}
        </div>
      </section>
    </div>
    </DefaultLayout>
  )
}
