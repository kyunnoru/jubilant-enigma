// src/components/ProgressBar.tsx

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ProgressBar = ({ currentStep, totalSteps, stepTitles }: ProgressBarProps) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Step Indicators */}
      <div className="mt-6 flex justify-between items-center">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg' 
                  : isCurrent 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg scale-110' 
                    : 'bg-slate-200 text-slate-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-semibold" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                    {stepNumber}
                  </span>
                )}
              </div>
              <span className={`text-xs text-center max-w-24 leading-tight ${
                isCurrent 
                  ? 'text-slate-900 font-semibold' 
                  : isCompleted 
                    ? 'text-slate-700' 
                    : 'text-slate-500'
              }`} style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                {title}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Current Step Info */}
      <div className="mt-8 text-center">
        <p className="text-slate-600 text-lg" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
          Step <span className="font-semibold text-slate-900">{currentStep}</span> of{' '}
          <span className="font-semibold text-slate-900">{totalSteps}</span>
        </p>
        <p className="text-2xl font-light text-slate-900 mt-2" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
          {stepTitles[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;