type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function RutinaModal({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
                <h2 className="text-lg font-bold mb-4">Agregar / Editar Rutina</h2>

                <form className="space-y-4 text-sm">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Dispositivo"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Condición (Temp > 20)"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Seleccione los días"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="time"
                            placeholder="Hora Inicio"
                            className="border px-4 py-2 rounded"
                        />
                        <input
                            type="time"
                            placeholder="Hora Fin"
                            className="border px-4 py-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Ubicación"
                        className="w-full border px-4 py-2 rounded"
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-sky-100 text-sky-600 px-4 py-2 rounded font-semibold"
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
