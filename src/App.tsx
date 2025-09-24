import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import RegistroPage from './pages/RegistroPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/registro/:tipo" element={<RegistroPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Usuarios</h1>
                      <p className="text-gray-600">Módulo disponible próximamente</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/configuracion"
                element={
                  <ProtectedRoute>
                    <div className="text-center py-20">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h1>
                      <p className="text-gray-600">Panel de configuración disponible próximamente</p>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;