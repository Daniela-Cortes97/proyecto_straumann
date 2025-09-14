import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PersonaNatural } from '../../types';
import { 
  validateCedula, 
  validateEmail, 
  validatePhone, 
  validateReTHUS,
  colombianCities,
  colombianDepartments,
  dentalProfessions,
  generateUserId
} from '../../utils/validation';
import { useNotifications } from '../../contexts/NotificationContext';
import BiometricModal from '../common/BiometricModal';
import { Fingerprint, Camera, Upload, User, FileText, MapPin, Briefcase } from 'lucide-react';

interface PersonaNaturalFormProps {
  onSubmit: (data: PersonaNatural) => void;
  initialData?: Partial<PersonaNatural>;
}

const validationSchema = Yup.object({
  tipoDocumento: Yup.string().required('Tipo de documento requerido'),
  numeroDocumento: Yup.string()
    .required('Número de documento requerido')
    .test('valid-cedula', 'Número de cédula inválido', function(value) {
      if (this.parent.tipoDocumento === 'cedula') {
        return validateCedula(value || '');
      }
      return true;
    }),
  nombres: Yup.string().required('Nombres requeridos'),
  apellidos: Yup.string().required('Apellidos requeridos'),
  fechaNacimiento: Yup.date()
    .required('Fecha de nacimiento requerida')
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Debe ser mayor de 18 años'),
  genero: Yup.string().required('Género requerido'),
  telefono: Yup.string()
    .required('Teléfono requerido')
    .test('valid-phone', 'Formato de teléfono inválido', validatePhone),
  email: Yup.string()
    .required('Email requerido')
    .test('valid-email', 'Email inválido', validateEmail),
  direccion: Yup.string().required('Dirección requerida'),
  ciudad: Yup.string().required('Ciudad requerida'),
  departamento: Yup.string().required('Departamento requerido'),
  profesion: Yup.string().required('Profesión requerida'),
  numeroReTHUS: Yup.string()
    .test('valid-rethus', 'Número ReTHUS inválido', function(value) {
      if (value) return validateReTHUS(value);
      return true;
    })
});

const PersonaNaturalForm: React.FC<PersonaNaturalFormProps> = ({ onSubmit, initialData }) => {
  const [biometricModalOpen, setBiometricModalOpen] = useState(false);
  const [biometricType, setBiometricType] = useState<'huella' | 'facial'>('huella');
  const [biometricData, setBiometricData] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { addNotification } = useNotifications();

  const initialValues: Partial<PersonaNatural> = {
    tipoDocumento: 'cedula',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    genero: 'masculino',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    profesion: '',
    especializacion: '',
    numeroReTHUS: '',
    ...initialData
  };

  const handleBiometricSuccess = (data: string) => {
    setBiometricData(data);
    addNotification({
      usuarioId: 'current',
      titulo: 'Validación biométrica exitosa',
      mensaje: 'Su identidad ha sido verificada correctamente',
      tipo: 'success'
    });
  };

  const openBiometricModal = (tipo: 'huella' | 'facial') => {
    setBiometricType(tipo);
    setBiometricModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    const personaData: PersonaNatural = {
      ...values,
      id: generateUserId(),
      documentos: [],
      dataBiometrica: biometricData ? {
        tipo: biometricType,
        hash: biometricData,
        validado: true,
        fechaRegistro: new Date().toISOString()
      } : undefined,
      estado: 'pendiente',
      createdAt: new Date().toISOString()
    };

    onSubmit(personaData);
  };

  const steps = [
    { title: 'Información Personal', icon: User },
    { title: 'Contacto y Ubicación', icon: MapPin },
    { title: 'Información Profesional', icon: Briefcase },
    { title: 'Validación Biométrica', icon: Fingerprint }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  isActive ? 'text-emerald-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isActive 
                      ? 'border-emerald-600 bg-emerald-50' 
                      : isCompleted 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-300 bg-gray-50'
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-12 h-0.5 mx-4 ${
                    currentStep > stepNumber ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento *
                    </label>
                    <Field
                      as="select"
                      name="tipoDocumento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="cedula">Cédula de Ciudadanía</option>
                      <option value="pasaporte">Pasaporte</option>
                    </Field>
                    <ErrorMessage name="tipoDocumento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Documento *
                    </label>
                    <Field
                      type="text"
                      name="numeroDocumento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Ingrese su número de documento"
                    />
                    <ErrorMessage name="numeroDocumento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombres *
                    </label>
                    <Field
                      type="text"
                      name="nombres"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nombres completos"
                    />
                    <ErrorMessage name="nombres" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <Field
                      type="text"
                      name="apellidos"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Apellidos completos"
                    />
                    <ErrorMessage name="apellidos" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Nacimiento *
                    </label>
                    <Field
                      type="date"
                      name="fechaNacimiento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <ErrorMessage name="fechaNacimiento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Género *
                    </label>
                    <Field
                      as="select"
                      name="genero"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </Field>
                    <ErrorMessage name="genero" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <Field
                      type="tel"
                      name="telefono"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+57 300 123 4567"
                    />
                    <ErrorMessage name="telefono" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="ejemplo@correo.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <Field
                      type="text"
                      name="direccion"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Calle 123 #45-67"
                    />
                    <ErrorMessage name="direccion" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <Field
                      as="select"
                      name="departamento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Seleccionar departamento</option>
                      {colombianDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="departamento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <Field
                      as="select"
                      name="ciudad"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Seleccionar ciudad</option>
                      {colombianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="ciudad" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profesión *
                    </label>
                    <Field
                      as="select"
                      name="profesion"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Seleccionar profesión</option>
                      {dentalProfessions.map(prof => (
                        <option key={prof} value={prof}>{prof}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="profesion" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialización
                    </label>
                    <Field
                      type="text"
                      name="especializacion"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Especificación adicional"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número ReTHUS
                    </label>
                    <Field
                      type="text"
                      name="numeroReTHUS"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="RTH123456"
                    />
                    <ErrorMessage name="numeroReTHUS" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Validación Biométrica</h3>
                
                <div className="text-center py-8">
                  {biometricData ? (
                    <div className="text-green-600">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Fingerprint className="h-8 w-8" />
                      </div>
                      <p className="font-semibold">¡Validación biométrica completada!</p>
                      <p className="text-sm text-gray-600 mt-2">Su identidad ha sido verificada</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-6">
                        Seleccione su método preferido de validación biométrica para aumentar la seguridad de su registro:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                        <button
                          type="button"
                          onClick={() => openBiometricModal('huella')}
                          className="p-6 border-2 border-emerald-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group"
                        >
                          <Fingerprint className="h-8 w-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-medium text-gray-900">Huella Digital</p>
                          <p className="text-sm text-gray-600 mt-1">Verificación por huella dactilar</p>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => openBiometricModal('facial')}
                          className="p-6 border-2 border-emerald-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors group"
                        >
                          <Camera className="h-8 w-8 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                          <p className="font-medium text-gray-900">Reconocimiento Facial</p>
                          <p className="text-sm text-gray-600 mt-1">Verificación por reconocimiento facial</p>
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-4">
                        La validación biométrica es opcional pero recomendada para mayor seguridad
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Completar Registro
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      <BiometricModal
        isOpen={biometricModalOpen}
        onClose={() => setBiometricModalOpen(false)}
        onSuccess={handleBiometricSuccess}
        tipo={biometricType}
      />
    </div>
  );
};

export default PersonaNaturalForm;