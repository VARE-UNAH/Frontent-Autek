'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Input, Button, Textarea, Accordion, AccordionItem } from "@nextui-org/react"
import { Phone, Mail, Globe } from 'lucide-react'
import ProtectedLayout from '@/components/Layouts/ProtectedLayout'
import AdminLayoutBack from '@/components/Layouts/AdminLayoutBack'
import AdminDefaultLayout from '@/components/Layouts/AdminLayout'

export default function PaginaAyudaTaller() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]))

    const handleSelectionChange = (keys: any) => {
        setSelectedKeys(keys)
    }

    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
                <h1 className="text-3xl font-bold text-start">Soporte Técnico del Software</h1>

                <div className="container mx-auto py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Preguntas Frecuentes</h2>
                            </CardHeader>
                            <CardBody>
                                <Accordion
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={handleSelectionChange}
                                >
                                    <AccordionItem key="1" aria-label="¿Cómo actualizo el software?" title="¿Cómo actualizo el software?">
                                        Para actualizar el software, vaya a Configuración &gt; Actualizaciones y haga clic en &quot;Buscar actualizaciones&quot;. Si hay una nueva versión disponible, siga las instrucciones en pantalla para instalarla.
                                    </AccordionItem>
                                    <AccordionItem key="2" aria-label="¿Qué hago si el sistema no responde?" title="¿Qué hago si el sistema no responde?">
                                        Si el sistema no responde, intente cerrar y volver a abrir la aplicación. Si el problema persiste, reinicie el equipo. Si aún tiene problemas, contacte a nuestro soporte técnico.
                                    </AccordionItem>
                                    <AccordionItem key="3" aria-label="¿Cómo puedo hacer una copia de seguridad de mis datos?" title="¿Cómo puedo hacer una copia de seguridad de mis datos?">
                                        Vaya a Configuración &gt; Copias de seguridad &gt; Crear nueva copia. Seleccione la ubicación donde desea guardar la copia y haga clic en &quot;Iniciar copia de seguridad&quot;.
                                    </AccordionItem>
                                    <AccordionItem key="4" aria-label="¿Cómo agrego un nuevo usuario al sistema?" title="¿Cómo agrego un nuevo usuario al sistema?">
                                        Navegue a Configuración &gt; Usuarios &gt; Agregar nuevo usuario. Complete el formulario con la información del nuevo usuario y asigne los permisos correspondientes.
                                    </AccordionItem>
                                </Accordion>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Contacto de Soporte Técnico</h2>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <span>+504 9620 6662 (Soporte 24/7)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <span>soporte@autek.com</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Globe className="h-5 w-5 text-gray-500" />
                                    <span>https://soporte.autek.com</span>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">Reportar un Problema</h2>
                            </CardHeader>
                            <CardBody>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Nombre"
                                            placeholder="Tu nombre"
                                            variant="bordered"
                                        />
                                        <Input
                                            label="Email"
                                            placeholder="tu@tallermecánico.com"
                                            type="email"
                                            variant="bordered"
                                        />
                                    </div>
                                    <Input
                                        label="Versión del Software"
                                        placeholder="Ej: 2.1.3"
                                        variant="bordered"
                                    />
                                    <Textarea
                                        label="Descripción del Problema"
                                        placeholder="Describe el problema que estás experimentando con el mayor detalle posible"
                                        variant="bordered"
                                        minRows={3}
                                    />
                                    <Textarea
                                        label="Pasos para Reproducir"
                                        placeholder="Enumera los pasos para reproducir el problema"
                                        variant="bordered"
                                        minRows={3}
                                    />
                                    <Button color="primary" className="w-full rounded-lg text-white bg-blue-500">
                                        Enviar Reporte
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </AdminDefaultLayout>
        </ProtectedLayout>
    )
}
