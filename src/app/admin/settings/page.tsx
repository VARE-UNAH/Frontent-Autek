'use client'

import { useState } from 'react'
import { Card, CardBody, CardHeader, Input, Switch, Button, Spacer, Select, SelectItem } from "@nextui-org/react"
import ImageUploader from '@/components/ImageUpload/Index'
import ProtectedLayout from '@/components/Layouts/ProtectedLayout'
import AdminDefaultLayout from '@/components/Layouts/AdminLayout'
import AdminLayoutBack from '@/components/Layouts/AdminLayoutBack'

export default function AjustesTaller() {
    const [nombreTaller, setNombreTaller] = useState('Taller el Buen Mantenimiento')
    const [direccion, setDireccion] = useState('Boulevard Morazan, Tegucigalpa')
    const [telefono, setTelefono] = useState('2772-9934')
    const [horarioApertura, setHorarioApertura] = useState('08:00')
    const [horarioCierre, setHorarioCierre] = useState('18:00')
    const [serviciosOfrecidos, setServiciosOfrecidos] = useState(['mecánica', 'electricidad'])
    const [capacidadMaxima, setCapacidadMaxima] = useState('10')
    const [notificacionesClientes, setNotificacionesClientes] = useState(true)
    const [modoMantenimiento, setModoMantenimiento] = useState(false)
    const [imagenTaller, setImagenTaller] = useState('https://images.pexels.com/photos/3323202/pexels-photo-3323202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    const handleImageUpload = (url: string) => {
        setUploadedImageUrl(url);
        console.log('URL de la imagen subida:', url);
    };

    const guardarCambios = () => {
        // Aquí iría la lógica para guardar los cambios
        console.log('Guardando cambios del taller...')
    }

    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
                <div className="max-w-md mx-auto space-y-4">
                    <h1 className="text-2xl font-bold text-start mb-1">Ajustes del Taller</h1>

                    <Card>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h2 className="font-bold text-large">Información del Taller</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Input
                                label="Nombre del Taller"
                                value={nombreTaller}
                                onChange={(e) => setNombreTaller(e.target.value)}
                                className="max-w-xs"
                            />
                            <Spacer y={2} />
                            <Input
                                label="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="max-w-xs"
                            />
                            <Spacer y={2} />
                            <Input
                                label="Teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="max-w-xs"
                            />
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h2 className="font-bold text-large">Imagen del Taller</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <div className="relative w-full h-48 pb-2">
                                <img
                                    src="/images/cover/excel.jpeg"
                                    alt="Interior del taller mecánico mostrando área de servicio"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <ImageUploader onImageUpload={handleImageUpload} ></ImageUploader>
                        </CardBody>
                    </Card>

                    <Card className='z-0'>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h2 className="font-bold text-large">Horario de Atención</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <div className="flex justify-between">
                                <Input
                                    label="Hora de Apertura"
                                    type="time"
                                    value={horarioApertura}
                                    onChange={(e) => setHorarioApertura(e.target.value)}
                                    className="max-w-[48%]"
                                />
                                <Input
                                    label="Hora de Cierre"
                                    type="time"
                                    value={horarioCierre}
                                    onChange={(e) => setHorarioCierre(e.target.value)}
                                    className="max-w-[48%]"
                                />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className='z-0'>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h2 className="font-bold text-large">Servicios y Capacidad</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Select
                                label="Servicios Ofrecidos"
                                selectionMode="multiple"
                                selectedKeys={serviciosOfrecidos}
                                onSelectionChange={(keys) => setServiciosOfrecidos(Array.from(keys) as string[])}
                                className="max-w-xs"
                            >
                                <SelectItem key="mecánica" value="mecánica">Mecánica General</SelectItem>
                                <SelectItem key="electricidad" value="electricidad">Electricidad</SelectItem>
                                <SelectItem key="pintura" value="pintura">Pintura</SelectItem>
                                <SelectItem key="llantas" value="llantas">Llantas</SelectItem>
                            </Select>
                            <Spacer y={2} />
                            <Input
                                label="Capacidad Máxima de Vehículos"
                                type="number"
                                value={capacidadMaxima}
                                onChange={(e) => setCapacidadMaxima(e.target.value)}
                                className="max-w-xs"
                            />
                        </CardBody>
                    </Card>

                    <Card className='z-0'>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h2 className="font-bold text-large z-1">Configuración del Sistema</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <div className="flex items-center justify-between">
                                <span>Notificaciones a Clientes</span>
                                <Switch
                                    checked={notificacionesClientes}
                                    onChange={(e) => setNotificacionesClientes(e.target.checked)}
                                    aria-label="Activar notificaciones a clientes"
                                    className='z-0'
                                />
                            </div>
                            <Spacer y={2} />
                            <div className="flex items-center justify-between">
                                <span>Modo Mantenimiento</span>
                                <Switch
                                    checked={modoMantenimiento}
                                    onChange={(e) => setModoMantenimiento(e.target.checked)}
                                    aria-label="Activar modo mantenimiento"
                                    className='z-0'
                                />
                            </div>
                        </CardBody>
                    </Card>

                    <Button
                        color="primary"
                        onClick={guardarCambios}
                        className="w-full rounded-lg bg-blue-600 text-white"
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </AdminDefaultLayout>
        </ProtectedLayout>
    )
}

