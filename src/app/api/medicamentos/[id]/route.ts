import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Context {
  params: {
    id: string;
  };
}

export async function GET(_req: Request, context: Context) {
  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: Number(context.params.id) },
    include: { tipoMedic: true },
  });
  return NextResponse.json(medicamento);
}

export async function PUT(req: Request, context: Context) {
  const data = await req.json();
  const actualizado = await prisma.medicamento.update({
    where: { CodMedicamento: Number(context.params.id) },
    data,
  });
  return NextResponse.json(actualizado);
}

export async function DELETE(_req: Request, context: Context) {
  await prisma.medicamento.delete({
    where: { CodMedicamento: Number(context.params.id) },
  });
  return NextResponse.json({ message: 'Eliminado correctamente' });
}