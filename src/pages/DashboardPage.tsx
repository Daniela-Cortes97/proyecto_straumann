import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Settings,
  Download,
  Upload,
  Shield,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando información del usuario...</p>
      </div>
    );
  }

  const isPersonaNatural = user.tipoUsuario === 'natural';
  const userData = user.datosPersonales;

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'validado': return 'text-green-600 bg-green-100';
      case 'rechazado': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'validado': return CheckCircle;
      case 'rechazado': return AlertCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(userData.estado);

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: FileText },
    { id: 'documents', name: 'Documentos', icon: Upload },
    { id: 'biometric', name: 'Biométrica', icon: Shield },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isPersonaNatural ? 'bg-emerald-100' : 'bg-teal-100'
            }`}>
              {isPersonaNatural ? (
                <User className={`h-8 w-8 ${isPersonaNatural ? 'text-emerald-600' : 'text-teal-600'}`} />
              ) : (
                <Building className={`h-8 w-8 ${isPersonaNatural ? 'text-emerald-600' : 'text-teal-600'}`} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isPersonaNatural && 'nombres' in userData
                  ? `${userData.nombres} ${userData.apellidos}`
                  : userData.razonsocial
                }
              </h1>
              <p className="text-gray-600">
                {isPersonaNatural
                  ? `ID: ${user.id} • ${userData.profesion}`
                  : `NIT: ${userData.nit} • ${userData.tipoSociedad?.toUpperCase()}`
                }
              </p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(userData.estado)}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium capitalize">{userData.estado}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Documentos</p>
                      <p className="text-2xl font-semibold text-blue-900">
                        {userData.documentos?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Biométrica</p>
                      <p className="text-2xl font-semibold text-green-900">
                        {userData.dataBiometrica ? 'Activa' : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Registro</p>
                      <p className="text-2xl font-semibold text-purple-900">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
                  {isPersonaNatural && 'telefono' in userData ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{userData.telefono}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{userData.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">
                          {userData.direccion}, {userData.ciudad}, {userData.departamento}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{userData.contactoEmpresa?.telefono}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{userData.contactoEmpresa?.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">
                          {userData.contactoEmpresa?.direccion}, {userData.contactoEmpresa?.ciudad}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isPersonaNatural ? 'Información Profesional' : 'Información Empresarial'}
                  </h3>
                  
                  {isPersonaNatural && 'profesion' in userData ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Profesión</p>
                        <p className="font-medium text-gray-900">{userData.profesion}</p>
                      </div>
                      {userData.especializacion && (
                        <div>
                          <p className="text-sm text-gray-500">Especialización</p>
                          <p className="font-medium text-gray-900">{userData.especializacion}</p>
                        </div>
                      )}
                      {userData.numeroReTHUS && (
                        <div>
                          <p className="text-sm text-gray-500">Número ReTHUS</p>
                          <p className="font-medium text-gray-900">{userData.numeroReTHUS}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Actividad Económica</p>
                        <p className="font-medium text-gray-900">{userData.actividadEconomica}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Código CIIU</p>
                        <p className="font-medium text-gray-900">{userData.codigoCIIU}</p>
                      </div>
                      {'representanteLegal' in userData && (
                        <div>
                          <p className="text-sm text-gray-500">Representante Legal</p>
                          <p className="font-medium text-gray-900">
                            {userData.representanteLegal.nombres} {userData.representanteLegal.apellidos}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Documentos</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Subir Documento</span>
                </button>
              </div>
              
              {userData.documentos?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.documentos.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">{doc.tipo}</h4>
                        {doc.validado ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{doc.nombre}</p>
                      <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-sm">
                        <Download className="h-4 w-4" />
                        <span>Descargar</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay documentos</h3>
                  <p className="text-gray-600 mb-6">Suba sus documentos para completar el proceso de validación</p>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors mx-auto">
                    <Upload className="h-4 w-4" />
                    <span>Subir Primer Documento</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'biometric' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Validación Biométrica</h3>
              
              {userData.dataBiometrica ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-green-900">Validación Activa</h4>
                      <p className="text-green-700">
                        Su identidad biométrica ha sido verificada exitosamente mediante {userData.dataBiometrica.tipo}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Verificado el {new Date(userData.dataBiometrica.fechaRegistro).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-yellow-900">Validación Pendiente</h4>
                      <p className="text-yellow-700 mb-4">
                        Complete su validación biométrica para aumentar la seguridad de su cuenta
                      </p>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Activar Validación Biométrica
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Configuración de Cuenta</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Notificaciones</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notificaciones por email</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notificaciones SMS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50" />
                      <span className="ml-2 text-sm text-gray-700">Notificaciones push</span>
                    </label>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Seguridad</h4>
                  <div className="space-y-3">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Cambiar contraseña
                    </button>
                    <br />
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      Configurar autenticación de dos factores
                    </button>
                    <br />
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Desactivar cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;