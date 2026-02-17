
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1.5 rounded-lg">
              <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Tanya Pak Penyuluh Agama KUA Kebomas</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" className="hover:text-emerald-200 transition">Konsultasi</a>
            <a href="#faq" className="hover:text-emerald-200 transition">FAQ</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2026 Tanya Penyuluh Agama Cepat. Jawaban ini dihasilkan dari kreasi AI Penyuluh Agama KUA Kebomas, Sumardiono, sebagai referensi awal. 
            Konsultasikan masalah hukum berat kepada lembaga berwenang.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
