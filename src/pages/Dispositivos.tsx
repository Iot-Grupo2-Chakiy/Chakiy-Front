import { useState, useEffect } from 'react';
import { Plus, Star, StarOff } from 'lucide-react';
import DispositivoModal from '../components/DispositivoModal';
import ConfirmarEliminacionModal from '../components/ConfirmarEliminacionModal';
import IoTDevicesService from '../services/IoTDevicesService';
import type { Dispositivo, DispositivoNuevo } from '../types/Dispositivo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dispositivos() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<Dispositivo | null>(null);
    const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
    const [dispositivoAEliminar, setDispositivoAEliminar] = useState<Dispositivo | null>(null);

    useEffect(() => {
        const fetchDispositivos = async () => {
            try {
                const data = await IoTDevicesService.getAllIoTDevices() as Dispositivo[];
                const formattedData = data.map((device: Dispositivo) => ({
                    ...device,
                    nombre: device.name,
                    descripcion: device.descripcion || 'Sin descripción',
                    temperatura: `T ${device.temperaturaMin}–${device.temperaturaMax}°C`,
                    humedad: `H ${device.humedadMin}–${device.humedadMax}%`,
                    ica: `ICA ${device.calidadDeAireMin}–${device.calidadDeAireMax}`,
                    umbrales: `T ${device.temperaturaMin}–${device.temperaturaMax}°C | H ${device.humedadMin}–${device.humedadMax}% | ICA ${device.calidadDeAireMin}–${device.calidadDeAireMax}`,
                    ultimaAccion: 'N/A',
                    imagen: 'device-placeholder.svg',
                    activo: device.estado,
                    isMainDevice: device.isMainDevice || false
                }));
                setDispositivos(formattedData);
            } catch (error) {
                console.error('Error fetching devices:', error);
                toast.error('Error al cargar los dispositivos.');
            }
        };

        fetchDispositivos();
    }, []);

    const abrirModal = (modo: 'nuevo' | 'editar', dispositivo?: Dispositivo | null) => {
        setModoEdicion(modo === 'editar');
        setDispositivoSeleccionado(dispositivo || null);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setDispositivoSeleccionado(null);
    };

    const crearDispositivo = async (datosDispositivo: DispositivoNuevo) => {
        try {
            await IoTDevicesService.createIoTDevice(datosDispositivo);
            const nuevoDispositivo: Dispositivo = {
                ...datosDispositivo,
                id: dispositivos.length + 1,
                nombre: datosDispositivo.name,
                temperatura: `T ${datosDispositivo.temperaturaMin}–${datosDispositivo.temperaturaMax}°C`,
                humedad: `H ${datosDispositivo.humedadMin}–${datosDispositivo.humedadMax}%`,
                ica: `ICA ${datosDispositivo.calidadDeAireMin}–${datosDispositivo.calidadDeAireMax}`,
                umbrales: `T ${datosDispositivo.temperaturaMin}–${datosDispositivo.temperaturaMax}°C | H ${datosDispositivo.humedadMin}–${datosDispositivo.humedadMax}% | ICA ${datosDispositivo.calidadDeAireMin}–${datosDispositivo.calidadDeAireMax}`,
                ultimaAccion: 'N/A',
                imagen: 'device-placeholder.svg',
                activo: false,
                isMainDevice: false
            };
            setDispositivos(prev => [...prev, nuevoDispositivo]);
            cerrarModal();
            toast.success('Dispositivo creado exitosamente.');
        } catch (error) {
            console.error('Error creating device:', error);
            toast.error('Error al crear el dispositivo.');
        }
    };

    const editarDispositivo = async (id: number, data: DispositivoNuevo) => {
        try {
            await IoTDevicesService.updateIoTDeviceById(id, data);
            const actualizados = dispositivos.map(d =>
                d.id === id ? { ...d, ...data, nombre: data.name, activo: data.estado } : d
            );
            setDispositivos(actualizados);
            cerrarModal();
            toast.success('Dispositivo actualizado exitosamente.');
        } catch (error) {
            console.error('Error actualizando dispositivo:', error);
            toast.error('No se pudo actualizar el dispositivo.');
        }
    };

    const toggleActivacion = async (id: number) => {
        const dispositivo = dispositivos.find(d => d.id === id);
        if (!dispositivo) return;
        const nuevoEstado = !dispositivo.activo;

        try {
            await IoTDevicesService.updateIoTDeviceEstado(id, { estado: nuevoEstado });
            setDispositivos(prev =>
                prev.map(d => (d.id === id ? { ...d, activo: nuevoEstado } : d))
            );
            toast.success(`Dispositivo ${nuevoEstado ? 'activado' : 'desactivado'} exitosamente.`);
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            toast.error('No se pudo actualizar el estado del dispositivo.');
        }
    };

    const actualizarMainDevice = async (id: number) => {
        const dispositivo = dispositivos.find(d => d.id === id);
        if (!dispositivo) return;

        const nuevoValor = !dispositivo.isMainDevice;

        try {
            await IoTDevicesService.updateIoTMainDeviceById(id, { isMainDevice: nuevoValor });

            setDispositivos(prev =>
                prev.map(d =>
                    d.id === id ? { ...d, isMainDevice: nuevoValor } : d
                )
            );

            toast.success(`Dispositivo ${nuevoValor ? 'marcado como favorito' : 'ya no es favorito'}.`);
        } catch (error) {
            console.error('Error actualizando isMainDevice:', error);
            toast.error('No se pudo actualizar el estado de favorito.');
        }
    };



    const eliminarDispositivo = async () => {
        if (!dispositivoAEliminar) return;
        try {
            await IoTDevicesService.deleteIoTDeviceById(dispositivoAEliminar.id);
            setDispositivos(prev => prev.filter(d => d.id !== dispositivoAEliminar.id));
            setModalEliminarAbierto(false);
            setDispositivoAEliminar(null);
            toast.success('Dispositivo eliminado exitosamente.');
        } catch (error) {
            console.error('Error eliminando dispositivo:', error);
            toast.error('No se pudo eliminar el dispositivo.');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="space-y-6">
                <button
                    onClick={() => abrirModal('nuevo')}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nuevo
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dispositivos.map((disp) => (
                        <div
                            key={disp.id}
                            className={`shadow-md rounded-lg p-4 relative transition-colors ${disp.activo ? 'bg-green-100' : 'bg-white'}`}
                        >
                            <div className="absolute top-2 right-2 cursor-pointer">
                                {disp.isMainDevice ? (
                                    <Star
                                        size={20}
                                        className="text-yellow-500"
                                        onClick={() => actualizarMainDevice(disp.id)}
                                    />
                                ) : (
                                    <StarOff
                                        size={20}
                                        className="text-gray-400 hover:text-yellow-500"
                                        onClick={() => actualizarMainDevice(disp.id)}
                                    />
                                )}
                            </div>

                            <img className="w-full h-32 object-contain mb-3" src={disp.imagen} alt={`Imagen de ${disp.nombre}`} />
                            <h2 className="text-lg font-bold mb-2">{disp.nombre}</h2>
                            <p className="text-gray-700">Estado: {disp.activo ? 'Activo' : 'Desactivado'}</p>
                            <p className="text-gray-700">Temp: {disp.temperatura}</p>
                            <p className="text-gray-700">Humedad: {disp.humedad}</p>
                            <p className="text-gray-700">ICA: {disp.ica}</p>
                            <p className="text-gray-600 mt-2 text-sm">Umbrales: {disp.umbrales}</p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => toggleActivacion(disp.id)}
                                    className={`text-white text-sm px-3 py-1 rounded transition-colors ${disp.activo ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'}`}
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
                                    onClick={() => {
                                        setDispositivoAEliminar(disp);
                                        setModalEliminarAbierto(true);
                                    }}
                                    className="bg-red-400 text-white text-sm px-3 py-1 rounded hover:bg-red-500"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <DispositivoModal
                    isOpen={modalAbierto}
                    onClose={cerrarModal}
                    dispositivo={dispositivoSeleccionado}
                    modoEdicion={modoEdicion}
                    onCrear={crearDispositivo}
                    onEditar={editarDispositivo}
                />

                <ConfirmarEliminacionModal
                    isOpen={modalEliminarAbierto}
                    onClose={() => setModalEliminarAbierto(false)}
                    onConfirm={eliminarDispositivo}
                    nombreDispositivo={dispositivoAEliminar?.nombre || ''}
                />
            </div>
        </>
    );
}