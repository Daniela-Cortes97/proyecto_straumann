import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="logo.png"
          alt="Straumann Logo"
          className="h-10 w-auto"
        />
        <span className="text-emerald-700 font-bold text-xl uppercase tracking-wide">
          Grupo Straumann
        </span>
      </div>
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className={`text-gray-700 font-medium hover:text-emerald-600 transition-colors ${
            location.pathname === '/' ? 'underline' : ''
          }`}
        >
          Inicio
        </Link>
        <Link
          to="/registro"
          className={`text-gray-700 font-medium hover:text-emerald-600 transition-colors ${
            location.pathname.startsWith('/registro') ? 'underline' : ''
          }`}
        >
          Registro
        </Link>
        <Link
          to="/login"
          className={`text-gray-700 font-medium hover:text-emerald-600 transition-colors ${
            location.pathname === '/login' ? 'underline' : ''
          }`}
        >
          Ingresar
        </Link>
      </nav>
    </header>
  );
};

export default Header;