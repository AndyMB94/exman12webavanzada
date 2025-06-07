import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const tipos = await prisma.tipoMedic.findMany();
  return NextResponse.json(tipos);
}

export async function POST(req: Request) {
  const data = await req.json();
  const nuevo = await prisma.tipoMedic.create({ data });
  return NextResponse.json(nuevo);
}
