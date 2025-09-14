import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PersonaJuridica } from '../../types';
import { 
  validateNIT, 
  validateEmail, 
  validatePhone, 
  validateCedula,
  validateActivityCode,
  colombianCities,
  colombianDepartments,
  generateUserId
} from '../../utils/validation';
import { useNotifications } from '../../contexts/NotificationContext';
import BiometricModal from '../common/BiometricModal';
import { Building, User, MapPin, Briefcase, Fingerprint, Camera } from 'lucide-react';

interface PersonaJuridicaFormProps {
  onSubmit: (data: PersonaJuridica) => void;
  initialData?: Partial<PersonaJuridica>;
}

const validationSchema = Yup.object({
  razonSocial: Yup.string().required('Razón social requerida'),
  nit: Yup.string()
    .required('NIT requerido')
    .test('valid-nit', 'NIT inválido', validateNIT),
  tipoSociedad: Yup.string().required('Tipo de sociedad requerido'),
  fechaConstitucion: Yup.date()
    .required('Fecha de constitución requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  
  // Representante Legal
  'representanteLegal.nombres': Yup.string().required('Nombres del representante requeridos'),
  'representanteLegal.apellidos': Yup.string().required('Apellidos del representante requeridos'),
  'representanteLegal.tipoDocumento': Yup.string().required('Tipo de documento requerido'),
  'representanteLegal.numeroDocumento': Yup.string()
    .required('Número de documento requerido')
    .test('valid-cedula', 'Número de cédula inválido', function(value) {
      if (this.parent.tipoDocumento === 'cedula') {
        return validateCedula(value || '');
      }
      return true;
    }),
  'representanteLegal.telefono': Yup.string()
    .required('Teléfono del representante requerido')
    .test('valid-phone', 'Formato de teléfono inválido', validatePhone),
  'representanteLegal.email': Yup.string()
    .required('Email del representante requerido')
    .test('valid-email', 'Email inválido', validateEmail),

  // Contacto Empresa
  'contactoEmpresa.telefono': Yup.string()
    .required('Teléfono de la empresa requerido')
    .test('valid-phone', 'Formato de teléfono inválido', validatePhone),
  'contactoEmpresa.email': Yup.string()
    .required('Email de la empresa requerido')
    .test('valid-email', 'Email inválido', validateEmail),
  'contactoEmpresa.direccion': Yup.string().required('Dirección requerida'),
  'contactoEmpresa.ciudad': Yup.string().required('Ciudad requerida'),
  'contactoEmpresa.departamento': Yup.string().required('Departamento requerido'),

  actividadEconomica: Yup.string().required('Actividad económica requerida'),
  codigoCIIU: Yup.string()
    .required('Código CIIU requerido')
    .test('valid-ciiu', 'Código CIIU debe ser válido para actividad odontológica', validateActivityCode)
});

const PersonaJuridicaForm: React.FC<PersonaJuridicaFormProps> = ({ onSubmit, initialData }) => {
  const [biometricModalOpen, setBiometricModalOpen] = useState(false);
  const [biometricType, setBiometricType] = useState<'huella' | 'facial'>('huella');
  const [biometricData, setBiometricData] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { addNotification } = useNotifications();

  const initialValues: Partial<PersonaJuridica> = {
    razonSocial: '',
    nit: '',
    tipoSociedad: 'sas',
    fechaConstitucion: '',
    representanteLegal: {
      nombres: '',
      apellidos: '',
      tipoDocumento: 'cedula',
      numeroDocumento: '',
      telefono: '',
      email: ''
    },
    contactoEmpresa: {
      telefono: '',
      email: '',
      direccion: '',
      ciudad: '',
      departamento: ''
    },
    actividadEconomica: 'Práctica Odontológica',
    codigoCIIU: '8622',
    ...initialData
  };

  const handleBiometricSuccess = (data: string) => {
    setBiometricData(data);
    addNotification({
      usuarioId: 'current',
      titulo: 'Validación biométrica exitosa',
      mensaje: 'La identidad del representante legal ha sido verificada correctamente',
      tipo: 'success'
    });
  };

  const openBiometricModal = (tipo: 'huella' | 'facial') => {
    setBiometricType(tipo);
    setBiometricModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    const empresaData: PersonaJuridica = {
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

    onSubmit(empresaData);
  };

  const steps = [
    { title: 'Información de la Empresa', icon: Building },
    { title: 'Representante Legal', icon: User },
    { title: 'Contacto y Ubicación', icon: MapPin },
    { title: 'Actividad Económica', icon: Briefcase },
    { title: 'Validación Biométrica', icon: Fingerprint }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const stepNumber = index + 1;
            const isActive = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;
            
            return (
              <div key={stepNumber} className="flex items-center flex-shrink-0">
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
                  <span className="text-sm font-medium hidden lg:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-8 lg:w-12 h-0.5 mx-2 lg:mx-4 ${
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
        {({ values, errors, touched }) => (
          <Form className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Razón Social *
                    </label>
                    <Field
                      type="text"
                      name="razonSocial"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nombre completo de la empresa"
                    />
                    <ErrorMessage name="razonSocial" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIT *
                    </label>
                    <Field
                      type="text"
                      name="nit"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="900123456-7"
                    />
                    <ErrorMessage name="nit" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Sociedad *
                    </label>
                    <Field
                      as="select"
                      name="tipoSociedad"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="sas">SAS - Sociedad por Acciones Simplificada</option>
                      <option value="ltda">LTDA - Sociedad Limitada</option>
                      <option value="sa">SA - Sociedad Anónima</option>
                      <option value="cooperativa">Cooperativa</option>
                      <option value="fundacion">Fundación</option>
                    </Field>
                    <ErrorMessage name="tipoSociedad" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Constitución *
                    </label>
                    <Field
                      type="date"
                      name="fechaConstitucion"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <ErrorMessage name="fechaConstitucion" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Representante Legal</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombres *
                    </label>
                    <Field
                      type="text"
                      name="representanteLegal.nombres"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nombres completos"
                    />
                    <ErrorMessage name="representanteLegal.nombres" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <Field
                      type="text"
                      name="representanteLegal.apellidos"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Apellidos completos"
                    />
                    <ErrorMessage name="representanteLegal.apellidos" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento *
                    </label>
                    <Field
                      as="select"
                      name="representanteLegal.tipoDocumento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="cedula">Cédula de Ciudadanía</option>
                      <option value="pasaporte">Pasaporte</option>
                    </Field>
                    <ErrorMessage name="representanteLegal.tipoDocumento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Documento *
                    </label>
                    <Field
                      type="text"
                      name="representanteLegal.numeroDocumento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Número de documento"
                    />
                    <ErrorMessage name="representanteLegal.numeroDocumento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <Field
                      type="tel"
                      name="representanteLegal.telefono"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+57 300 123 4567"
                    />
                    <ErrorMessage name="representanteLegal.telefono" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Field
                      type="email"
                      name="representanteLegal.email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="representante@empresa.com"
                    />
                    <ErrorMessage name="representanteLegal.email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto y Ubicación de la Empresa</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono de la Empresa *
                    </label>
                    <Field
                      type="tel"
                      name="contactoEmpresa.telefono"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+57 1 234 5678"
                    />
                    <ErrorMessage name="contactoEmpresa.telefono" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de la Empresa *
                    </label>
                    <Field
                      type="email"
                      name="contactoEmpresa.email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="info@empresa.com"
                    />
                    <ErrorMessage name="contactoEmpresa.email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <Field
                      type="text"
                      name="contactoEmpresa.direccion"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Calle 123 #45-67, Oficina 304"
                    />
                    <ErrorMessage name="contactoEmpresa.direccion" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <Field
                      as="select"
                      name="contactoEmpresa.departamento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Seleccionar departamento</option>
                      {colombianDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="contactoEmpresa.departamento" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <Field
                      as="select"
                      name="contactoEmpresa.ciudad"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Seleccionar ciudad</option>
                      {colombianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="contactoEmpresa.ciudad" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Económica</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Actividad Económica Principal *
                    </label>
                    <Field
                      type="text"
                      name="actividadEconomica"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Práctica Odontológica"
                    />
                    <ErrorMessage name="actividadEconomica" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código CIIU *
                    </label>
                    <Field
                      as="select"
                      name="codigoCIIU"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="8622">8622 - Actividades de la práctica odontológica</option>
                      <option value="8621">8621 - Actividades de la práctica médica general</option>
                      <option value="8690">8690 - Otras actividades de atención de la salud humana</option>
                    </Field>
                    <ErrorMessage name="codigoCIIU" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Información sobre Códigos CIIU</h4>
                  <p className="text-sm text-blue-700">
                    Para el sector odontológico, el código CIIU principal es <strong>8622</strong> que corresponde a 
                    "Actividades de la práctica odontológica". Este código valida que su empresa está habilitada 
                    para ejercer actividades relacionadas con la odontología según la clasificación DIAN.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Validación Biométrica del Representante Legal</h3>
                
                <div className="text-center py-8">
                  {biometricData ? (
                    <div className="text-green-600">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <Fingerprint className="h-8 w-8" />
                      </div>
                      <p className="font-semibold">¡Validación biométrica completada!</p>
                      <p className="text-sm text-gray-600 mt-2">La identidad del representante legal ha sido verificada</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-6">
                        Para completar el registro de la empresa, el representante legal debe validar su identidad mediante datos biométricos:
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

              {currentStep < 5 ? (
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

export default PersonaJuridicaForm;