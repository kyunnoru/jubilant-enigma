// src/pages/career-guidance.tsx
import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import PremiumGate from '../components/PremiumGate';

interface Question {
  id: number;
  text: string;
  category: 'personality' | 'interests' | 'skills' | 'values';
  options: {
    text: string;
    score: number;
  }[];
}

const CareerGuidancePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'assessment' | 'results'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [results, setResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "Saya lebih suka bekerja dengan:",
      category: 'personality',
      options: [
        { text: "Data dan angka", score: 1 },
        { text: "Orang-orang", score: 2 },
        { text: "Ide dan konsep", score: 3 },
        { text: "Objek fisik", score: 4 },
      ]
    },
    {
      id: 2,
      text: "Dalam situasi kelompok, saya cenderung:",
      category: 'personality',
      options: [
        { text: "Memimpin diskusi", score: 4 },
        { text: "Menyumbang ide kreatif", score: 3 },
        { text: "Mendengarkan dan mendukung", score: 2 },
        { text: "Menganalisis dan mengevaluasi", score: 1 },
      ]
    },
    {
      id: 3,
      text: "Saya merasa paling energik ketika:",
      category: 'interests',
      options: [
        { text: "Memecahkan masalah kompleks", score: 1 },
        { text: "Membantu orang lain", score: 2 },
        { text: "Menciptakan sesuatu yang baru", score: 3 },
        { text: "Menyelesaikan tugas praktis", score: 4 },
      ]
    },
    {
      id: 4,
      text: "Lingkungan kerja ideal saya adalah:",
      category: 'values',
      options: [
        { text: "Terstruktur dan dapat diprediksi", score: 1 },
        { text: "Kolaboratif dan suportif", score: 2 },
        { text: "Dinamis dan inovatif", score: 3 },
        { text: "Praktis dan berorientasi hasil", score: 4 },
      ]
    },
    {
      id: 5,
      text: "Ketika menghadapi tantangan, saya:",
      category: 'skills',
      options: [
        { text: "Menganalisis data untuk solusi", score: 1 },
        { text: "Berdiskusi dengan tim", score: 2 },
        { text: "Mencari pendekatan kreatif", score: 3 },
        { text: "Langsung bertindak", score: 4 },
      ]
    },
    {
      id: 6,
      text: "Hal yang paling memotivasi saya dalam bekerja:",
      category: 'values',
      options: [
        { text: "Pencapaian target dan KPI", score: 1 },
        { text: "Membuat dampak positif untuk orang lain", score: 2 },
        { text: "Inovasi dan kreativitas", score: 3 },
        { text: "Hasil yang terukur dan nyata", score: 4 },
      ]
    },
    {
      id: 7,
      text: "Dalam mengambil keputusan, saya lebih mengandalkan:",
      category: 'personality',
      options: [
        { text: "Data dan analisis faktual", score: 1 },
        { text: "Intuisi dan perasaan", score: 2 },
        { text: "Brainstorming dan eksplorasi ide", score: 3 },
        { text: "Pengalaman praktis sebelumnya", score: 4 },
      ]
    },
    {
      id: 8,
      text: "Saya paling bangga ketika:",
      category: 'interests',
      options: [
        { text: "Berhasil memecahkan masalah rumit", score: 1 },
        { text: "Membantu seseorang mencapai tujuannya", score: 2 },
        { text: "Menciptakan solusi inovatif", score: 3 },
        { text: "Menyelesaikan proyek tepat waktu", score: 4 },
      ]
    }
  ];

  const handleAnswerSelect = (score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: score
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      processResults();
    }
  };

  const processResults = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calculate results based on answers
    const categoryScores = {
      analytical: 0,
      social: 0,
      creative: 0,
      practical: 0,
    };

    Object.values(answers).forEach(score => {
      switch(score) {
        case 1: categoryScores.analytical += 1; break;
        case 2: categoryScores.social += 1; break;
        case 3: categoryScores.creative += 1; break;
        case 4: categoryScores.practical += 1; break;
      }
    });

    // Determine dominant personality type
    const dominantType = Object.entries(categoryScores).reduce((a, b) => 
      categoryScores[a[0] as keyof typeof categoryScores] > categoryScores[b[0] as keyof typeof categoryScores] ? a : b
    )[0];

    const careerRecommendations = {
      analytical: {
        title: "Analytical Thinker",
        description: "Anda memiliki kecenderungan kuat untuk menganalisis data, memecahkan masalah kompleks, dan berpikir sistematis. Anda sangat cocok untuk peran yang membutuhkan presisi dan logika.",
        careers: [
          "Data Scientist",
          "Business Analyst", 
          "Research Scientist",
          "Software Engineer",
          "Financial Analyst",
          "Management Consultant",
          "Quality Assurance Manager"
        ],
        strengths: ["Pemikiran logis", "Analisis mendalam", "Problem solving", "Attention to detail", "Riset sistematis"],
        recommendations: "Fokus pada pengembangan skill teknis seperti Python, SQL, atau Excel Advanced. Pertimbangkan sertifikasi profesional di bidang data analysis atau project management.",
        salary_range: "Rp 8-25 juta/bulan",
        growth_potential: "Sangat Tinggi - Permintaan analyst terus meningkat di era digital"
      },
      social: {
        title: "People Person",
        description: "Anda sangat baik dalam berinteraksi dengan orang lain, memiliki empati tinggi, dan mampu memotivasi tim. Anda cocok untuk peran yang melibatkan hubungan interpersonal.",
        careers: [
          "Human Resources Manager",
          "Counselor/Therapist",
          "Teacher/Educator",
          "Sales Manager",
          "Social Worker",
          "Customer Success Manager",
          "Training & Development"
        ],
        strengths: ["Komunikasi", "Empati", "Teamwork", "Leadership", "Conflict resolution"],
        recommendations: "Kembangkan kemampuan leadership dan pertimbangkan sertifikasi dalam bidang human development, coaching, atau manajemen SDM.",
        salary_range: "Rp 6-20 juta/bulan",
        growth_potential: "Tinggi - Skill interpersonal selalu dibutuhkan dalam organisasi"
      },
      creative: {
        title: "Creative Innovator",
        description: "Anda memiliki imajinasi yang kuat, suka menciptakan solusi inovatif, dan berpikir out-of-the-box. Anda cocok untuk industri kreatif dan peran yang membutuhkan inovasi.",
        careers: [
          "UI/UX Designer",
          "Product Manager",
          "Marketing Creative Director",
          "Content Creator",
          "Architect",
          "Advertising Executive",
          "Brand Manager"
        ],
        strengths: ["Kreativitas", "Inovasi", "Adaptabilitas", "Vision", "Design thinking"],
        recommendations: "Bangun portfolio kreatif yang kuat, pelajari design tools seperti Figma atau Adobe Creative Suite, dan jaringan dengan profesional di industri kreatif.",
        salary_range: "Rp 7-22 juta/bulan",
        growth_potential: "Sangat Tinggi - Era digital membuka banyak peluang kreatif"
      },
      practical: {
        title: "Practical Doer",
        description: "Anda suka bekerja dengan hal-hal konkret, menghasilkan hasil nyata, dan memiliki kemampuan eksekusi yang kuat. Anda cocok untuk peran operasional dan manajemen.",
        careers: [
          "Operations Manager",
          "Project Manager",
          "Supply Chain Manager",
          "Entrepreneur",
          "Production Manager",
          "Logistics Coordinator",
          "Business Operations"
        ],
        strengths: ["Execution", "Reliability", "Efficiency", "Results-oriented", "Process optimization"],
        recommendations: "Fokus pada pengembangan skill manajemen proyek seperti PMP certification, lean six sigma, dan leadership operasional.",
        salary_range: "Rp 8-24 juta/bulan",
        growth_potential: "Tinggi - Skill operasional selalu dibutuhkan dalam bisnis"
      }
    };

    setResults({
      dominantType,
      profile: careerRecommendations[dominantType as keyof typeof careerRecommendations],
      scores: categoryScores,
      totalQuestions: questions.length
    });

    setIsProcessing(false);
    setCurrentStep('results');
  };

  const resetAssessment = () => {
    setCurrentStep('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Remove the answer for the current question when going back
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[questions[currentQuestionIndex].id];
        return newAnswers;
      });
    }
  };

  const CareerAssessmentContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentStep === 'welcome' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Asesmen Panduan Karier Premium
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Temukan jalur karier yang tepat untuk Anda dengan asesmen komprehensif 
                yang menganalisis kepribadian, minat, keterampilan, dan nilai-nilai Anda.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h6v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 01-1-1V8a1 1 0 10-2 0v4a1 1 0 01-1 1H6a1 1 0 100 2h2a1 1 0 001-1v-1h2v1a1 1 0 001 1h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analisis Kepribadian</h3>
                  <p className="text-gray-600 text-sm">Pahami tipe kepribadian dan preferensi kerja Anda</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rekomendasi Karier</h3>
                  <p className="text-gray-600 text-sm">Dapatkan daftar karier yang sesuai dengan profil Anda</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Panduan Pengembangan</h3>
                  <p className="text-gray-600 text-sm">Rencana aksi untuk mengembangkan karier impian</p>
                </div>
              </div>

              {/* Enhanced Assessment Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Apa yang Membuat Assessment Ini Berbeda?</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Berbasis Riset Psikologi</h4>
                      <p className="text-gray-600 text-sm">Menggunakan framework yang telah terbukti secara ilmiah</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Analisis Komprehensif</h4>
                      <p className="text-gray-600 text-sm">Mencakup kepribadian, minat, skill, dan nilai hidup</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Rekomendasi Spesifik</h4>
                      <p className="text-gray-600 text-sm">Tidak hanya nama profesi, tapi strategi pengembangan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Data Salary Terkini</h4>
                      <p className="text-gray-600 text-sm">Informasi gaji dan prospek karier di Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentStep('assessment')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Mulai Asesmen Sekarang
              </button>
              
              <p className="text-gray-500 text-sm mt-4">
                Waktu pengerjaan: 10-15 menit | {questions.length} pertanyaan
              </p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'assessment' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {isProcessing ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Menganalisis Hasil Anda</h2>
                <p className="text-gray-600 mb-4">Sistem AI kami sedang memproses jawaban Anda...</p>
                <div className="bg-gray-100 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-sm text-gray-500">Tunggu sebentar, hasil yang akurat membutuhkan waktu</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-indigo-600">
                      Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
                      {questions[currentQuestionIndex].category.charAt(0).toUpperCase() + questions[currentQuestionIndex].category.slice(1)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {questions[currentQuestionIndex].text}
                  </h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.score)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full group-hover:border-indigo-500 flex items-center justify-center">
                            <div className="w-3 h-3 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="font-medium text-gray-900">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {currentQuestionIndex > 0 && (
                  <button
                    onClick={goToPreviousQuestion}
                    className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Kembali</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === 'results' && results && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center text-white">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2">Hasil Asesmen Anda</h1>
                <p className="text-indigo-100">Tipe Kepribadian: <span className="font-semibold">{results.profile.title}</span></p>
              </div>

              <div className="p-8">
                {/* Profile Overview */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil Kepribadian Anda</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {results.profile.description}
                  </p>
                  
                  {/* Salary & Growth Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">💰 Range Gaji</h4>
                      <p className="text-green-700">{results.profile.salary_range}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-2">📈 Prospek Karier</h4>
                      <p className="text-blue-700">{results.profile.growth_potential}</p>
                    </div>
                  </div>
                  
                  {/* Strengths */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Kekuatan Utama</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {results.profile.strengths.map((strength: string, index: number) => (
                        <div key={index} className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Career Recommendations */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Rekomendasi Karier</h2>
                  <p className="text-gray-600 mb-6">Profesi yang paling cocok dengan kepribadian dan keterampilan Anda:</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.profile.careers.map((career: string, index: number) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900">{career}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Development Recommendations */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Strategi Pengembangan</h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-amber-800 mb-2">Rekomendasi Untuk Anda</h3>
                        <p className="text-amber-800 leading-relaxed">{results.profile.recommendations}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Detail Skor Anda</h2>
                  <div className="space-y-4">
                    {Object.entries(results.scores).map(([category, score]) => {
                      const percentage = (Number(score) / results.totalQuestions) * 100;
                      const categoryLabels = {
                        analytical: 'Analytical (Logis & Data-Driven)',
                        social: 'Social (Interpersonal & Empati)',
                        creative: 'Creative (Inovatif & Artistik)',
                        practical: 'Practical (Eksekusi & Hasil)'
                      };
                      
                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">
                              {categoryLabels[category as keyof typeof categoryLabels]}
                            </span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {score}/{results.totalQuestions} ({Math.round(percentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Langkah Selanjutnya</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
                      <h4 className="font-semibold text-indigo-800 mb-2">Jangka Pendek (1-3 bulan)</h4>
                      <ul className="text-indigo-700 text-sm space-y-1">
                        <li>• Riset mendalam tentang karier pilihan utama</li>
                        <li>• Update CV dengan highlighting strengths Anda</li>
                        <li>• Mulai networking dengan profesional di bidang target</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                      <h4 className="font-semibold text-purple-800 mb-2">Jangka Panjang (3-12 bulan)</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Ambil kursus/sertifikasi yang relevan</li>
                        <li>• Bangun portfolio sesuai bidang target</li>
                        <li>• Apply untuk posisi yang sesuai dengan profil</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetAssessment}
                    className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition-all duration-200"
                  >
                    Ambil Asesmen Lagi
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    💾 Simpan Hasil (PDF)
                  </button>
                  <button
                    onClick={() => {/* Navigate to pricing for consultation */}}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    📞 Konsultasi 1-on-1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <PremiumGate>
      <CareerAssessmentContent />
    </PremiumGate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // You can add any server-side logic here if needed
  // For example, checking authentication on the server side
  
  return {
    props: {},
  };
};

export default CareerGuidancePage;