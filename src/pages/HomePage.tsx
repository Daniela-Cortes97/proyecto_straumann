import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, FileText, CheckCircle, Fingerprint, Building, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Validación Biométrica',
      description: 'Seguridad avanzada con verificación de huella dactilar y reconocimiento facial',
      color: 'text-emerald-600'
    },
    {
      icon: FileText,
      title: 'Validación Automática',
      description: 'Integración con ReTHUS, DIAN y bases de datos oficiales para validación inmediata',
      color: 'text-teal-600'
    },
    {
      icon: Users,
      title: 'Gestión Completa',
      description: 'Administración de usuarios, roles y permisos con control granular',
      color: 'text-blue-600'
    },
    {
      icon: Building,
      title: 'Personas y Empresas',
      description: 'Registro diferenciado para personas naturales y jurídicas del sector dental',
      color: 'text-indigo-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Seleccionar Tipo',
      description: 'Escoge entre persona natural o jurídica según tu necesidad'
    },
    {
      number: '02',
      title: 'Completar Información',
      description: 'Ingresa tus datos profesionales y de contacto'
    },
    {
      number: '03',
      title: 'Validación Biométrica',
      description: 'Verifica tu identidad con tecnología biométrica avanzada'
    },
    {
      number: '04',
      title: 'Aprobación',
      description: 'Recibe la validación automática y comienza a operar'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Registro Profesional
              <span className="block text-emerald-600">Sector Dental</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Plataforma integral para el registro y validación de profesionales y empresas del sector odontológico 
              en Colombia, con tecnología biométrica avanzada y validaciones automáticas.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registro"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors group"
            >
              Comenzar Registro
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Ingresar al Sistema
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnología de vanguardia para un registro seguro y eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all">
                  <FeatureIcon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 rounded-2xl p-8 lg:p-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proceso de Registro
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cuatro pasos simples para completar tu registro profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-emerald-200 transform -translate-x-2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir DentalReg?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Validaciones Oficiales</h3>
                  <p className="text-gray-600">Integración directa con ReTHUS, DIAN y Cámara de Comercio para verificación automática de credenciales.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Seguridad Avanzada</h3>
                  <p className="text-gray-600">Tecnología biométrica de última generación para garantizar la autenticidad de los registros.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Proceso Simplificado</h3>
                  <p className="text-gray-600">Interfaz intuitiva que reduce el tiempo de registro y minimiza errores de captura de datos.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cumplimiento Legal</h3>
                  <p className="text-gray-600">Diseñado para cumplir con todas las normativas colombianas del sector salud y odontológico.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Fingerprint className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Validación Biométrica</h3>
                    <p className="text-teal-100">99.9% de precisión</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Datos Seguros</h3>
                    <p className="text-teal-100">Encriptación de nivel bancario</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Validación Automática</h3>
                    <p className="text-teal-100">Respuesta en tiempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white">
        <h2 className="text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Únete a los cientos de profesionales y empresas que ya confían en DentalReg para su registro profesional.
        </p>
        <Link
          to="/registro"
          className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
        >
          Iniciar Registro Ahora
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
};

export default HomePage;