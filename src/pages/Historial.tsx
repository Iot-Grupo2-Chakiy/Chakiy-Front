import { useEffect, useState } from 'react';
import AuditTrailService from '../services/AuditTrailService';
import IoTDevicesService from '../services/IoTDevicesService';
import type { IoTDeviceResponse } from '@/utils/responseInterfaces.ts';

export type EventoHistorial = {
    id: number;
    fecha: string;
    hora: string;
    dispositivo: string;
    tipoEvento: 'Manual' | 'Automatico';
    origen: string;
    umbrales: string;
};

export default function Historial() {
    const [eventos, setEventos] = useState<EventoHistorial[]>([]);
    const [eventoSeleccionado, setEventoSeleccionado] = useState<EventoHistorial | null>(null);
    const [verDetalle, setVerDetalle] = useState(false);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const logs = await AuditTrailService.getAllLogs();
                if (Array.isArray(logs)) {
                    const formattedLogs: EventoHistorial[] = await Promise.all(
                        logs.map(async (log: any) => {
                            let dispositivo = 'Desconocido';
                            let umbrales = 'N/A';
                            try {
                                if (log.deviceId) {
                                    const device = await IoTDevicesService.getIoTDeviceById(log.deviceId) as IoTDeviceResponse;
                                    console.log(`Fetched device for log ${log.id}:`, device);
                                    dispositivo = device?.name || 'Desconocido';
                                    umbrales = `T ${device.temperaturaMin}–${device.temperaturaMax}°C | H ${device.humedadMin}–${device.humedadMax}% | ICA ${device.calidadDeAireMin}–${device.calidadDeAireMax}`;
                                }
                            } catch (error) {
                                console.error(`Error fetching device for log ${log.id}:`, error);
                            }

                            return {
                                id: log.id,
                                fecha: log.timestamp?.split('T')[0] || 'N/A',
                                hora: log.timestamp?.split('T')[1]?.split('.')[0] || 'N/A',
                                dispositivo,
                                tipoEvento: log.logType === 'MANUAL' ? 'Manual' : 'Automatico',
                                origen: log.logType === 'MANUAL' ? 'Manual' : 'Automatico',
                                umbrales,
                            };
                        })
                    );
                    setEventos(formattedLogs);
                } else {
                    console.error('Invalid logs format');
                }
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <div className="space-y-6">
            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                    <tr className="text-left text-gray-700 text-sm font-semibold bg-gray-100">
                        <th className="px-4 py-2">Fecha y Hora</th>
                        <th className="px-4 py-2">Dispositivo</th>
                        <th className="px-4 py-2">Evento</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento.id} className="bg-white hover:bg-gray-50">
                            <td className="px-4 py-2">{`${evento.fecha} ${evento.hora}`}</td>
                            <td className="px-4 py-2">{evento.dispositivo}</td>
                            <td className="px-4 py-2">{evento.tipoEvento}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => {
                                        setEventoSeleccionado(evento);
                                        setVerDetalle(true);
                                    }}
                                    className="text-sky-500 hover:underline"
                                >
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {verDetalle && eventoSeleccionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Detalles Historial</h2>
                        <p><strong>Tipo de evento:</strong> {eventoSeleccionado.tipoEvento === 'Automatico' ? 'Activación automática' : 'Activación manual'}</p>
                        <p><strong>Fecha y hora:</strong> {eventoSeleccionado.fecha}, {eventoSeleccionado.hora}</p>
                        <p><strong>Origen:</strong> {eventoSeleccionado.origen === 'Automatico' ? 'Rutina' : 'Usuario'}</p>
                        <p><strong>Dispositivo:</strong> {eventoSeleccionado.dispositivo}</p>
                        <p><strong>Umbrales configurados:</strong> {eventoSeleccionado.umbrales}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setVerDetalle(false)}
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}