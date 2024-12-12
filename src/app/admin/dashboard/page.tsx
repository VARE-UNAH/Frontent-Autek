'use client'

import { Card, CardBody, CardHeader, Progress, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Wrench, Users, DollarSign, Calendar, ChevronDown } from 'lucide-react'
import ProtectedLayout from "@/components/Layouts/ProtectedLayout"
import AdminDefaultLayout from "@/components/Layouts/AdminLayout"

const data = [
    { name: 'Lun', servicios: 12 },
    { name: 'Mar', servicios: 19 },
    { name: 'Mié', servicios: 15 },
    { name: 'Jue', servicios: 22 },
    { name: 'Vie', servicios: 25 },
    { name: 'Sáb', servicios: 18 },
    { name: 'Dom', servicios: 5 },
]

export default function DashboardTaller() {
    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
            <h1 className="text-3xl font-bold">Dashboard del Taller</h1>
                <div className="container mx-auto py-4">
                    <div className="flex justify-between items-center mb-6">
                        
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="flat"
                                    endContent={<ChevronDown className="text-small" />}
                                >
                                    Esta Semana
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Selección de período">
                                <DropdownItem key="semana">Esta Semana</DropdownItem>
                                <DropdownItem key="mes">Este Mes</DropdownItem>
                                <DropdownItem key="año">Este Año</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <Card>
                            <CardBody>
                                <div className="flex items-center">
                                    <Wrench className="w-8 h-8 mr-2 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Servicios Completados</p>
                                        <p className="text-2xl font-bold">126</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="flex items-center">
                                    <Users className="w-8 h-8 mr-2 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Clientes Atendidos</p>
                                        <p className="text-2xl font-bold">98</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="flex items-center">
                                    <DollarSign className="w-8 h-8 mr-2 text-yellow-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Ingresos</p>
                                        <p className="text-2xl font-bold">$48,350</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="flex items-center">
                                    <Calendar className="w-8 h-8 mr-2 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Citas Programadas</p>
                                        <p className="text-2xl font-bold">32</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-bold">Servicios por Día</h2>
                            </CardHeader>
                            <CardBody>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="servicios" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-bold">Capacidad Actual</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Bahías de Servicio</span>
                                            <span>8/10</span>
                                        </div>
                                        <Progress value={80} color="primary" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Mecánicos Disponibles</span>
                                            <span>5/8</span>
                                        </div>
                                        <Progress value={62.5} color="secondary" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span>Inventario de Repuestos</span>
                                            <span>75%</span>
                                        </div>
                                        <Progress value={75} color="success" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-bold">Próximas Citas</h2>
                            </CardHeader>
                            <CardBody>
                                <ul className="space-y-2">
                                    <li className="flex justify-between items-center">
                                        <span>Juan Pérez - Cambio de aceite</span>
                                        <span className="text-sm text-gray-500">10:00 AM</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>María González - Revisión de frenos</span>
                                        <span className="text-sm text-gray-500">11:30 AM</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Carlos Rodríguez - Alineación</span>
                                        <span className="text-sm text-gray-500">2:00 PM</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Ana Martínez - Diagnóstico</span>
                                        <span className="text-sm text-gray-500">3:30 PM</span>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-bold">Servicios Más Solicitados</h2>
                            </CardHeader>
                            <CardBody>
                                <ul className="space-y-2">
                                    <li className="flex justify-between items-center">
                                        <span>Cambio de aceite</span>
                                        <span className="font-bold">32%</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Revisión de frenos</span>
                                        <span className="font-bold">24%</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Alineación y balanceo</span>
                                        <span className="font-bold">18%</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Diagnóstico electrónico</span>
                                        <span className="font-bold">15%</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span>Cambio de batería</span>
                                        <span className="font-bold">11%</span>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </AdminDefaultLayout>
        </ProtectedLayout>
    )
}

