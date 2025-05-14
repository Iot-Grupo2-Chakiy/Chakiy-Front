import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DispositivoModal from '../components/DispositivoModal';
import IoTDevicesService from '../services/IoTDevicesService';

export default function Dispositivos() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [dispositivos, setDispositivos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<Dispositivo | null>(null);

    useEffect(() => {
        const fetchDispositivos = async () => {
            try {
                const data = await IoTDevicesService.getAllIoTDevices();
                console.log('Datos obtenidos del backend:', data); // Log de los datos obtenidos
                const formattedData = data.map((device) => ({
                    id: device.id,
                    nombre: device.name,
                    descripcion: device.descripcion || 'Sin descripción',
                    temperatura: `T ${device.temperaturaMin}–${device.temperaturaMax}°C`,
                    humedad: `H ${device.humedadMin}–${device.humedadMax}%`,
                    ica: `ICA ${device.calidadDeAireMin}–${device.calidadDeAireMax}`,
                    umbrales: `T ${device.temperaturaMin}–${device.temperaturaMax}°C | H ${device.humedadMin}–${device.humedadMax}% | ICA ${device.calidadDeAireMin}–${device.calidadDeAireMax}`,
                    ultimaAccion: 'N/A', // Placeholder as no field exists for this
                    imagen: 'device-placeholder.svg', // Placeholder image
                     activo: device.estado === true, // Map estado to activo
                }));
                setDispositivos(formattedData);
            } catch (error) {
                console.error('Error fetching devices:', error);
                alert('Error al cargar los dispositivos.');
            }
        };

        fetchDispositivos();
    }, []);

    const abrirModal = (modo: 'nuevo' | 'editar', dispositivo = null) => {

        setModoEdicion(modo === 'editar');
        setDispositivoSeleccionado(dispositivo);
        setModalAbierto(true);
    };

   const toggleActivacion = async (id: number) => {
       setDispositivos((prev) =>
           prev.map((d) => {
               if (d.id === id) {
                   const nuevoEstado = d.activo === undefined || d.activo === null ? true : !d.activo;
                   return { ...d, activo: nuevoEstado };
               }
               return d;
           })
       );

       try {
           const dispositivo = dispositivos.find((d) => d.id === id);
           const nuevoEstado = dispositivo?.activo === undefined || dispositivo?.activo === null ? true : !dispositivo.activo;

           await IoTDevicesService.updateIoTDeviceEstado(id, { estado: nuevoEstado });
           console.log(`Estado del dispositivo con ID ${id} actualizado a: ${nuevoEstado}`);
       } catch (error) {
           console.error('Error al actualizar el estado del dispositivo:', error);
           alert('No se pudo actualizar el estado del dispositivo.');
       }
   };

    const cerrarModal = () => {
        setModalAbierto(false);
        setDispositivoSeleccionado(null);
    };

    const crearDispositivo = async (nuevoDispositivo) => {
        try {
            await IoTDevicesService.createIoTDevice(nuevoDispositivo);
            setDispositivos((prev) => [
                ...prev,
                {
                    id: dispositivos.length + 1,
                    nombre: nuevoDispositivo.name,
                    descripcion: 'Nuevo dispositivo',
                    temperatura: 'N/A',
                    humedad: 'N/A',
                    ica: 'N/A',
                    umbrales: `T ${nuevoDispositivo.temperaturaMin}–${nuevoDispositivo.temperaturaMax}°C | H ${nuevoDispositivo.humedadMin}–${nuevoDispositivo.humedadMax}% | ICA < ${nuevoDispositivo.calidadDeAireMax}`,
                    ultimaAccion: 'N/A',
                    imagen: 'device-placeholder.svg',
                    activo: nuevoDispositivo.estado === 'ACTIVO',
                },
            ]);
            cerrarModal();
        } catch (error) {
            console.error('Error creating device:', error);
            alert('Error al crear el dispositivo.');
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
                                    <p className="text-gray-700">Estado: {disp.activo ? 'Activo' : 'Desactivado'}</p>
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
                onSave={crearDispositivo}
            />
        </div>
    );
}