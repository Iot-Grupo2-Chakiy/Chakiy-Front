import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash } from "lucide-react";
import RutinaModal from "../components/RutinasModal";
import RutinaDetalleModal from "../components/RutinaDetalleModal";
import type { RoutineResponse } from "@/utils/responseInterfaces";
import type { CreateRoutineRequest, UpdateRoutineRequest } from "@/utils/requestInterfaces";
import RoutineService from "../services/RoutineService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Rutinas() {
  const [rutinas, setRutinas] = useState<RoutineResponse[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<RoutineResponse | null>(null);

  const cargarRutinas = async () => {
    try {
      const data = await RoutineService.getAllRoutines();
      setRutinas(data);
    } catch (error) {
      console.error("Error al cargar las rutinas:", error);
      toast.error("Error al cargar las rutinas.");
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const crearRutina = async (nuevaRutina: RoutineResponse) => {
    try {
      const request: CreateRoutineRequest = {
        name: nuevaRutina.name,
        deviceId: nuevaRutina.device.id,
        condition: nuevaRutina.condition,
        days: nuevaRutina.days,
        startTime: nuevaRutina.startTime,
        endTime: nuevaRutina.endTime,
        ubication: nuevaRutina.ubication ?? "",
        isDry: nuevaRutina.isDry ?? false,
      };

      await RoutineService.createRoutine(request);
      toast.success("Rutina creada exitosamente.");
      await cargarRutinas();
    } catch (error) {
      console.error("Error al crear rutina:", error);
      toast.error("Error al crear la rutina.");
    }
  };

  const editarRutina = async (id: number, rutinaActualizada: RoutineResponse) => {
    try {
      const request: UpdateRoutineRequest = {
        name: rutinaActualizada.name,
        deviceId: rutinaActualizada.device.id,
        condition: rutinaActualizada.condition,
        days: rutinaActualizada.days,
        startTime: rutinaActualizada.startTime,
        endTime: rutinaActualizada.endTime,
        ubication: rutinaActualizada.ubication ?? "",
        isDry: rutinaActualizada.isDry ?? false,
      };
      await RoutineService.updateRoutine(id, request);
      toast.success("Rutina actualizada exitosamente.");
      await cargarRutinas(); // Reload routines after editing
    } catch (error) {
      console.error("Error al actualizar rutina:", error);
      toast.error("Error al actualizar la rutina.");
    }
  };

  const eliminarRutina = async (id: number) => {
    try {
      await RoutineService.deleteRoutine(id);
      setRutinas((prev) => prev.filter((r) => r.id !== id));
      toast.success("Rutina eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar rutina:", error);
      toast.error("Error al eliminar la rutina.");
    }
  };

  return (
      <div className="space-y-6">
        <ToastContainer />
        <div>
          <button
              onClick={() => {
                setRutinaSeleccionada(null);
                setModalAbierto(true);
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Nueva rutina
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
            <tr className="text-left text-gray-700 text-sm font-semibold bg-gray-100">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Creado en</th>
              <th className="px-4 py-2">Ubicación</th>
              <th className="px-4 py-2">Condición</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {rutinas.map((r) => (
                <tr key={r.id} className="bg-gray-100 hover:bg-gray-200 text-sm">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{r.startTime}</td>
                  <td className="px-4 py-2">{r.ubication || "N/A"}</td>
                  <td className="px-4 py-2">{r.condition}</td>
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
                        onClick={() => {
                          setRutinaSeleccionada(r);
                          setModalAbierto(true);
                        }}
                        className="text-gray-600 hover:text-sky-500"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                        title="Eliminar"
                        onClick={() => r.id && eliminarRutina(r.id)} // Check for undefined
                        className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <RutinaModal
            isOpen={modalAbierto}
            onClose={() => setModalAbierto(false)}
            rutinaEditar={rutinaSeleccionada}
            onCrear={crearRutina}
            onEditar={editarRutina}
        />

        <RutinaDetalleModal
            isOpen={detalleVisible}
            onClose={() => setDetalleVisible(false)}
            rutina={rutinaSeleccionada}
        />
      </div>
  );
}