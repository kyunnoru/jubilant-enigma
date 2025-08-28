// src/pages/chat.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AppNavbar from '../components/landing/Navbar';
import Sidebar from '../components/chat/Sidebar';
import ChatInterface from '../components/chat/ChatInterface';

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  messages?: Array<{
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }>;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatPage() {
  const { data: session, status } = {
    data: {
      user: {
        id: 'demo-user-id',
        email: 'demo@example.com',
        name: 'Demo User',
        isPremium: false
      }
    },
    status: 'authenticated' as const
  };
  const router = useRouter();
  const [currentConversation, setCurrentConversation] = useState<string>('1');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationMessages, setConversationMessages] = useState<{[key: string]: Message[]}>({});


  useEffect(() => {
    // Load conversations from localStorage (in real app, this would come from API)
    const mockConversations: Conversation[] = [
      {
        id: '1',
        title: 'Career Path Discussion',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        messageCount: 12,
        messages: [
          {
            id: '1',
            text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
            sender: 'ai',
            timestamp: new Date()
          }
        ]
      },
      {
        id: '2',
        title: 'Study Tips & Strategies',
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-14'),
        messageCount: 8,
        messages: [
          {
            id: '1',
            text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
            sender: 'ai',
            timestamp: new Date()
          }
        ]
      },
      {
        id: '3',
        title: 'Skill Development Plan',
        createdAt: new Date('2024-01-13'),
        updatedAt: new Date('2024-01-13'),
        messageCount: 15,
        messages: [
          {
            id: '1',
            text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
            sender: 'ai',
            timestamp: new Date()
          }
        ]
      }
    ];
    
    setConversations(mockConversations);
    
    // Initialize messages for each conversation
    const initialMessages: {[key: string]: Message[]} = {};
    mockConversations.forEach(conv => {
      initialMessages[conv.id] = conv.messages || [
        {
          id: '1',
          text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
          sender: 'ai',
          timestamp: new Date()
        }
      ];
    });
    setConversationMessages(initialMessages);
  }, []);

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `New Conversation ${conversations.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0
    };
    
    setConversations([newConversation, ...conversations]);
    setConversationMessages(prev => ({
      ...prev,
      [newConversation.id]: [
        {
          id: '1',
          text: "Hello! I'm your AI career advisor. I'm here to help you with any questions about your career path, academic choices, or personal development. What would you like to know?",
          sender: 'ai',
          timestamp: new Date()
        }
      ]
    }));
    
    setCurrentConversation(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    setConversationMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[id];
      return newMessages;
    });
    
    if (currentConversation === id) {
      const remainingConversations = conversations.filter(conv => conv.id !== id);
      if (remainingConversations.length > 0) {
        setCurrentConversation(remainingConversations[0].id);
      } else {
        handleNewConversation();
      }
    }
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to current conversation
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setConversationMessages(prev => ({
      ...prev,
      [currentConversation]: [...(prev[currentConversation] || []), userMessage]
    }));

    // Update conversation metadata
    setConversations(prev => prev.map(conv =>
      conv.id === currentConversation
        ? {
            ...conv,
            updatedAt: new Date(),
            messageCount: conv.messageCount + 1,
            title: conv.title === 'New Conversation'
              ? message.slice(0, 50) + (message.length > 50 ? '...' : '')
              : conv.title
          }
        : conv
    ));
  };

  const handleRegenerate = async (messageId: string) => {
    console.log('Regenerating message:', messageId);
    // This will be implemented to regenerate AI responses
  };

  const getCurrentMessages = () => {
    return conversationMessages[currentConversation] || [];
  };

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === currentConversation);
  };



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

      <div className="min-h-screen bg-gray-50">
        {/* Use the main AppNavbar */}
        <AppNavbar />

        {/* Main Chat Layout */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <Sidebar
            currentConversation={currentConversation}
            onNewConversation={handleNewConversation}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            conversations={conversations}
          />

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            <ChatInterface
              conversationId={currentConversation}
              messages={getCurrentMessages()}
              conversationTitle={getCurrentConversation()?.title || 'New Chat'}
              onSendMessage={handleSendMessage}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </div>
    </>
  );
}