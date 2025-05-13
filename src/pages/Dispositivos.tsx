import { useState } from 'react';
import { Plus } from 'lucide-react';
import DispositivoModal from '../components/DispositivoModal';

const dispositivosMock = [
    {
        id: 1,
        nombre: 'Dispositivo 1',
        descripcion: 'Sensor Dormitorio',
        temperatura: '24°C',
        humedad: '55%',
        ica: '42',
        umbrales: 'T 20–26°C | H 40–60% | ICA < 50',
        ultimaAccion: 'Purificador activado 18:32',
        imagen: 'device-placeholder.svg',
        activo: false,
    },
];

export default function Dispositivos() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [dispositivos, setDispositivos] = useState(dispositivosMock);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);

    const abrirModal = (modo: 'nuevo' | 'editar', dispositivo = null) => {
        setModoEdicion(modo === 'editar');
        setDispositivoSeleccionado(dispositivo);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setDispositivoSeleccionado(null);
    };

    const toggleActivacion = (id: number) => {
        setDispositivos(prev =>
            prev.map(d => {
                if (d.id === id) {
                    const nuevoEstado = !d.activo;
                    if (nuevoEstado) {
                        alert(`${d.nombre} está activado`);
                    }
                    return { ...d, activo: nuevoEstado };
                }
                return d;
            })
        );
    };

    const eliminarDispositivo = (id: number) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este dispositivo?');
        if (confirmacion) {
            setDispositivos(dispositivos.filter(d => d.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <button
                    onClick={() => abrirModal('nuevo')}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nuevo
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dispositivos.map((disp) => (
                    <div
                        key={disp.id}
                        className={`shadow-md rounded-lg p-4 transition-colors ${
                            disp.activo ? 'bg-green-100' : 'bg-white'
                        }`}
                    >
                        <img
                            className="w-full h-32 object-contain mb-3"
                            src={disp.imagen}
                            alt={`Imagen de ${disp.nombre}`}
                        />
                        <h2 className="text-lg font-bold mb-2">{disp.nombre}</h2>
                        <p className="text-gray-700">Temp: {disp.temperatura}</p>
                        <p className="text-gray-700">Humedad: {disp.humedad}</p>
                        <p className="text-gray-700">ICA: {disp.ica}</p>
                        <p className="text-gray-600 mt-2 text-sm">Umbrales: {disp.umbrales}</p>
                        <p className="text-gray-600 text-sm">Última acción: {disp.ultimaAccion}</p>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => toggleActivacion(disp.id)}
                                className={`text-white text-sm px-3 py-1 rounded transition-colors ${
                                    disp.activo ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'
                                }`}
                            >
                                {disp.activo ? 'Desactivar' : 'Activar'}
                            </button>
                            <button
                                onClick={() => abrirModal('editar', disp)}
                                className="bg-blue-400 text-white text-sm px-3 py-1 rounded hover:bg-blue-500"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarDispositivo(disp.id)}
                                className="bg-red-400 text-white text-sm px-3 py-1 rounded hover:bg-red-500"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <DispositivoModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                dispositivo={dispositivoSeleccionado}
                modoEdicion={modoEdicion}
            />
        </div>
    );
}
