import React, { useState, useEffect } from 'react';
import { X, Fingerprint, Camera, CheckCircle, XCircle, Loader } from 'lucide-react';
import { BiometricService, BiometricResult } from '../../utils/biometric';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: string) => void;
  tipo: 'huella' | 'facial';
}

const BiometricModal: React.FC<BiometricModalProps> = ({ isOpen, onClose, onSuccess, tipo }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<BiometricResult | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setResult(null);
      setProgress(0);
    }
  }, [isOpen]);

  const startScan = async () => {
    setIsScanning(true);
    setResult(null);
    setProgress(0);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, tipo === 'huella' ? 200 : 300);

    try {
      let scanResult: BiometricResult;
      if (tipo === 'huella') {
        scanResult = await BiometricService.scanFingerprint();
      } else {
        scanResult = await BiometricService.scanFace();
      }

      setResult(scanResult);
      
      if (scanResult.success && scanResult.data) {
        setTimeout(() => {
          onSuccess(scanResult.data!);
          onClose();
        }, 1500);
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Error durante el escaneo. Intente nuevamente.'
      });
    } finally {
      setIsScanning(false);
      clearInterval(progressInterval);
      setProgress(100);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Validación {tipo === 'huella' ? 'de Huella' : 'Facial'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isScanning}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center">
            {tipo === 'huella' ? (
              <Fingerprint className="h-12 w-12 text-white" />
            ) : (
              <Camera className="h-12 w-12 text-white" />
            )}
          </div>

          {/* Instructions */}
          {!isScanning && !result && (
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                {tipo === 'huella'
                  ? 'Coloque su dedo en el sensor de huellas dactilares'
                  : 'Posicione su rostro frente a la cámara en un área bien iluminada'
                }
              </p>
              <button
                onClick={startScan}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Iniciar Escaneo
              </button>
            </div>
          )}

          {/* Scanning progress */}
          {isScanning && (
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Loader className="h-5 w-5 text-emerald-600 animate-spin" />
                <p className="text-gray-700">Escaneando...</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}%</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mb-6">
              {result.success ? (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-green-700 font-medium">¡Validación exitosa!</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Su identidad ha sido verificada correctamente
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-700 font-medium">Validación fallida</p>
                  <p className="text-gray-600 text-sm mt-2">{result.error}</p>
                  <button
                    onClick={startScan}
                    className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Intentar nuevamente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiometricModal;