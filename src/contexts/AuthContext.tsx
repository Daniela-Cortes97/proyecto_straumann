import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, UserRole, UserType } from '../types';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular verificación de sesión existente
    const savedUser = localStorage.getItem('dental_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular login - en producción esto sería una llamada real a la API
    if (email && password) {
      const mockUser: Usuario = {
        id: '1',
        email,
        rol: 'cliente',
        activo: true,
        tipoUsuario: 'natural',
        datosPersonales: {
          id: '1',
          tipoDocumento: 'cedula',
          numeroDocumento: '12345678',
          nombres: 'Juan',
          apellidos: 'Pérez',
          fechaNacimiento: '1990-01-01',
          genero: 'masculino',
          telefono: '+57 300 123 4567',
          email,
          direccion: 'Calle 123 #45-67',
          ciudad: 'Bogotá',
          departamento: 'Cundinamarca',
          profesion: 'Odontólogo',
          especializacion: 'Ortodoncia',
          numeroReTHUS: 'RTH123456',
          documentos: [],
          estado: 'pendiente',
          createdAt: new Date().toISOString()
        }
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('dental_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dental_user');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.rol === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};