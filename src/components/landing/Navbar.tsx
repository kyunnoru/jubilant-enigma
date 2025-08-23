// src/components/AppNavbar.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const AppNavbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image 
            src="/logo.svg" // Pastikan file logo.svg ada di folder /public
            alt="Neurvia Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold text-slate-900">
            Neurvia
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-slate-700">
            Welcome, {session?.user?.name || 'User'}
          </span>
          {/* Di masa depan, Anda bisa menambahkan tombol Logout di sini */}
        </div>

      </div>
    </nav>
  );
};

export default AppNavbar;