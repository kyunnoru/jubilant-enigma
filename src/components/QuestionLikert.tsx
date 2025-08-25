// src/components/QuestionLikert.tsx

interface QuestionLikertProps {
  questionId: string;
  questionText: string;
  selectedValue: number | null; // Nilai yang dipilih saat ini
  onSelect: (questionId: string, value: number) => void; // Fungsi untuk memberitahu parent saat ada pilihan
}

// Definisikan pilihan kita: nilai numerik dan ukuran circle
// Nilai: 3 (sangat setuju) hingga -3 (sangat tidak setuju)
const options = [
  { value: 3, size: 'w-12 h-12 md:w-14 md:h-14' },
  { value: 2, size: 'w-10 h-10 md:w-12 md:h-12' },
  { value: 1, size: 'w-8 h-8 md:w-10 md:h-10' },
  { value: -1, size: 'w-8 h-8 md:w-10 md:h-10' },
  { value: -2, size: 'w-10 h-10 md:w-12 md:h-12' },
  { value: -3, size: 'w-12 h-12 md:w-14 md:h-14' },
];

const QuestionLikert = ({ questionId, questionText, selectedValue, onSelect }: QuestionLikertProps) => {
  return (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <h3 className="text-lg font-semibold text-gray-800 mb-5 text-center md:text-left">
        {questionText}
      </h3>
      <div className="flex items-center justify-between space-x-2">
        <span className="text-green-600 font-semibold text-sm md:text-base">Agree</span>
        
        {/* Render semua lingkaran pilihan */}
        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            const isAgreeSide = option.value >= 0;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(questionId, option.value)}
                className={`
                  rounded-full border-2 transition-all duration-200 ease-in-out transform hover:scale-110
                  ${option.size}
                  ${isSelected
                    ? (isAgreeSide ? 'bg-green-500 border-green-600' : 'bg-purple-500 border-purple-600')
                    : `bg-white ${isAgreeSide ? 'border-green-400 hover:bg-green-50' : 'border-purple-400 hover:bg-purple-50'}`
                  }
                `}
                aria-label={`Pilihan ${option.value}`}
              />
            );
          })}
        </div>
        
        <span className="text-purple-600 font-semibold text-sm md:text-base">Disagree</span>
      </div>
    </div>
  );
};

export default QuestionLikert;