import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, ArrowLeft } from 'lucide-react';
import { UserType, PersonaNatural, PersonaJuridica } from '../types';
import PersonaNaturalForm from '../components/forms/PersonaNaturalForm';
import PersonaJuridicaForm from '../components/forms/PersonaJuridicaForm';
import { useNotifications } from '../contexts/NotificationContext';

const RegistroPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handlePersonaNaturalSubmit = (data: PersonaNatural) => {
    console.log('Persona Natural registered:', data);
    
    addNotification({
      usuarioId: 'current',
      titulo: '¡Registro exitoso!',
      mensaje: `${data.nombres} ${data.apellidos}, tu registro ha sido completado y está en proceso de validación.`,
      tipo: 'success'
    });

    // Simular guardado y redirección
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handlePersonaJuridicaSubmit = (data: PersonaJuridica) => {
    console.log('Persona Jurídica registered:', data);
    
    addNotification({
      usuarioId: 'current',
      titulo: '¡Registro empresarial exitoso!',
      mensaje: `${data.razonSocial} ha sido registrada exitosamente y está en proceso de validación.`,
      tipo: 'success'
    });

    // Simular guardado y redirección
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const resetUserType = () => {
    setUserType(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!userType ? (
        <div className="text-center space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Registro Profesional Dental
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selecciona el tipo de registro que necesitas para comenzar el proceso de validación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Persona Natural */}
            <div className="group cursor-pointer" onClick={() => setUserType('natural')}>
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-emerald-500">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                    <User className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Persona Natural</h3>
                  <p className="text-gray-600 mb-6">
                    Registro individual para profesionales de la odontología
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Profesionales independientes
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Validación con ReTHUS
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Verificación biométrica personal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Jurídica */}
            <div className="group cursor-pointer" onClick={() => setUserType('juridica')}>
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-teal-500">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                    <Building className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Persona Jurídica</h3>
                  <p className="text-gray-600 mb-6">
                    Registro para empresas y entidades del sector dental
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Clínicas y centros odontológicos
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Validación RUT con actividad 8622
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Verificación del representante legal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-blue-900 mb-2">Información Importante</h4>
            <p className="text-sm text-blue-700">
              Ambos tipos de registro incluyen validación biométrica y verificación automática con bases de datos oficiales. 
              El proceso completo toma aproximadamente 10-15 minutos y recibirás notificaciones sobre el estado de tu solicitud.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* Header con opción de volver */}
          <div className="mb-8">
            <button
              onClick={resetUserType}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver a selección de tipo
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Registro - {userType === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}
              </h1>
              <p className="text-gray-600">
                {userType === 'natural' 
                  ? 'Complete la información para su registro profesional individual'
                  : 'Complete la información para el registro de su empresa o entidad'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          {userType === 'natural' ? (
            <PersonaNaturalForm onSubmit={handlePersonaNaturalSubmit} />
          ) : (
            <PersonaJuridicaForm onSubmit={handlePersonaJuridicaSubmit} />
          )}
        </div>
      )}
    </div>
  );
};

export default RegistroPage;