// src/components/QuestionMultipleChoice.tsx

interface QuestionMultipleChoiceProps {
  questionId: number;
  questionText: string;
  options: {
    v: string;
    a: string;
    k: string;
  };
  selectedValue: 'v' | 'a' | 'k' | null; // Nilai yang dipilih saat ini (v, a, atau k)
  onSelect: (questionId: number, value: 'v' | 'a' | 'k') => void;
}

const QuestionMultipleChoice = ({
  questionId,
  questionText,
  options,
  selectedValue,
  onSelect,
}: QuestionMultipleChoiceProps) => {
  return (
    <div className="py-6 border-b border-gray-200 last:border-b-0">
      <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
        {questionText}
      </h3>
      <div className="flex flex-col space-y-3">
        {/* Tombol untuk Pilihan Visual (v) */}
        <button
          type="button"
          onClick={() => onSelect(questionId, 'v')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200
            ${selectedValue === 'v'
              ? 'bg-blue-600 border-blue-700 text-white shadow-lg'
              : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
            }
          `}
        >
          {options.v}
        </button>

        {/* Tombol untuk Pilihan Auditori (a) */}
        <button
          type="button"
          onClick={() => onSelect(questionId, 'a')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200
            ${selectedValue === 'a'
              ? 'bg-green-600 border-green-700 text-white shadow-lg'
              : 'bg-white border-gray-300 text-gray-700 hover:border-green-500 hover:bg-green-50'
            }
          `}
        >
          {options.a}
        </button>

        {/* Tombol untuk Pilihan Kinestetik (k) */}
        <button
          type="button"
          onClick={() => onSelect(questionId, 'k')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all duration-200
            ${selectedValue === 'k'
              ? 'bg-purple-600 border-purple-700 text-white shadow-lg'
              : 'bg-white border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50'
            }
          `}
        >
          {options.k}
        </button>
      </div>
    </div>
  );
};

export default QuestionMultipleChoice;