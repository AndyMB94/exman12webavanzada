import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'CRUD Farmacia',
  description: 'Proyecto con Next.js y Prisma',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
