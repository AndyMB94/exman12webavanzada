'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MedicamentoForm from '@/components/MedicamentoForm';
import { Button } from '@/components/ui/button';

interface TipoMedic {
  CodTipoMed: number;
  descripcion: string;
}

interface Medicamento {
  CodMedicamento: number;
  descripcionMed: string;
  presentacion: string;
  stock: number;
  precioVentaUni: number;
  precioVentaPres: number;
  marca: string;
  tipoMedic: TipoMedic;
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  const fetchMedicamentos = async () => {
    try {
      const res = await axios.get('/api/medicamentos');
      setMedicamentos(res.data);
    } catch (error) {
      console.error('Error al obtener medicamentos', error);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este medicamento?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/medicamentos/${id}`);
      fetchMedicamentos();
    } catch (error) {
      alert('Error al eliminar medicamento');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Medicamentos</h1>
        <MedicamentoForm onSuccess={fetchMedicamentos} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-gray-900 shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Presentación</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Precio Unitario</th>
              <th className="border px-4 py-2">Marca</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med) => (
              <tr key={med.CodMedicamento} className="text-center hover:bg-blue-50 transition">
                <td className="border px-4 py-2">{med.descripcionMed}</td>
                <td className="border px-4 py-2">{med.presentacion}</td>
                <td className="border px-4 py-2">{med.stock}</td>
                <td className="border px-4 py-2">S/ {med.precioVentaUni.toFixed(2)}</td>
                <td className="border px-4 py-2">{med.marca}</td>
                <td className="border px-4 py-2">{med.tipoMedic.descripcion}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Button variant="outline" className="text-blue-600">✏️</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(med.CodMedicamento)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
