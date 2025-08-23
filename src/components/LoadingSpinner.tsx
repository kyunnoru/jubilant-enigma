// src/components/LoadingSpinner.tsx

interface LoadingSpinnerProps {
  title: string;
  message: string;
}

const LoadingSpinner = ({ title, message }: LoadingSpinnerProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center p-4">
      
      {
        
      }
      <div className="h-20 w-20 mb-6 border-8 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600 max-w-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;