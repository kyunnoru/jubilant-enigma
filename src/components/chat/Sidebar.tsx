'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  FiMessageSquare,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiSearch,
  FiSettings,
  FiLogOut,
  FiUser,
  FiMoon,
  FiSun
} from 'react-icons/fi';

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

interface SidebarProps {
  currentConversation?: string;
  onNewConversation?: () => void;
  onSelectConversation?: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
  conversations: Conversation[];
}

export default function Sidebar({
  currentConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  conversations: propConversations
}: SidebarProps) {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>(propConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update conversations when prop changes
  useEffect(() => {
    setConversations(propConversations);
  }, [propConversations]);

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `New Conversation ${conversations.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0
    };
    setConversations([newConversation, ...conversations]);
    onNewConversation?.();
    onSelectConversation?.(newConversation.id);
  };

  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(convs => convs.filter(conv => conv.id !== id));
    onDeleteConversation?.(id);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Neurvia AI</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? <FiSun className="w-4 h-4 text-gray-600" /> : <FiMoon className="w-4 h-4 text-gray-600" />}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiSettings className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={handleNewConversation}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <>
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            <div className="space-y-1 px-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation?.(conversation.id)}
                  className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentConversation === conversation.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium truncate ${
                        currentConversation === conversation.id
                          ? 'text-blue-900'
                          : 'text-gray-900'
                      }`}>
                        {conversation.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {formatDate(conversation.updatedAt)}
                        </span>
                        <span className="text-xs text-gray-400">
                          • {conversation.messageCount} messages
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleDeleteConversation(conversation.id, e)}
                        className="p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                        <FiEdit2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session?.user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email || 'user@example.com'}
            </p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FiLogOut className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}