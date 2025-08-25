// src/components/SubProgressBar.tsx

interface SubProgressBarProps {
  currentPart: number;
  totalParts: number;
  partTitle: string;
}

const SubProgressBar = ({ currentPart, totalParts, partTitle }: SubProgressBarProps) => {
  const percentage = (currentPart / totalParts) * 100;

  return (
    <div className="w-full bg-slate-100 p-3 rounded-lg mb-8 border border-slate-200">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-slate-700" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
          Bagian {currentPart} dari {totalParts}: {partTitle}
        </span>
        <span className="text-sm font-semibold text-slate-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SubProgressBar;