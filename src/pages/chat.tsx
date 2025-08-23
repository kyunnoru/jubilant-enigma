// src/pages/chat.tsx

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Based on your profile, I'd recommend considering fields that align with your interests and strengths. Have you thought about exploring related career paths?",
      "I understand your concern. Many students face similar challenges when choosing their academic path. Let me help you break this down into manageable steps.",
      "Excellent insight! Your background shows strong potential in this area. I'd suggest looking into programs that build on your existing skills while expanding your knowledge base.",
      "That's a common dilemma in career planning. The key is to balance your passions with practical considerations. What aspects of this field most excite you?",
      "I'm glad you're thinking about this strategically. Your career journey should align with both your personal values and professional goals. What matters most to you in a career?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Chat with AI - Neurvia</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
          `}
        </style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Navigation */}
        <nav className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-semibold text-slate-900" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                  Neurvia
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-700" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                Welcome, {session.user?.name || 'User'}
              </span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Chat with Your
              <br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                AI Career Advisor
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Get personalized guidance on your career path, academic choices, and personal development. Ask anything!
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                    AI Career Advisor
                  </h3>
                  <p className="text-blue-100 text-sm" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
                    Online • Ready to help
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                    style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-slate-200 p-6">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 text-center" style={{ fontFamily: 'Red Hat Display, sans-serif' }}>
              Quick Questions to Get Started
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "What career paths align with my personality type?",
                "How can I improve my study habits?",
                "What skills should I develop for my dream job?",
                "How do I choose between multiple interests?"
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(question)}
                  className="p-4 text-left bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors duration-200 border border-slate-200"
                  style={{ fontFamily: 'Red Hat Display, sans-serif' }}
                >
                  <p className="text-slate-700 text-sm">{question}</p>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
