'use client'

import AdminDefaultLayout from "@/components/Layouts/AdminLayout"
import ProtectedLayout from "@/components/Layouts/ProtectedLayout"
import { Card, CardBody, CardHeader, Divider, Image, Progress } from "@nextui-org/react"
import { Wrench, Users, DollarSign, Calendar } from 'lucide-react'

export default function PerfilTaller() {
    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
            <h1 className="text-xl font-bold text-start">Mi Taller</h1>
                <div className="container mx-auto pt-1 py-8">
                    <Card className="max-w-4xl mx-auto rounded-lg">
                        <CardHeader className="flex flex-col items-center gap-3">
                            <div className="w-full h-64 flex items-center justify-center overflow-hidden bg-gray-100">
                                <Image
                                    alt="Interior del taller"
                                    className="object-cover rounded-xl w-full"
                                    src="/images/cover/excel.jpeg"
                                    width={600}
                                    height={400}
                                />
                            </div>
                            <h2 className="text-2xl font-bold">Taller El Buen Mantenimiento</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Información General</h3>
                                    <p><strong>Dirección:</strong> Boulevard Morazan, Tegucigalpa</p>
                                    <p><strong>Teléfono:</strong> (504) 2772 9980</p>
                                    <p><strong>Email:</strong> info@elbm.com</p>
                                    <p><strong>Horario:</strong> Lun-Vie: 8am-6pm, Sáb: 9am-2pm</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Estadísticas del Mes</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <Wrench className="mr-2" />
                                            <span>Servicios Completados: 120</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="mr-2" />
                                            <span>Clientes Atendidos: 95</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="mr-2" />
                                            <span>Ingresos: $45,000</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2" />
                                            <span>Citas Programadas: 35</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold mb-2">Capacidad Actual</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span>Bahías de Servicio</span>
                                                <span>7/10</span>
                                            </div>
                                            <Progress value={70} color="primary" className="max-w-md" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span>Mecánicos Disponibles</span>
                                                <span>4/8</span>
                                            </div>
                                            <Progress value={50} color="secondary" className="max-w-md" />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold mb-2">Servicios Más Solicitados</h3>
                                    <ol className="list-decimal list-inside">
                                        <li>Cambio de aceite y filtro</li>
                                        <li>Alineación y balanceo</li>
                                        <li>Revisión de frenos</li>
                                        <li>Diagnóstico electrónico</li>
                                        <li>Cambio de batería</li>
                                    </ol>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </AdminDefaultLayout>
        </ProtectedLayout>
    )
}

