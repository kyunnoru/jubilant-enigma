// src/components/ChoiceCard.tsx

interface ChoiceCardProps {
    questionId: string;
    questionText: string;
    options: { value: number; label: string }[];
    selectedValue: number | null;
    onSelect: (questionId: string, value: number) => void;
  }
  
  const ChoiceCard = ({ questionId, questionText, options, selectedValue, onSelect }: ChoiceCardProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <p className="text-lg font-medium text-gray-800 mb-4">{questionText}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(questionId, option.value)}
              className={`flex-1 p-3 rounded-lg border-2 text-center font-semibold transition-all duration-150
                ${selectedValue === option.value
                  ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default ChoiceCard;