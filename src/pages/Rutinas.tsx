import { useState } from 'react';
import { Plus, Eye, Pencil } from 'lucide-react';
import RutinaModal from '../components/RutinasModal';
import RutinaDetalleModal from '../components/RutinaDetalleModal';

// Tipo de rutina
export type Rutina = {
    nombre: string;
    dispositivo: string;
    condicion: string;
    dias: string[];
    horaInicio: string;
    horaFin: string;
    estado: string;
    ultimaEjecucion: string;
};

const rutinasMock: Rutina[] = [
    {
        nombre: 'Rutina Uno',
        dispositivo: 'Sensor Dormitorio',
        condicion: 'Temperatura > 26°C',
        dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        horaInicio: '22:00',
        horaFin: '06:00',
        estado: 'Activa',
        ultimaEjecucion: '10/05/2025 18:34',
    },
];

export default function Rutinas() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [detalleVisible, setDetalleVisible] = useState(false);
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState<Rutina | null>(null);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    return (
        <div className="space-y-6">
            {/* Botón nueva rutina */}
            <div>
                <button
                    onClick={abrirModal}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nueva rutina
                </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                    <tr className="text-left text-gray-700 text-sm font-semibold bg-gray-100">
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Creado en</th>
                        <th className="px-4 py-2">Ubicación</th>
                        <th className="px-4 py-2">Activación</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rutinasMock.map((r, i) => (
                        <tr key={i} className="bg-gray-100 hover:bg-gray-200 text-sm">
                            <td className="px-4 py-2">{r.nombre}</td>
                            <td className="px-4 py-2 whitespace-nowrap">10-05-2025 18:30</td>
                            <td className="px-4 py-2">{r.dispositivo.split(' ')[1]}</td>
                            <td className="px-4 py-2">{r.condicion}</td>
                            <td className="px-4 py-2 flex gap-3">
                                <button
                                    title="Ver"
                                    onClick={() => {
                                        setRutinaSeleccionada(r);
                                        setDetalleVisible(true);
                                    }}
                                    className="text-gray-600 hover:text-sky-500"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    title="Editar"
                                    onClick={abrirModal}
                                    className="text-gray-600 hover:text-sky-500"
                                >
                                    <Pencil size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal agregar/editar */}
            <RutinaModal isOpen={modalAbierto} onClose={cerrarModal} />

            {/* Modal detalle */}
            <RutinaDetalleModal
                isOpen={detalleVisible}
                onClose={() => setDetalleVisible(false)}
                rutina={rutinaSeleccionada}
            />
        </div>
    );
}
