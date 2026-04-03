import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import { Camera, AlertCircle, ScanFace } from 'lucide-react';
import { MASTER_FACE_DESCRIPTOR } from '../config/faceData';

interface FaceScannerProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function FaceScanner({ onSuccess, onCancel }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('Initializing AI Models...');
  const [scannedDescriptor, setScannedDescriptor] = useState<Float32Array | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const loadModelsAndStartCamera = async () => {
      try {
        console.log('Loading face-api models...');
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        ]);
        setIsModelsLoaded(true);
        setStatusText('Models loaded. Accessing camera...');
        
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to initialize face recognition');
        setIsInitializing(false);
      }
    };

    loadModelsAndStartCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    setIsInitializing(false);
    setStatusText('Camera active. Scanning for faces...');

    if (!MASTER_FACE_DESCRIPTOR) {
      setStatusText('SETUP MODE: Look at the camera to register your face.');
    }

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current || !isModelsLoaded) return;
      if (videoRef.current.paused || videoRef.current.ended) return;

      const detections = await faceapi.detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

        if (MASTER_FACE_DESCRIPTOR) {
          // Normal Authentication Mode
          const distance = faceapi.euclideanDistance(detections.descriptor, MASTER_FACE_DESCRIPTOR);
          if (distance < 0.55) {
            setStatusText('Access Granted! Welcome back.');
            if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
            setTimeout(() => onSuccess(), 1000);
          } else {
            setStatusText('Face not recognized. Access Denied.');
          }
        } else {
          // Setup Mode: we just hold the latest descriptor until they click Setup
          setStatusText('Face Detected! Ready to Capture.');
          setScannedDescriptor(detections.descriptor);
        }
      } else {
        canvasRef.current.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (MASTER_FACE_DESCRIPTOR) {
          setStatusText('Provide face for authentication...');
        } else {
          setStatusText('SETUP MODE: Looking for your face...');
        }
      }
    }, 200);
  };

  const handleSetupCapture = () => {
    if (scannedDescriptor) {
      console.log('============= COPY THE ARRAY BELOW =============');
      const arrayString = Array.from(scannedDescriptor).join(', ');
      console.log(`export const MASTER_FACE_DESCRIPTOR = new Float32Array([${arrayString}]);`);
      console.log('============= COPY THE ARRAY ABOVE =============');
      alert('Face Descriptor logged to the browser console! Open DevTools (F12) to copy it, then paste it into src/config/faceData.ts');
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn py-6">
      
      <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl w-[320px] h-[240px]">
        {isInitializing && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-20">
            <ScanFace size={48} className="text-emerald-500/50 animate-pulse mb-4" />
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 p-6 z-20">
            <AlertCircle size={48} className="text-rose-500 mb-4" />
            <p className="text-rose-400 text-sm">{error}</p>
          </div>
        )}

        <video
          ref={videoRef}
          onPlay={handleVideoPlay}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover origin-center"
          style={{ transform: 'scaleX(-1)' }} // Mirror the video for typical webcam feel
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {/* Animated scanning lines overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent h-1 w-full animate-scanline z-30"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-500 z-10 m-2"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500 z-10 m-2"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500 z-10 m-2"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-500 z-10 m-2"></div>
        </div>
      </div>

      <div className="h-8 mb-6">
        <p className={`text-sm font-medium ${statusText.includes('Granted') ? 'text-emerald-400' : statusText.includes('Denied') ? 'text-rose-400' : 'text-slate-300'}`}>
          {statusText}
        </p>
      </div>

      {!MASTER_FACE_DESCRIPTOR && (
        <button
          onClick={handleSetupCapture}
          disabled={!scannedDescriptor}
          className="mb-4 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera size={18} />
          Capture & Complete Setup
        </button>
      )}

      <button
        onClick={onCancel}
        className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl transition-all duration-300"
      >
        Cancel Scanning
      </button>

    </div>
  );
}
