import { useEffect, useState } from "react";
import { Plus, Eye, Pencil } from "lucide-react";
import RutinaModal from "../components/RutinasModal";
import RutinaDetalleModal from "../components/RutinaDetalleModal";
import type { RoutineResponse } from "@/utils/responseInterfaces";
import RoutineService from "../services/RoutineService";

export type Rutina = {
  nombre: string;
  dispositivo: string;
  condicion: string;
  dias: string[];
  horaInicio: string;
  horaFin: string;
  estado: string;
  ultimaEjecucion: string;
};

export default function Rutinas() {
  const [rutinas, setRutinas] = useState<RoutineResponse[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [rutinaSeleccionada, setRutinaSeleccionada] =
    useState<RoutineResponse | null>(null);

  const cerrarModal = () => setModalAbierto(false);

  const editarRutina = (rutina: RoutineResponse) => {
    setRutinaSeleccionada(rutina);
    setModalAbierto(true);
  };

  const crearRutina = () => {
    setRutinaSeleccionada(null);
    setModalAbierto(true);
  };

  const cargarRutinas = async () => {
    try {
      const data = await RoutineService.getAllRoutines();
      setRutinas(data);
    } catch (error) {
      console.error("Error al cargar las rutinas:", error);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  return (
    <div className="space-y-6">
      {/* Botón nueva rutina */}
      <div>
        <button
          onClick={crearRutina}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva rutina
        </button>
      </div>

      {/* Tabla */}
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
            {rutinas.map((r, i) => (
              <tr key={i} className="bg-gray-100 hover:bg-gray-200 text-sm">
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
                    onClick={() => editarRutina(r)}
                    className="text-gray-600 hover:text-sky-500"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal agregar/editar */}
      <RutinaModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        rutinaEditar={rutinaSeleccionada}
      />

      {/* Modal detalle */}
      <RutinaDetalleModal
        isOpen={detalleVisible}
        onClose={() => setDetalleVisible(false)}
        rutina={rutinaSeleccionada}
      />
    </div>
  );
}
