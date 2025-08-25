// src/pages/assessments.tsx

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AppNavbar from '../components/landing/Navbar';

const AssessmentsPage = () => {
  const { data: session } = useSession();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [completedAssessments, setCompletedAssessments] = useState<string[]>(['personality']);

  // Sample assessment data
  const assessments = [
    {
      id: 'personality',
      title: 'Personality Type Assessment',
      description: 'Discover your personality type and how it influences your career preferences',
      duration: '15 mins',
      questions: 20,
      type: 'Psychology',
      icon: '🧠',
      color: 'blue',
      difficulty: 'Easy',
      completed: true
    },
    {
      id: 'skills',
      title: 'Skills Assessment',
      description: 'Evaluate your current skill set and identify areas for improvement',
      duration: '25 mins',
      questions: 35,
      type: 'Skills',
      icon: '⚡',
      color: 'green',
      difficulty: 'Medium',
      completed: false
    },
    {
      id: 'aptitude',
      title: 'Cognitive Aptitude Test',
      description: 'Measure your logical reasoning, numerical, and verbal abilities',
      duration: '45 mins',
      questions: 50,
      type: 'Aptitude',
      icon: '🎯',
      color: 'purple',
      difficulty: 'Hard',
      completed: false
    },
    {
      id: 'values',
      title: 'Work Values Assessment',
      description: 'Identify what matters most to you in your work environment and culture',
      duration: '20 mins',
      questions: 25,
      type: 'Values',
      icon: '💎',
      color: 'yellow',
      difficulty: 'Easy',
      completed: false
    },
    {
      id: 'emotional',
      title: 'Emotional Intelligence Assessment',
      description: 'Assess your ability to understand and manage emotions in professional settings',
      duration: '30 mins',
      questions: 40,
      type: 'EQ',
      icon: '❤️',
      color: 'red',
      difficulty: 'Medium',
      completed: false
    },
    {
      id: 'leadership',
      title: 'Leadership Style Assessment',
      description: 'Discover your natural leadership approach and development opportunities',
      duration: '20 mins',
      questions: 30,
      type: 'Leadership',
      icon: '👑',
      color: 'indigo',
      difficulty: 'Medium',
      completed: false
    }
  ];

  // Sample questions for personality assessment
  const personalityQuestions = [
    {
      question: "In social situations, do you prefer to:",
      options: [
        "Be the center of attention and lead conversations",
        "Contribute when you have something valuable to say",
        "Listen more than you speak",
        "Engage in deep one-on-one conversations"
      ],
      type: "social"
    },
    {
      question: "When making decisions, you tend to:",
      options: [
        "Go with your gut feeling",
        "Analyze all available data thoroughly",
        "Seek input from others",
        "Consider long-term implications"
      ],
      type: "decision"
    },
    {
      question: "Your ideal work environment is:",
      options: [
        "Dynamic and constantly changing",
        "Structured with clear expectations",
        "Collaborative and team-oriented",
        "Flexible with autonomy"
      ],
      type: "environment"
    },
    {
      question: "When facing challenges, you:",
      options: [
        "Tackle them head-on immediately",
        "Break them down into smaller parts",
        "Seek advice from mentors or colleagues",
        "Take time to reflect before acting"
      ],
      type: "problem-solving"
    },
    {
      question: "You are most motivated by:",
      options: [
        "Recognition and achievements",
        "Personal growth and learning",
        "Making a positive impact",
        "Financial rewards and stability"
      ],
      type: "motivation"
    }
  ];

  const startAssessment = (assessmentId: string) => {
    setActiveAssessment(assessmentId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment completed
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    setShowResults(true);
    if (activeAssessment && !completedAssessments.includes(activeAssessment)) {
      setCompletedAssessments([...completedAssessments, activeAssessment]);
    }
  };

  const closeAssessment = () => {
    setActiveAssessment(null);
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const getResultsContent = () => {
    // This would normally be calculated based on actual answers
    return {
      type: "The Innovator",
      description: "You are creative, adaptable, and thrive in dynamic environments. You enjoy solving complex problems and bringing new ideas to life.",
      strengths: ["Creative problem-solving", "Adaptability", "Innovation", "Independent thinking"],
      recommendations: [
        "Consider careers in technology, design, or entrepreneurship",
        "Look for roles that offer variety and creative challenges",
        "Seek environments that encourage experimentation",
        "Develop your project management skills"
      ],
      careerMatches: ["Software Engineer", "Product Manager", "UX Designer", "Entrepreneur"]
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  if (activeAssessment && !showResults) {
    const assessment = assessments.find(a => a.id === activeAssessment);
    return (
      <div className="min-h-screen bg-gray-50">
        <AppNavbar />
        
        <div className="max-w-4xl mx-auto py-8 px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{assessment?.title}</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {personalityQuestions.length}</p>
              </div>
              <button
                onClick={closeAssessment}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / personalityQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {personalityQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {personalityQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-4 group-hover:border-blue-500">
                        <div className="w-full h-full rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} / {personalityQuestions.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = getResultsContent();
    return (
      <div className="min-h-screen bg-gray-50">
        <AppNavbar />
        
        <div className="max-w-4xl mx-auto py-8 px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
              <p className="text-gray-600">Here are your personalized results</p>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* Personality Type */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{results.type}</h2>
                <p className="text-blue-700">{results.description}</p>
              </div>

              {/* Strengths */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Key Strengths</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {results.strengths.map((strength, index) => (
                    <div key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Matches */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Career Matches</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {results.careerMatches.map((career, index) => (
                    <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                      {career}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                Save Results
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                Share Results
              </button>
              <button 
                onClick={closeAssessment}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Back to Assessments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Assessments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your strengths, preferences, and potential with our comprehensive suite of career assessments. 
            Get personalized insights to guide your career journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{completedAssessments.length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{assessments.length - completedAssessments.length}</div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {completedAssessments.length > 0 ? Math.round((completedAssessments.length / assessments.length) * 100) : 0}%
            </div>
            <div className="text-gray-600">Progress</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {assessments.reduce((total, assessment) => {
                return total + parseInt(assessment.duration.split(' ')[0]);
              }, 0)}
            </div>
            <div className="text-gray-600">Total Minutes</div>
          </div>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => (
            <div key={assessment.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative">
              {/* Completion Badge */}
              {completedAssessments.includes(assessment.id) && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${getColorClasses(assessment.color)}`}>
                  <span className="text-2xl">{assessment.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{assessment.type}</span>
                    <span>•</span>
                    <span>{assessment.duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{assessment.description}</p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📝 {assessment.questions} questions</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                  {assessment.difficulty}
                </div>
              </div>

              <button
                onClick={() => startAssessment(assessment.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  completedAssessments.includes(assessment.id)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {completedAssessments.includes(assessment.id) ? 'Retake Assessment' : 'Start Assessment'}
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Your Career Profile</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take all assessments to get a comprehensive understanding of your career potential and receive personalized recommendations.
          </p>
          <button className="bg-white text-blue-600 py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
            View My Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsPage;