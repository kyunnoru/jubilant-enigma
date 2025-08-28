'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiCopy, ThumbsUp, ThumbsDown, FiRefreshCw } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  conversationId?: string;
  messages: Message[];
  conversationTitle?: string;
  onSendMessage?: (message: string) => void;
  onRegenerate?: (messageId: string) => void;
}

export default function ChatInterface({ 
  conversationId, 
  messages: propMessages,
  conversationTitle = 'New Chat',
  onSendMessage, 
  onRegenerate 
}: ChatInterfaceProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update messages when prop changes
  useEffect(() => {
    setMessages(propMessages);
  }, [propMessages]);

  const [messages, setMessages] = useState<Message[]>(propMessages);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessageToAPI = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          messages: [
            ...messages.map(msg => ({
              role: msg.sender,
              content: msg.text
            })),
            {
              role: 'user',
              content: message
            }
          ],
          model: 'openai/gpt-4-turbo-preview',
          temperature: 0.7,
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get AI response');
      }

      const data = await response.json();
      return data.message;
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to get AI response');
      throw err;
    }
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
    setError(null);
    onSendMessage?.(inputText);

    try {
      const aiResponse = await sendMessageToAPI(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.content,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      // Keep the user message but show error
      console.error('Failed to get AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (messageId: string) => {
    const aiMessageIndex = messages.findIndex(msg => msg.id === messageId);
    if (aiMessageIndex === -1) return;

    const aiMessage = messages[aiMessageIndex];
    const userMessageBefore = messages[aiMessageIndex - 1];
    
    if (!userMessageBefore || userMessageBefore.sender !== 'user') return;

    // Remove the AI message to regenerate
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    setIsLoading(true);
    setError(null);
    onRegenerate?.(messageId);

    try {
      const aiResponse = await sendMessageToAPI(userMessageBefore.text);
      
      const newAiMessage: Message = {
        id: Date.now().toString(),
        text: aiResponse.content,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMessage]);
    } catch (err) {
      console.error('Failed to regenerate AI response:', err);
      // Add back the original message if regeneration fails
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{conversationTitle}</h3>
            <p className="text-xs text-green-600 flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Online</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FiRefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  {message.sender === 'ai' && (
                    <div className="flex items-center space-x-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(message.text)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy"
                      >
                        <FiCopy className="w-3 h-3" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => handleRegenerate(message.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Regenerate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message AI Career Advisor..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </div>
        </form>
        
        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "What career paths align with my personality?",
            "How can I improve my study habits?",
            "What skills should I develop for my dream job?",
            "How do I choose between multiple interests?"
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}