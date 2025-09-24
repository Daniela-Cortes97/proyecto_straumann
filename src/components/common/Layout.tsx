import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { 
  User, 
  LogOut, 
  Bell, 
  Shield, 
  Users, 
  FileText, 
  Settings,
  Home,
  UserPlus
} from 'lucide-react';
import NotificationBell from './NotificationBell';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Registro', href: '/registro', icon: UserPlus },
    { name: 'Panel', href: '/dashboard', icon: FileText, protected: true },
    { name: 'Usuarios', href: '/usuarios', icon: Users, adminOnly: true },
    { name: 'Configuración', href: '/configuracion', icon: Settings, protected: true },
  ];

  const filteredNavigation = navigation.filter(item => {
    if (item.adminOnly && user?.rol !== 'admin') return false;
    if (item.protected && !isAuthenticated) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
            <img
              src="logo.png"
              className="mx-auto mb-2 h-40"
            />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            {/* User menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && <NotificationBell />}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.datosPersonales && 'nombres' in user.datosPersonales 
                        ? `${user.datosPersonales.nombres} ${user.datosPersonales.apellidos}`
                        : user?.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Salir</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Ingresar</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Contacto
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">soporte@dentalreg.co</p>
                <p className="text-sm text-gray-600">+57 1 234 5678</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Legal
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">Términos de uso</p>
                <p className="text-sm text-gray-600">Política de privacidad</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Integraciones
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">ReTHUS</p>
                <p className="text-sm text-gray-600">DIAN</p>
                <p className="text-sm text-gray-600">Cámara de Comercio</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 text-center">
              © 2025 DentalReg. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;