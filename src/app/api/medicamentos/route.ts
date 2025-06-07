import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const medicamentos = await prisma.medicamento.findMany({
    include: { tipoMedic: true },
  });
  return NextResponse.json(medicamentos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const nuevo = await prisma.medicamento.create({ data });
  return NextResponse.json(nuevo);
}
