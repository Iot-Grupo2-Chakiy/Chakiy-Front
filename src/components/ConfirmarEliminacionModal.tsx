type ConfirmarEliminacionProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    nombreDispositivo: string;
};

export default function ConfirmarEliminacionModal({
                                                      isOpen,
                                                      onClose,
                                                      onConfirm,
                                                      nombreDispositivo
                                                  }: ConfirmarEliminacionProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Eliminar dispositivo</h2>
                <p className="mb-6">¿Estás seguro de que deseas eliminar <strong>{nombreDispositivo}</strong>?</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
