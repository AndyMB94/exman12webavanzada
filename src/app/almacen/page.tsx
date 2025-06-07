'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Medicamento {
  CodMedicamento: number;
  descripcionMed: string;
  stock: number;
  precioVentaUni: number;
  tipoMedic: {
    descripcion: string;
  };
}

export default function AlmacenPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

  useEffect(() => {
    axios.get('/api/medicamentos')
      .then(res => setMedicamentos(res.data))
      .catch(err => console.error('Error cargando medicamentos:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Stock de Medicamentos</h1>
      <table className="w-full border bg-white text-sm text-gray-900 shadow">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border px-2 py-2">Descripción</th>
            <th className="border px-2 py-2">Tipo</th>
            <th className="border px-2 py-2">Stock</th>
            <th className="border px-2 py-2">Precio Unit.</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(med => (
            <tr key={med.CodMedicamento} className="text-center hover:bg-blue-50">
              <td className="border px-2 py-1">{med.descripcionMed}</td>
              <td className="border px-2 py-1">{med.tipoMedic.descripcion}</td>
              <td className="border px-2 py-1">{med.stock}</td>
              <td className="border px-2 py-1">S/ {med.precioVentaUni.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}