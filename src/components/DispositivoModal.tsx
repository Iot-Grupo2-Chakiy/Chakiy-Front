import { useState, useEffect } from 'react';
import type { Dispositivo } from '../types/Dispositivo';

type FormData = {
    name: string;
    temperaturaMin: number;
    temperaturaMax: number;
    calidadDeAireMin: number;
    calidadDeAireMax: number;
    humedadMin: number;
    humedadMax: number;
    estado: boolean;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    dispositivo: Dispositivo | null;
    modoEdicion: boolean;
    onCrear: (data: FormData) => Promise<void>;
    onEditar?: (id: number, data: FormData) => Promise<void>;
};

export default function DispositivoModal({ isOpen, onClose, dispositivo, modoEdicion, onCrear, onEditar }: Props) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        temperaturaMin: 0,
        temperaturaMax: 0,
        calidadDeAireMin: 0,
        calidadDeAireMax: 0,
        humedadMin: 0,
        humedadMax: 0,
        estado: false,
    });

    useEffect(() => {
        if (dispositivo && modoEdicion) {
            setFormData({
                name: dispositivo.nombre ?? '',
                temperaturaMin: dispositivo.temperaturaMin || 0,
                temperaturaMax: dispositivo.temperaturaMax || 0,
                calidadDeAireMin: dispositivo.calidadDeAireMin || 0,
                calidadDeAireMax: dispositivo.calidadDeAireMax || 0,
                humedadMin: dispositivo.humedadMin || 0,
                humedadMax: dispositivo.humedadMax || 0,
                estado: dispositivo.activo ?? false,
            });
        } else {
            setFormData({
                name: '',
                temperaturaMin: 0,
                temperaturaMax: 0,
                calidadDeAireMin: 0,
                calidadDeAireMax: 0,
                humedadMin: 0,
                humedadMax: 0,
                estado: false,
            });
        }
    }, [dispositivo, modoEdicion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: name === 'name' ? value : parseFloat(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (modoEdicion && dispositivo && onEditar) {
            await onEditar(dispositivo.id, formData);
        } else {
            await onCrear(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <h2 className="text-lg font-bold mb-4">{modoEdicion ? 'Editar' : 'Agregar'} Dispositivo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 rounded"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="temperaturaMin"
                            placeholder="Temp Min"
                            value={formData.temperaturaMin || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            name="temperaturaMax"
                            placeholder="Temp Max"
                            value={formData.temperaturaMax || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="humedadMin"
                            placeholder="Humedad Min"
                            value={formData.humedadMin || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            name="humedadMax"
                            placeholder="Humedad Max"
                            value={formData.humedadMax || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="calidadDeAireMin"
                            placeholder="ICA Min"
                            value={formData.calidadDeAireMin || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            name="calidadDeAireMax"
                            placeholder="ICA Max"
                            value={formData.calidadDeAireMax || ''}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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