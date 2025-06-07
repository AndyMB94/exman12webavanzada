'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface TipoMedic {
  CodTipoMed: number;
  descripcion: string;
}

export default function MedicamentoForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [tipos, setTipos] = useState<TipoMedic[]>([]);
  const [formData, setFormData] = useState({
    descripcionMed: '',
    presentacion: '',
    stock: 0,
    precioVentaUni: 0,
    precioVentaPres: 0,
    marca: '',
    CodTipoMed: '1',
    fechaFabricacion: '',
    fechaVencimiento: '',
  });

  useEffect(() => {
    const fetchTipos = async () => {
      const res = await axios.get('/api/tipo-medic');
      setTipos(res.data);
    };
    fetchTipos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/medicamentos', {
        ...formData,
        stock: Number(formData.stock),
        precioVentaUni: Number(formData.precioVentaUni),
        precioVentaPres: Number(formData.precioVentaPres),
        CodTipoMed: Number(formData.CodTipoMed),
      });
      setOpen(false);
      onSuccess();
    } catch (error) {
      alert('Error al guardar medicamento');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">Nuevo Medicamento</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nuevo Medicamento</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label>Descripción</Label>
            <Input name="descripcionMed" onChange={handleChange} />
          </div>
          <div>
            <Label>Presentación</Label>
            <Input name="presentacion" onChange={handleChange} />
          </div>
          <div>
            <Label>Stock</Label>
            <Input name="stock" type="number" onChange={handleChange} />
          </div>
          <div>
            <Label>Precio Unit.</Label>
            <Input name="precioVentaUni" type="number" step="0.01" onChange={handleChange} />
          </div>
          <div>
            <Label>Precio Present.</Label>
            <Input name="precioVentaPres" type="number" step="0.01" onChange={handleChange} />
          </div>
          <div>
            <Label>Marca</Label>
            <Input name="marca" onChange={handleChange} />
          </div>
          <div>
            <Label>F. Fabricación</Label>
            <Input name="fechaFabricacion" type="date" onChange={handleChange} />
          </div>
          <div>
            <Label>F. Vencimiento</Label>
            <Input name="fechaVencimiento" type="date" onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <Label>Tipo Medicamento</Label>
            <Select
              value={formData.CodTipoMed}
              onValueChange={(value) => setFormData(prev => ({ ...prev, CodTipoMed: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tipos.map((tipo) => (
                  <SelectItem key={tipo.CodTipoMed} value={tipo.CodTipoMed.toString()}>
                    {tipo.descripcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
