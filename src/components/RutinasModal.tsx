import IoTDevicesService from "@/services/IoTDevicesService";
import type { IoTDeviceResponse, RoutineResponse } from "@/utils/responseInterfaces";
import { useEffect, useMemo, useState } from "react";
import Combobox from "./ui/Combobox";
import RoutineService from "@/services/RoutineService";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  rutinaEditar?: RoutineResponse | null;
};

export default function RutinaModal({ isOpen, onClose, rutinaEditar }: Props) {
  if (!isOpen) return null;

  const [iotDevices, setIoTDevices] = useState<IoTDeviceResponse[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    device: null as IoTDeviceResponse | null,
    condition: "",
    days: [] as string[],
    startTime: "",
    endTime: "",
    ubication: "",
    isDry: false,
  });

  useEffect(() => {
    if (rutinaEditar) {
      const deviceMatch = iotDevices.find(d => d.name === rutinaEditar.device.name);

      setFormData({
        name: rutinaEditar.name,
        device: deviceMatch || null,
        condition: rutinaEditar.condition,
        days: rutinaEditar.days,
        startTime: rutinaEditar.startTime,
        endTime: rutinaEditar.endTime,
        ubication: rutinaEditar.ubication || "",
        isDry: rutinaEditar.isDry || false,
      });
    } else {
      setFormData({
        name: "",
        device: null,
        condition: "",
        days: [],
        startTime: "",
        endTime: "",
        ubication: "",
        isDry: false, // Default value for new routines
      });
    }
  }, [rutinaEditar, iotDevices]);

  const cargarDispositivos = async () => {
    try {
      const data = await IoTDevicesService.getAllIoTDevices() as IoTDeviceResponse[];
      setIoTDevices(data);
    } catch {
      alert("Error al cargar los dispositivos. Por favor, inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    cargarDispositivos();
  }, []);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.device) {
        console.error("Falta el dispositivo");
        return;
      }

      const routineData = {
        name: formData.name,
        deviceId: formData.device.id,
        condition: formData.condition,
        days: formData.days,
        startTime: formData.startTime,
        endTime: formData.endTime,
        ubication: formData.ubication,
        isDry: formData.isDry, // Include isDry in the submitted data
      };

      if (rutinaEditar) {
        await RoutineService.updateRoutine(rutinaEditar.id!, routineData);
        alert("Rutina actualizada exitosamente");
      } else {
        await RoutineService.createRoutine(routineData);
        alert("Rutina creada exitosamente");
      }

      onClose();
    } catch {
      alert("Error al procesar la rutina. Por favor, inténtalo de nuevo.");
    }
  };

  const toggleDay = (dayValue: string) => {
    const isSelected = formData.days.includes(dayValue);
    setFormData((prev) => ({
      ...prev,
      days: isSelected
          ? prev.days.filter((d) => d !== dayValue)
          : [...prev.days, dayValue],
    }));
  };

  const isFormValid = useMemo(() => {
    return Boolean(
        formData.name.trim() &&
        formData.device &&
        formData.condition.trim() &&
        formData.days.length > 0 &&
        formData.startTime &&
        formData.endTime &&
        formData.ubication.trim()
    );
  }, [formData]);

  return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
          <h2 className="text-lg font-bold mb-4">Agregar / Editar Rutina</h2>

          <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
            />
            <div>
              <label htmlFor="device" className="block text-sm mb-2">
                Dispositivo:
              </label>
              <Combobox<IoTDeviceResponse>
                  items={iotDevices}
                  value={formData.device}
                  onChange={(device) => {
                    setFormData((prev) => ({
                      ...prev,
                      device,
                    }));
                  }}
                  getDisplayValue={(device) => device.name}
                  placeholder="Buscar dispositivo..."
                  renderItem={(device) => (
                      <div className="flex justify-between items-center">
                        <span>{device.name}</span>
                        <span
                            className={`text-xs px-2 py-1 rounded ${
                                device.estado
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                    {device.estado ? "Activo" : "Inactivo"}
                  </span>
                      </div>
                  )}
              />
            </div>
            <input
                type="text"
                name="condition"
                placeholder="Condición (Temp > 20)"
                value={formData.condition}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
            />
            <div className="border rounded p-3">
              <p className="mb-2 text-sm">Seleccione los días:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: "MONDAY", label: "Lunes" },
                  { value: "TUESDAY", label: "Martes" },
                  { value: "WEDNESDAY", label: "Miércoles" },
                  { value: "THURSDAY", label: "Jueves" },
                  { value: "FRIDAY", label: "Viernes" },
                  { value: "SATURDAY", label: "Sábado" },
                  { value: "SUNDAY", label: "Domingo" },
                ].map((day) => (
                    <label
                        key={day.value}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                          type="checkbox"
                          checked={formData.days.includes(day.value)}
                          onChange={() => toggleDay(day.value)}
                          className="rounded text-sky-500"
                      />
                      <span>{day.label}</span>
                    </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                  type="time"
                  name="startTime"
                  placeholder="Hora Inicio"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded"
                  required
              />
              <input
                  type="time"
                  name="endTime"
                  placeholder="Hora Fin"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded"
                  required
              />
            </div>
            <input
                type="text"
                name="ubication"
                placeholder="Ubicación"
                value={formData.ubication}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
            />
            <div className="flex items-center space-x-2">
              <input
                  type="checkbox"
                  name="isDry"
                  checked={formData.isDry}
                  onChange={handleChange}
                  className="rounded text-sky-500"
              />
              <label htmlFor="isDry" className="text-sm">
                ¿Adaptado para secar?
              </label>
            </div>
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
                  disabled={!isFormValid}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}