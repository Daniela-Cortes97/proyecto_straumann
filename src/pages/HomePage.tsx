import React from 'react';
import { Link } from 'react-router-dom';
import { Building, User, ArrowRight, CheckCircle, Globe, Award, Users } from 'lucide-react';
const HomePage: React.FC = () => {
  // Opciones de vinculación
  const vinculaciones = [
    {
      icon: User,
      title: 'Vinculación Profesional',
      description: 'Únete como profesional dental y accede a los beneficios exclusivos de la red Straumann.',
      color: 'text-emerald-600',
      to: '/registro/natural', // Redirige al formulario de persona natural
      label: 'Vincularme como Profesional'
    },
    {
      icon: Building,
      title: 'Vinculación Empresarial',
      description: 'Registra tu clínica o empresa y forma parte del ecosistema Straumann en Colombia.',
      color: 'text-emerald-600',
      to: '/registro/juridica', // Redirige al formulario de persona jurídica
      label: 'Vincular mi Empresa'
    }
  ];
  // Beneficios y valores de Straumann
  const straumannFeatures = [
    {
      icon: Award,
      title: 'Innovación y Calidad',
      description: 'Acceso a productos y soluciones líderes en implantología y odontología digital.',
      color: 'text-emerald-600'
    },
    {
      icon: Globe,
      title: 'Red Global',
      description: 'Forma parte de una comunidad internacional de excelencia clínica y científica.',
      color: 'text-emerald-600'
    },
    {
      icon: Users,
      title: 'Capacitación Continua',
      description: 'Participa en programas de formación, talleres y eventos exclusivos para miembros.',
      color: 'text-emerald-600'
    },
    {
      icon: CheckCircle,
      title: 'Soporte Integral',
      description: 'Acompañamiento personalizado y acceso a recursos de soporte técnico y científico.',
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      background="implante.jpg"
      <section className="text-center py-20 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <img
              src="logo.png"
              alt="Straumann Logo"
              className="mx-auto mb-8 h-60"
            />
            <h1 className="text-4xl font-bold text-emerald-700 mb-2 tracking-wide uppercase">
              Grupo Straumann
            </h1>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Vincúlate al Grupo Straumann
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Forma parte de la red líder mundial en soluciones dentales, innovación y educación continua.
              Elige tu tipo de vinculación y accede a todos los beneficios que Straumann tiene para ti.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {vinculaciones.map((v, idx) => {
              const Icon = v.icon;
              return (
                <Link
                  to={v.to}
                  key={idx}
                  className="group bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-emerald-500 flex flex-col items-center"
                >
                  <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-emerald-100 group-hover:bg-emerald-500 transition-colors`}>
                    <Icon className={`h-8 w-8 ${v.color} group-hover:text-white transition-colors`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 mb-4">{v.description}</p>
                  <span className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    {v.label}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beneficios Straumann */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué vincularte a Straumann?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre los beneficios y oportunidades exclusivas para miembros de nuestra red.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {straumannFeatures.map((feature, index) => {
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

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white">
        <h2 className="text-4xl font-bold mb-4">¿Listo para ser parte de Straumann?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Únete a la comunidad Straumann y accede a innovación, formación y soporte de clase mundial.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            to="/registro/natural"
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
          >
            Vincularme como Profesional
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/registro/juridica"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
          >
            Vincular mi Empresa
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;