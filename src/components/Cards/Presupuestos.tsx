'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Divider, Accordion, AccordionItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea, Input } from "@nextui-org/react"
import { CircleDollarSign } from 'lucide-react'
import { Budget } from '@/types/budget'
import { getBudgetsByAppointmentId } from '@/services/appointments/appointmentsService'
import { createBudget } from '@/services/appointments/admin'
import { toast } from 'sonner'
import axios from 'axios'

interface Presupuesto {
    id: number
    monto: number
    fecha: string
    razonCambio?: string
    estado: 'activo' | 'descartado' | 'pendiente'
    estadoPago: 'pendiente' | 'pagado'
}

interface PresupuestosCitaProps {
    presupuestos?: Presupuesto[]
    onAprobarPresupuesto?: (id: number, razon: string) => void
    onDenegarPresupuesto?: (id: number, razon: string) => void
}

const presupuestosEjemplo: Presupuesto[] = [
    { id: 1, monto: 500, fecha: '2023-11-15', razonCambio: 'Presupuesto inicial', estado: 'descartado', estadoPago: 'pendiente' },
    { id: 2, monto: 550, fecha: '2023-11-20', razonCambio: 'Ajuste por piezas adicionales', estado: 'activo', estadoPago: 'pendiente' },
    { id: 3, monto: 600, fecha: '2023-11-25', razonCambio: 'Inclusión de servicio adicional', estado: 'pendiente', estadoPago: 'pendiente' },
]

