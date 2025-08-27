// src/pages/neurvia/chat/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

type ChatMessage = { sender: 'user' | 'ai'; text: string; timestamp: number };

// --- Komponen Avatar ---
const Avatar = ({ type, size = 'md' }: { type: 'user' | 'ai'; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-lg'
  };

  if (type === 'user') {
    return (
      <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-semibold shadow-sm border border-slate-200`}>
        U
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-sm border border-slate-200`}>
      N
    </div>
  );
};

// --- Komponen Message Bubble ---
const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-start gap-4 mb-8 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0">
        <Avatar type={message.sender} />
      </div>
      <div className={`max-w-[75%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-6 py-4 ${
          isUser 
            ? 'bg-slate-900 text-white shadow-lg' 
            : 'bg-white text-slate-800 shadow-sm border border-slate-100'
        }`}>
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-slate'} prose-p:leading-relaxed`}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
        <div className={`text-xs text-slate-400 mt-2 px-2 ${isUser ? 'text-right' : ''}`}>
          {new Date(message.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

// --- Komponen Context Bar ---
const ContextBar = ({ reportId }: { reportId: string | string[] | undefined }) => (
  <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4 mb-8">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
        N
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Laporan #{reportId}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">Tanya apapun tentang laporan psikometrik dan rekomendasi karir Anda</p>
      </div>
    </div>
  </div>
);

// --- Komponen Loading Dots ---
const TypingIndicator = () => (
  <div className="flex items-start gap-4 mb-8">
    <div className="flex-shrink-0">
      <Avatar type="ai" />
    </div>
    <div className="bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
);

// --- Komponen Sidebar ---
const Sidebar = ({ isOpen, onClose, reportId }: { isOpen: boolean; onClose: () => void; reportId: string | string[] | undefined }) => (
  <>
    {/* Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-slate-900 bg-opacity-20 z-40 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />
    )}
    
    {/* Sidebar */}
    <aside className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-xl font-semibold text-slate-900">Neurvia</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" x2="6" y1="6" y2="18"/>
              <line x1="6" x2="18" y1="6" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <button className="w-full text-left rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 text-sm font-semibold text-white hover:from-slate-900 hover:to-slate-800 transition-all shadow-lg">
            + Chat Baru
          </button>
          
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Riwayat Chat</h3>
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
              <div className="text-slate-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" x2="12" y1="8" y2="16"/>
                  <line x1="8" x2="16" y1="12" y2="12"/>
                </svg>
              </div>
              <p className="text-sm text-slate-600 font-medium">Coming Soon</p>
              <p className="text-xs text-slate-500 mt-1">Fitur masih dalam pengembangan</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100">
          <Link 
            href={`/neurvia/result/${reportId}`} 
            className="flex items-center gap-3 rounded-xl p-4 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/>
              <path d="m12 19-7-7 7-7"/>
            </svg>
            Kembali ke Laporan
          </Link>
        </div>
      </div>
    </aside>
  </>
);

// --- Halaman Chat Utama ---
export default function ChatPage() {
  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = async () => {
    if (!inputValue.trim() || !id) return;
    
    const userMessage: ChatMessage = { 
      sender: 'user', 
      text: inputValue.trim(), 
      timestamp: Date.now() 
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('/api/chat', {
        report_id: id,
        conversation_history: messages.concat(userMessage),
        current_question: userMessage.text,
      });
      
      const aiMessage: ChatMessage = { 
        sender: 'ai', 
        text: data.ai_response, 
        timestamp: Date.now() 
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e: any) {
      const aiMessage: ChatMessage = { 
        sender: 'ai', 
        text: 'Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.', 
        timestamp: Date.now() 
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Head>
        <title>Chat dengan Neurvia AI - Report #{id}</title>
        <meta name="description" content="Tanya apapun tentang laporan psikometrik Anda dengan Neurvia AI" />
      </Head>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} reportId={id} />

      {/* Main Container */}
      <div className="min-h-screen bg-white flex flex-col">
        
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <line x1="3" x2="21" y1="12" y2="12"/>
                  <line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-7 w-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  N
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Neurvia AI</h1>
                  <p className="text-xs text-slate-500">Asisten Karir Cerdas</p>
                </div>
              </div>
            </div>
            <Link 
              href={`/neurvia/result/${id}`}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Lihat Laporan
            </Link>
          </div>
        </header>

        {/* Chat Container */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
          
          {/* Context Bar */}
          <ContextBar reportId={id} />

          {/* Messages Area */}
          <div className="flex-1 mb-8">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="mb-6">
                  <Avatar type="ai" size="lg" />
                </div>
                <h3 className="text-2xl font-light text-slate-700 mb-2">
                  Halo! <span className="font-semibold">Selamat datang</span> 👋
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-md mx-auto">
                  Saya siap membantu Anda memahami hasil psikometrik dan memberikan wawasan karir yang personal.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    'Jelaskan hasil tes kepribadian saya',
                    'Apa karir yang cocok untuk saya?',
                    'Bagaimana cara mengembangkan keterampilan?',
                    'Analisis kekuatan dan kelemahan saya'
                  ].map((suggestion, index) => (
                    <button 
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 transition-colors text-sm text-slate-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            {/* Attachment Indicator */}
            <div className="mb-4 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>laporan-psikometrik.pdf</span>
                <button className="text-slate-500 hover:text-slate-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" x2="6" y1="6" y2="18"/>
                    <line x1="6" x2="18" y1="6" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div className="relative flex items-end gap-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all max-h-32 leading-relaxed"
                  rows={1}
                  placeholder="Tanyakan apapun tentang laporan Anda..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  style={{ minHeight: '52px' }}
                />
              </div>
              <button
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 text-white transition-all hover:from-slate-900 hover:to-slate-800 hover:shadow-lg disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed shadow-sm"
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" x2="11" y1="2" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 px-1">
              Tekan <span className="font-medium">Enter</span> untuk kirim, <span className="font-medium">Shift+Enter</span> untuk baris baru
            </p>
          </div>
        </main>
      </div>
    </>
  );
}