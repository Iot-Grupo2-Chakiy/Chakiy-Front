import { useState } from 'react';
import { Eye } from 'lucide-react';

export type EventoHistorial = {
    fecha: string;
    hora: string;
    dispositivo: string;
    tipoEvento: 'Manual' | 'Automatico';
    origen: string;
    umbrales: string;
    condicion: string;
};

const historialMock: EventoHistorial[] = [
    {
        fecha: '10-05-2025',
        hora: '18:30',
        dispositivo: 'Purificador Dormitorio',
        tipoEvento: 'Automatico',
        origen: 'Rutina "Purificador Noche"',
        umbrales: 'T 20–26°C | H 40–60% | ICA < 50',
        condicion: 'Temperatura > 26°C',
    },
];

export default function Historial() {
    const [eventoSeleccionado, setEventoSeleccionado] = useState<EventoHistorial | null>(null);
    const [verDetalle, setVerDetalle] = useState(false);

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
                    {historialMock.map((evento, i) => (
                        <tr key={i} className="bg-gray-200 hover:bg-gray-300 text-sm">
                            <td className="px-4 py-2 whitespace-nowrap">
                                {evento.fecha} {evento.hora}
                            </td>
                            <td className="px-4 py-2">{evento.dispositivo}</td>
                            <td className="px-4 py-2">{evento.tipoEvento}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => {
                                        setEventoSeleccionado(evento);
                                        setVerDetalle(true);
                                    }}
                                    className="text-gray-600 hover:text-sky-500"
                                >
                                    <Eye size={18} />
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
                        <p><strong>Origen:</strong> {eventoSeleccionado.origen}</p>
                        <p><strong>Dispositivo:</strong> {eventoSeleccionado.dispositivo}</p>
                        <p><strong>Umbrales configurados:</strong> {eventoSeleccionado.umbrales}</p>
                        <p><strong>Condición que activó el evento:</strong> {eventoSeleccionado.condicion}</p>
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