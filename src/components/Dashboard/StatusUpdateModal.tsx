'use client';

import { Appointment } from '@/types/appointment';
import { useState, useEffect } from 'react';

interface StatusUpdateModalProps {
  appointment: Appointment;
  onClose: () => void;
  onStatusUpdate: (appointmentId: number, newStatus: number) => void;
}

export function StatusUpdateModal({
  appointment,
  onClose,
  onStatusUpdate,
}: StatusUpdateModalProps) {
  const [newStatus, setNewStatus] = useState(appointment.appointment_status?.id);
  const [statuses, setStatuses] = useState<{ id_appointment_status: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/service/appointment/status/show/all/`);
        if (!response.ok) {
          throw new Error('Error al obtener los estados.');
        }
        const data = await response.json();
        setStatuses(data || []);
      } catch (err) {
        setError('No se pudieron cargar los estados.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStatusUpdate(appointment.id_appointment, newStatus as number);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Actualizar Estado de la Cita</h2>
        {loading ? (
          <p>Cargando estados...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-4 px-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Seleccione un estado
                </option>
                {statuses.map((status) => (
                  <option key={status.id_appointment_status} value={status.id_appointment_status}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
