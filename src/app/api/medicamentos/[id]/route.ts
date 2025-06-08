import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extraer el id de la URL
  const medicamento = await prisma.medicamento.findUnique({
    where: { CodMedicamento: Number(id) },
    include: { tipoMedic: true },
  });
  return NextResponse.json(medicamento);
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const data = await req.json();

  const actualizado = await prisma.medicamento.update({
    where: { CodMedicamento: Number(id) },
    data,
  });
  return NextResponse.json(actualizado);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  await prisma.medicamento.delete({
    where: { CodMedicamento: Number(id) },
  });
  return NextResponse.json({ message: 'Eliminado correctamente' });
}
