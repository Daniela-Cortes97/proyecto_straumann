export const colombianCities = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 
  'Bucaramanga', 'Pereira', 'Ibagué', 'Santa Marta', 'Villavicencio',
  'Manizales', 'Neiva', 'Pasto', 'Armenia'
];

export const colombianDepartments = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
  'Vaupés', 'Vichada'
];

export const dentalProfessions = [
  'Odontólogo General',
  'Ortodoncista',
  'Endodoncista',
  'Periodoncista',
  'Cirujano Oral y Maxilofacial',
  'Odontopediatra',
  'Prostodoncista',
  'Patólogo Oral',
  'Radiología Oral',
  'Implantólogo'
];

export const validateCedula = (cedula: string): boolean => {
  if (!cedula || cedula.length < 7 || cedula.length > 10) return false;
  return /^\d+$/.test(cedula);
};

export const validateNIT = (nit: string): boolean => {
  if (!nit || nit.length !== 11) return false;

  const nitNumbers = nit.replace(/\D/g, '');
  if (nitNumbers.length !== 9) return false;

  // Algoritmo de validación del dígito verificador del NIT
  const weights = [3, 7, 13, 17, 19, 23, 29, 37, 41];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(nitNumbers[i]) * weights[i];
  }

  const remainder = sum % 11;
  const verificationDigit = remainder > 1 ? 11 - remainder : remainder;

  return verificationDigit.toString() === nit.slice(-1);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?57\s?[3][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateReTHUS = (rethus: string): boolean => {
  // Formato básico para número ReTHUS (esto debería validarse contra la base de datos oficial)
  return /^RTH\d{6,8}$/i.test(rethus);
};

export const validateActivityCode = (code: string): boolean => {
  // Código CIIU 8622 corresponde a práctica odontológica
  const dentalCodes = ['8622', '8621', '8690'];
  return dentalCodes.includes(code);
};

export const generateUserId = (): string => {
  return 'USR_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};