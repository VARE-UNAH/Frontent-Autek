'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Divider, Accordion, AccordionItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from "@nextui-org/react"

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

export default function PresupuestosCitaMobile({ 
    presupuestos = presupuestosEjemplo,
    onAprobarPresupuesto = () => {},
    onDenegarPresupuesto = () => {}
}: PresupuestosCitaProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [razon, setRazon] = useState('')
  const [accion, setAccion] = useState<'aprobar' | 'denegar'>('aprobar')
  const [presupuestoActual, setPresupuestoActual] = useState<Presupuesto | null>(null)

  const presupuestosOrdenados = [...presupuestos].sort((a, b) => {
    if (a.estado === 'pendiente') return -1
    if (b.estado === 'pendiente') return 1
    if (a.estado === 'activo') return -1
    if (b.estado === 'activo') return 1
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  })

  const presupuestoActivo = presupuestosOrdenados.find(p => p.estado === 'activo')

  const handleAccion = (presupuesto: Presupuesto, accion: 'aprobar' | 'denegar') => {
    setPresupuestoActual(presupuesto)
    setAccion(accion)
    onOpen()
  }

  const handleConfirmar = () => {
    if (presupuestoActual) {
      if (accion === 'aprobar') {
        onAprobarPresupuesto(presupuestoActual.id, razon)
      } else {
        onDenegarPresupuesto(presupuestoActual.id, razon)
      }
    }
    onClose()
    setRazon('')
  }

  return (
    <>
      <Card className="w-full mx-auto bg-white rounded-lg shadow-md">
        <CardBody>
          {presupuestosOrdenados.length > 0 ? (
            <Accordion>
              {presupuestosOrdenados.map((presupuesto) => (
                <AccordionItem
                  key={presupuesto.id}
                  aria-label={`Presupuesto del ${presupuesto.fecha}`}
                  title={
                    <div className="flex justify-between items-center">
                      <span>{presupuesto.fecha}</span>
                      <Chip
                        color={
                          presupuesto.estado === 'activo'
                            ? "success"
                            : presupuesto.estado === 'descartado'
                            ? "danger"
                            : "warning"
                        }
                        variant="flat"
                        size="sm"
                      >
                        {presupuesto.estado === 'activo'
                          ? "Activo"
                          : presupuesto.estado === 'descartado'
                          ? "Descartado"
                          : "Pendiente"}
                      </Chip>
                    </div>
                  }
                >
                  <div className="space-y-2">
                    <p><strong>Monto:</strong> ${presupuesto.monto.toFixed(2)}</p>
                    <p><strong>Razón del cambio:</strong> {presupuesto.razonCambio || 'N/A'}</p>
                    <p>
                      <strong>Estado de pago:</strong>{' '}
                      <Chip
                        color={presupuesto.estadoPago === 'pagado' ? "success" : "warning"}
                        variant="flat"
                        size="sm"
                      >
                        {presupuesto.estadoPago === 'pagado' ? "Pagado" : "Pendiente"}
                      </Chip>
                    </p>
                    {presupuesto.estado === 'pendiente' && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          color="success"
                          className='text-white'
                          onClick={() => handleAccion(presupuesto, 'aprobar')}
                        >
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleAccion(presupuesto, 'denegar')}
                        >
                          Denegar
                        </Button>
                      </div>
                    )}
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
          <span className="font-semibold">Presupuesto Actual:</span>
          <span className="text-lg font-bold">
            ${presupuestoActivo ? presupuestoActivo.monto.toFixed(2) : '0.00'}
          </span>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} placement="bottom">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {accion === 'aprobar' ? 'Aprobar' : 'Denegar'} Presupuesto
              </ModalHeader>
              <ModalBody>
                <p>
                  {accion === 'aprobar' 
                    ? 'Al aprobar este presupuesto, se convertirá en el nuevo presupuesto activo y el anterior (si existe) se marcará como descartado.'
                    : 'Al denegar este presupuesto, se marcará como denegado y no se podrá utilizar.'}
                </p>
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
                <Button color={accion === 'aprobar' ? 'success' : 'danger'} onPress={handleConfirmar}>
                  Confirmar {accion === 'aprobar' ? 'Aprobación' : 'Denegación'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

