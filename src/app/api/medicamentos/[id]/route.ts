import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: Number(params.id) },
    include: { tipoMedic: true },
  });
  return NextResponse.json(medicamento);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const actualizado = await prisma.medicamento.update({
    where: { CodMedicamento: Number(params.id) },
    data,
  });
  return NextResponse.json(actualizado);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.medicamento.delete({
    where: { CodMedicamento: Number(params.id) },
  });
  return NextResponse.json({ message: 'Eliminado correctamente' });
}
