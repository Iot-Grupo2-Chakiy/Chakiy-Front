export interface Dispositivo {
  id: number;
  name: string;
  descripcion?: string;
  temperaturaMin?: number;
  temperaturaMax?: number;
  humedadMin?: number;
  humedadMax?: number;
  calidadDeAireMin?: number;
  calidadDeAireMax?: number;
  estado: boolean;
}