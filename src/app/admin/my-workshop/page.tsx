import AdminDefaultLayout from "@/components/Layouts/AdminLayout";
import ProtectedLayout from "@/components/Layouts/ProtectedLayout";
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { MapPin } from 'lucide-react';

export default function TallerPage() {
    return (
        <ProtectedLayout>
            <AdminDefaultLayout>
                <div className="flex items-center bg-gray-100 w-full">
                    <Card className="h-auto w-full">
                        <CardHeader className="flex-col items-center pb-0">
                            <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                                <Image
                                    removeWrapper
                                    alt="Card background"
                                    className="z-0 w-full object-cover rounded mb-2"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover", // Asegura que la imagen se ajuste correctamente
                                    }}
                                    src="/images/cover/excel.jpeg"
                                />
                            </div>
                            <h4 className="text-large font-bold mt-2">Taller el Buen Mantenimiento</h4>
                            <h5 className="text-small text-default-500 flex items-center gap-1">
                                <MapPin size={16} />
                                <span>Tegucigalpa, Francisco Morazan</span>
                            </h5>
                        </CardHeader>
                        <CardBody className="text-center">
                            <p className="text-default-500">
                                Bienvenidos a Mi Taller, donde la excelencia en el servicio es nuestra prioridad.
                                Ofrecemos reparaciones de alta calidad y mantenimiento para todo tipo de vehículos.
                                Con años de experiencia y un equipo de mecánicos altamente calificados,
                                garantizamos la satisfacción del cliente en cada trabajo que realizamos.
                            </p>
                        </CardBody>
                        <CardFooter className="justify-center gap-3">
                            <Button
                                color="primary"
                                radius="sm"
                                size="sm"
                                className="text-white"
                            >
                                Editar perfil
                            </Button>
                            <Button
                                color="primary"
                                radius="sm"
                                size="sm"
                                variant="bordered"
                            >
                                Editar descripción
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </AdminDefaultLayout>
        </ProtectedLayout>
    );
}

