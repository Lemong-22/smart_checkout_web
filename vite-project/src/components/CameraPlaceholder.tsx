import { Camera, Loader2 } from 'lucide-react';

interface CameraPlaceholderProps {
  isLoading?: boolean;
}

export const CameraPlaceholder = ({ isLoading = false }: CameraPlaceholderProps) => {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      
      <div className="relative z-10 text-center text-gray-400">
        {isLoading ? (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" />
            <p className="text-lg font-medium">Initializing Camera...</p>
            <p className="text-sm mt-2">Loading AI Model</p>
          </>
        ) : (
          <>
            <Camera className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-medium">Camera Feed</p>
            <p className="text-sm mt-2">Place product in front of camera</p>
          </>
        )}
      </div>

      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span>LIVE</span>
      </div>
    </div>
  );
};
