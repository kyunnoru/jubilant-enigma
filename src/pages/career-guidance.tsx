// src/pages/career-guidance.tsx

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AppNavbar from '../components/landing/Navbar';

const CareerGuidancePage = () => {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('explore');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  // Sample career quiz questions
  const quizQuestions = [
    {
      question: "What type of work environment do you prefer?",
      options: [
        "Collaborative team environment",
        "Independent work with minimal supervision",
        "Dynamic, fast-paced environment",
        "Structured, organized environment"
      ]
    },
    {
      question: "Which activities do you find most engaging?",
      options: [
        "Problem-solving and analysis",
        "Creative projects and design",
        "Helping and mentoring others",
        "Leading and organizing teams"
      ]
    },
    {
      question: "What motivates you most in a career?",
      options: [
        "Making a positive impact on society",
        "Financial stability and growth",
        "Personal development and learning",
        "Recognition and achievement"
      ]
    },
    {
      question: "How do you prefer to work with technology?",
      options: [
        "Developing and programming",
        "Using existing tools effectively",
        "Teaching others about technology",
        "Managing technology projects"
      ]
    }
  ];

  const careerPaths = [
    {
      title:"Software Engineering",
      description: "Build applications, websites, and systems that power the digital world",
      skills: ["Programming", "Problem-solving", "Mathematics", "Logic"],
      growth: "High",
      salary: "$70k - $150k",
      icon: ""
    },
    {
      title: "Data Science",
      description: "Analyze data to extract insights and drive business decisions",
      skills: ["Statistics", "Python/R", "Machine Learning", "Communication"],
      growth: "Very High",
      salary: "$80k - $160k",
      icon: ""
    },
    {
      title: "Digital Marketing",
      description: "Create and execute marketing strategies in the digital landscape",
      skills: ["Creativity", "Analytics", "Communication", "Strategy"],
      growth: "High",
      salary: "$45k - $100k",
      icon: ""
    },
    {
      title: "Healthcare",
      description: "Provide medical care and support to improve people's health and wellbeing",
      skills: ["Empathy", "Science", "Communication", "Critical Thinking"],
      growth: "High",
      salary: "$50k - $200k",
      icon: ""
    },
    {
      title: "Business Analysis",
      description: "Bridge the gap between business needs and technology solutions",
      skills: ["Analysis", "Communication", "Strategy", "Technology"],
      growth: "Medium",
      salary: "$60k - $120k",
      icon: ""
    },
    {
      title: "UX/UI Design",
      description: "Design user-friendly interfaces and experiences for digital products",
      skills: ["Design", "Psychology", "Prototyping", "Research"],
      growth: "High",
      salary: "$55k - $130k",
      icon: ""
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - you could calculate results here
      setIsQuizStarted(false);
      setCurrentQuestion(0);
      setQuizAnswers([]);
      alert("Quiz completed! Check your personalized recommendations below.");
    }
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestion(0);
    setQuizAnswers([]);
  };

  const categories = [
    { id: 'explore', name: 'Explore Careers', icon: '🔍' },
    { id: 'quiz', name: 'Career Quiz', icon: '📝' },
    { id: 'skills', name: 'Skill Development', icon: '🚀' },
    { id: 'resources', name: 'Resources', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Guidance Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your ideal career path with personalized guidance, interactive assessments, and comprehensive resources tailored just for you.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Selected Category */}
        {selectedCategory === 'explore' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Career Paths</h2>
              <p className="text-gray-600">Discover exciting career opportunities across different industries</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((career, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{career.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Growth: </span>
                        <span className={`font-medium ${
                          career.growth === 'Very High' ? 'text-green-600' :
                          career.growth === 'High' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {career.growth}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Salary: </span>
                        <span className="font-medium text-gray-900">{career.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {!isQuizStarted ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Personality Quiz</h2>
                  <p className="text-gray-600 mb-8">
                    Discover career paths that align with your personality, interests, and strengths. 
                    This quick assessment will provide personalized recommendations based on your responses.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-blue-900 mb-2">What you'll get:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Personalized career recommendations</li>
                      <li>• Skill development suggestions</li>
                      <li>• Industry insights and trends</li>
                      <li>• Next steps for your career journey</li>
                    </ul>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-lg"
                  >
                    Start Career Quiz
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </h2>
                    <div className="bg-gray-200 rounded-full h-2 w-32">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-4 h-4 border border-gray-300 rounded-full mr-3"></div>
                          <span className="text-gray-700">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedCategory === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill Development Hub</h2>
              <p className="text-gray-600">Build the skills you need for your dream career</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Technical Skills</h3>
                </div>
                
                <div className="space-y-4">
                  {['Programming (Python, JavaScript)', 'Data Analysis', 'Digital Marketing', 'Graphic Design'].map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{skill}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Soft Skills</h3>
                </div>
                
                <div className="space-y-4">
                  {['Communication', 'Leadership', 'Problem Solving', 'Time Management'].map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{skill}</span>
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Personalized Learning Path</h3>
              <p className="text-blue-100 mb-6">
                Get a customized learning plan based on your career goals and current skill level
              </p>
              <button className="bg-white text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                Create My Learning Path
              </button>
            </div>
          </div>
        )}

        {selectedCategory === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Resources</h2>
              <p className="text-gray-600">Everything you need to advance your career journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Resume Builder",
                  description: "Create a professional resume with our AI-powered builder",
                  icon: "📄",
                  color: "blue"
                },
                {
                  title: "Interview Prep",
                  description: "Practice with mock interviews and get personalized feedback",
                  icon: "🎤",
                  color: "green"
                },
                {
                  title: "Salary Guide",
                  description: "Research salary ranges for different roles and locations",
                  icon: "💰",
                  color: "yellow"
                },
                {
                  title: "Industry Reports",
                  description: "Stay updated with the latest trends and insights",
                  icon: "📊",
                  color: "purple"
                },
                {
                  title: "Networking Tips",
                  description: "Learn how to build meaningful professional relationships",
                  icon: "🌐",
                  color: "indigo"
                },
                {
                  title: "Career Events",
                  description: "Find workshops, webinars, and career fairs near you",
                  icon: "📅",
                  color: "red"
                }
              ].map((resource, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                  <div className={`w-12 h-12 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{resource.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <button className={`text-${resource.color}-600 hover:text-${resource.color}-700 font-medium text-sm flex items-center`}>
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerGuidancePage;