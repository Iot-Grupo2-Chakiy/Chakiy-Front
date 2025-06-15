export interface Dispositivo {
    id: number;
    name: string;
    nombre?: string;
    descripcion?: string;
    temperaturaMin: number;
    temperaturaMax: number;
    humedadMin: number;
    humedadMax: number;
    calidadDeAireMin: number;
    calidadDeAireMax: number;
    estado: boolean;
    // Propiedades de UI
    temperatura?: string;
    humedad?: string;
    ica?: string;
    umbrales?: string;
    ultimaAccion?: string;
    imagen?: string;
    activo?: boolean;
    isMainDevice?: boolean;
}

export type DispositivoNuevo = Omit<Dispositivo, 'id' | 'temperatura' | 'humedad' | 'ica' | 'umbrales' | 'ultimaAccion' | 'imagen' | 'activo'>;