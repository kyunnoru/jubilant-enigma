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
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  if (type === 'user') {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
        U
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg overflow-hidden`}>
      <Image src="/logo.svg" alt="Neurvia AI" width={size === 'sm' ? 16 : size === 'md' ? 20 : 24} height={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
    </div>
  );
};

// --- Komponen Message Bubble ---
const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-end gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar type={message.sender} />
      <div className={`max-w-[75%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md' 
            : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-md'
        }`}>
          <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-slate'}`}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
        <div className="text-xs text-slate-400 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

// --- Komponen Context Bar ---
const ContextBar = ({ reportId }: { reportId: string | string[] | undefined }) => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 mb-4">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">Laporan #{reportId}</h3>
        <p className="text-xs text-slate-600">Tanya apapun tentang laporan ini</p>
      </div>
    </div>
  </div>
);

// --- Komponen Loading Dots ---
const TypingIndicator = () => (
  <div className="flex items-end gap-3 mb-4">
    <Avatar type="ai" />
    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-1">
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
        className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity"
        onClick={onClose}
      />
    )}
    
    {/* Sidebar */}
    <aside className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="Neurvia Logo" width={32} height={32} />
            <span className="text-xl font-semibold text-slate-900">Neurvia</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" x2="6" y1="6" y2="18"/>
              <line x1="6" x2="18" y1="6" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <button className="w-full text-left rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
            + Chat Baru
          </button>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Riwayat Chat</h3>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-500">Coming Soon</p>
              <p className="text-xs text-slate-400 mt-1">Fitur masih dalam pengembangan</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Link 
            href={`/neurvia/result/${reportId}`} 
            className="flex items-center gap-2 rounded-lg p-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <title>Chat with Neurvia AI - Report #{id}</title>
      </Head>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} reportId={id} />

      {/* Main Container */}
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6"/>
                <line x1="3" x2="21" y1="12" y2="12"/>
                <line x1="3" x2="21" y1="18" y2="18"/>
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <Image src="/logo.svg" alt="Neurvia Logo" width={28} height={28} />
              <h1 className="text-lg font-semibold text-slate-800">Neurvia AI</h1>
            </div>
          </div>
          <Link 
            href={`/neurvia/result/${id}`}
            className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            Lihat Laporan
          </Link>
        </header>

        {/* Chat Container */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
          
          {/* Context Bar */}
          <ContextBar reportId={id} />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-6 px-2">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Avatar type="ai" size="lg" />
                <h3 className="text-lg font-semibold text-slate-700 mt-4">Halo! 👋</h3>
                <p className="text-slate-500 mt-2">Tanya apapun tentang laporan Anda. Saya siap membantu!</p>
              </div>
            )}

            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
            {/* Attachment Indicator */}
            <div className="mb-3 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-medium text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>laporan.pdf</span>
                <button className="text-blue-500 hover:text-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" x2="6" y1="6" y2="18"/>
                    <line x1="6" x2="18" y1="6" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all max-h-32"
                  rows={1}
                  placeholder="Ketik pertanyaan Anda..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  style={{ minHeight: '44px' }}
                />
              </div>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" x2="11" y1="2" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-2 px-1">
              Tekan Enter untuk kirim, Shift+Enter untuk baris baru
            </p>
          </div>
        </main>
      </div>
    </>
  );
}