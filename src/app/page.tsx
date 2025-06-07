'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Sistema de Farmacia</h1>

      <p className="mb-6 text-gray-700">Bienvenido al sistema CRUD de medicamentos con Next.js y Prisma.</p>

      <Link
        href="/medicamentos"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Ir a Medicamentos
      </Link>
    </div>
  );
}