export function PresupuestosCitaMobile({ appointmentId }: { appointmentId: number }) {
    const [presupuestos, setPresupuestos] = useState<Budget[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [accion, setAccion] = useState<'aprobar' | 'denegar'>('aprobar');
    const [razon, setRazon] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const budgets = await getBudgetsByAppointmentId(appointmentId);
                setPresupuestos(budgets);
            } catch (error) {
                console.error('Error al obtener los presupuestos:', error);
            }
        };

        fetchBudgets();
    }, [appointmentId]);

    const presupuestosOrdenados = [...presupuestos].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const ultimoPresupuestoAprobado = presupuestosOrdenados.find(p => p.status.name === 'Aprobado');

    const handleAccion = (presupuesto: Budget, accion: 'aprobar' | 'denegar') => {
        setSelectedBudget(presupuesto);
        setAccion(accion);
        onOpen();
    };

    const updateBudgetStatus = async (budgetId: number, statusId: number) => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/budget/${budgetId}/status/update/`, {
                status: statusId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el estado del presupuesto:', error);
            throw error;
        }
    };

    const handleConfirmar = async () => {
        if (selectedBudget) {
            try {
                const newStatusId = accion === 'aprobar' ? 2 : 3;
                await updateBudgetStatus(selectedBudget.id_budget, newStatusId);
                
                // Actualizar la lista de presupuestos
                const updatedBudgets = await getBudgetsByAppointmentId(appointmentId);
                setPresupuestos(updatedBudgets);
                toast.success("Presupuesto Actualizado")
                console.log(`Presupuesto ${accion}:`, selectedBudget.id_budget, razon, newStatusId);
            } catch (error) {
                console.error(`Error al ${accion} el presupuesto:`, error);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        }
        onClose();
        setRazon('');
    };

    return (
        <>
            <Card className="w-full mx-auto bg-white rounded-lg shadow-md">
                <CardBody>
                    {presupuestosOrdenados.length > 0 ? (
                        <Accordion>
                            {presupuestosOrdenados.map((presupuesto) => (
                                <AccordionItem
                                    key={presupuesto.id_budget}
                                    aria-label={`Presupuesto del ${new Date(presupuesto.created_at).toLocaleDateString()}`}
                                    title={
                                        <div className="flex justify-between items-center">
                                            <span>{new Date(presupuesto.created_at).toLocaleDateString()}</span>
                                            <Chip
                                                color={
                                                    presupuesto.status.name === 'Aprobado'
                                                        ? "success"
                                                        : presupuesto.status.name === 'Denegado'
                                                            ? "danger"
                                                            : "warning"
                                                }
                                                variant="flat"
                                                size="sm"
                                            >
                                                {presupuesto.status.name}
                                            </Chip>
                                        </div>
                                    }
                                >
                                    <div className="space-y-2">
                                        <p><strong>Monto:</strong> L.{parseFloat(presupuesto.amount).toFixed(2)}</p>
                                        <p><strong>Descripción:</strong> {presupuesto.description || 'N/A'}</p>
                                        {presupuesto.status.name === 'Nuevo Prespuesto' && (
                                            <div className="flex gap-2 mt-2">
                                                <Button color="success" className='text-white' size="sm" onClick={() => handleAccion(presupuesto, 'aprobar')}>
                                                    Aprobar
                                                </Button>
                                                <Button color="danger" size="sm" onClick={() => handleAccion(presupuesto, 'denegar')}>
                                                    Denegar
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No hay presupuestos disponibles.</p>
                    )}
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center">
                    <span className="font-semibold">Total Presupuesto Aprobado:</span>
                    <span className="text-lg font-bold">
                        L.{ultimoPresupuestoAprobado ? parseFloat(ultimoPresupuestoAprobado.amount).toFixed(2) : '0.00'}
                    </span>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose} placement="center">
                <ModalContent>
                    <ModalHeader>{accion === 'aprobar' ? 'Aprobar' : 'Denegar'} Presupuesto</ModalHeader>
                    <ModalBody>
                        <Textarea
                            label={`Razón de ${accion === 'aprobar' ? 'aprobación' : 'denegación'}`}
                            placeholder={`Ingrese la razón de la ${accion === 'aprobar' ? 'aprobación' : 'denegación'}`}
                            value={razon}
                            onChange={(e) => setRazon(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" onPress={handleConfirmar}>
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export function PresupuestosCitaMobileAdmin({ appointmentId }: { appointmentId: number }) {
    const [presupuestos, setPresupuestos] = useState<Budget[]>([]);
    const [newBudgetDescription, setNewBudgetDescription] = useState('');
    const [newBudgetAmount, setNewBudgetAmount] = useState('');

    const {
        isOpen: isBudgetModalOpen,
        onOpen: onOpenBudgetModal,
        onOpenChange: onBudgetModalChange,
    } = useDisclosure();

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const budgets = await getBudgetsByAppointmentId(appointmentId);
                setPresupuestos(budgets);
            } catch (error) {
                console.error('Error al obtener los presupuestos:', error);
            }
        };

        fetchBudgets();
    }, [appointmentId]);

    const presupuestosOrdenados = [...presupuestos].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const onCreateBudget = async (description: string, amount: string) => {
        try {
            // Aquí iría la lógica para crear un nuevo presupuesto en tu backend
            // Por ejemplo:
            await createBudget(appointmentId, description, Number(amount));
            console.log('Creando nuevo presupuesto:', { appointmentId, description, amount });
            // Después de crear el presupuesto, deberías actualizar la lista de presupuestos
            const updatedBudgets = await getBudgetsByAppointmentId(appointmentId);
            setPresupuestos(updatedBudgets);
            onBudgetModalChange();
            toast.success("Presupuesto enviado correctamente")
        } catch (error) {
            console.error('Error al crear el presupuesto:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrando una notificación al usuario
        }
    };

    const handleCreateBudget = () => {
        onCreateBudget(newBudgetDescription, newBudgetAmount);
        setNewBudgetDescription('');
        setNewBudgetAmount('');
    };

    return (
        <>
            <Card className="w-full mx-auto bg-white rounded-lg shadow-md">
                <CardBody>
                    <Button
                        className='w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition mb-2'
                        startContent={<CircleDollarSign />}
                        onClick={onOpenBudgetModal}
                    >
                        Añadir Nuevo Presupuesto
                    </Button>
                    {presupuestosOrdenados.length > 0 ? (
                        <Accordion>
                            {presupuestosOrdenados.map((presupuesto) => (
                                <AccordionItem
                                    key={presupuesto.id_budget}
                                    aria-label={`Presupuesto del ${new Date(presupuesto.created_at).toLocaleDateString()}`}
                                    title={
                                        <div className="flex justify-between items-center">
                                            <span>{new Date(presupuesto.created_at).toLocaleDateString()}</span>
                                            <Chip
                                                color={
                                                    presupuesto.status.name === 'Aprobado'
                                                        ? "success"
                                                        : presupuesto.status.name === 'Denegado'
                                                            ? "danger"
                                                            : "warning"
                                                }
                                                variant="flat"
                                                size="sm"
                                            >
                                                {presupuesto.status.name}
                                            </Chip>
                                        </div>
                                    }
                                >
                                    <div className="space-y-2">
                                        <p><strong>Monto:</strong> L.{parseFloat(presupuesto.amount).toFixed(2)}</p>
                                        <p><strong>Descripción:</strong> {presupuesto.description || 'N/A'}</p>
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No hay presupuestos todavía.</p>
                    )}
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center">
                    <span className="font-semibold">Total Presupuestos:</span>
                    <span className="text-lg font-bold">
                        L. {presupuestosOrdenados?.[0]?.amount ?? 'N/A'}
                    </span>
                </CardFooter>
            </Card>

            <Modal isOpen={isBudgetModalOpen} onOpenChange={onBudgetModalChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col pb-0">
                                <p className='pb-1'>Nuevo Presupuesto</p>
                                <Divider />
                            </ModalHeader>

                            <ModalBody className='mt-0'>
                                <p>
                                    En este apartado podrá crear un nuevo presupuesto para la cita
                                </p>
                                <Textarea
                                    label="Descripción del presupuesto"
                                    placeholder="Ingrese la descripción del nuevo presupuesto"
                                    value={newBudgetDescription}
                                    onChange={(e) => setNewBudgetDescription(e.target.value)}
                                />
                                <Input
                                    label="Monto del presupuesto"
                                    placeholder="Ingrese el monto del nuevo presupuesto"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">L.</span>
                                        </div>
                                    }
                                    type="number"
                                    value={newBudgetAmount}
                                    onChange={(e) => setNewBudgetAmount(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    className='bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition'
                                    onPress={handleCreateBudget}
                                >
                                    Crear Presupuesto
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

