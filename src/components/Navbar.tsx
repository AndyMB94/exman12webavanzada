'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-bold text-yellow-300">Stack</div>

      <div className="space-x-4">
        <Link href="/" className="hover:underline">Inicio</Link>
        <Link href="/ventas" className="hover:underline">Ventas</Link>
        <Link href="/compras" className="hover:underline">Compras</Link>
        <Link href="/almacen" className="hover:underline">Almacén</Link>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Buscar"
          className="px-2 py-1 rounded text-black"
        />
        <button className="bg-white text-blue-600 px-3 py-1 rounded">Búsqueda</button>
      </div>
    </nav>
  );
}