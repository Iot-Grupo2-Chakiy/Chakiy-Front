import type { Dispositivo } from '../pages/Dispositivos';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dispositivo: Dispositivo | null;
    modoEdicion: boolean;
}

export default function DispositivoModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <h2 className="text-lg font-bold mb-4">Agregar / Editar Dispositivo</h2>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full border px-4 py-2 rounded"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Temp Min" className="border px-4 py-2 rounded" />
                        <input type="number" placeholder="Temp Max" className="border px-4 py-2 rounded" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Humedad Min" className="border px-4 py-2 rounded" />
                        <input type="number" placeholder="Humedad Max" className="border px-4 py-2 rounded" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="ICA Min" className="border px-4 py-2 rounded" />
                        <input type="number" placeholder="ICA Max" className="border px-4 py-2 rounded" />
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="bg-sky-100 text-sky-600 px-4 py-2 rounded font-semibold"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
