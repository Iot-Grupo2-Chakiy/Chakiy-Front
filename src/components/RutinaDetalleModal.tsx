import type { RoutineResponse } from "@/utils/responseInterfaces";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    rutina: RoutineResponse | null;
};

export default function RutinaDetalleModal({ isOpen, onClose, rutina }: Props) {
    if (!isOpen || !rutina) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
                <h2 className="text-lg font-bold mb-4">Detalles Rutina</h2>

                <div className="space-y-2 text-sm text-gray-800">
                    <p><strong>Nombre:</strong> {rutina.name}</p>
                    <p><strong>Dispositivo asociado:</strong> {rutina.device.name}</p>
                    <p><strong>Condición:</strong> {rutina.condition}</p>
                    <p><strong>Días activos:</strong> {rutina.days.join(', ')}</p>
                    <p><strong>Rango horario:</strong> {rutina.startTime} a {rutina.endTime}</p>
                    <p><strong>Ubicación:</strong> {rutina.ubication || 'N/A'}</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded font-semibold"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
