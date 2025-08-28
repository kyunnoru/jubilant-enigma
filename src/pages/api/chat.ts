// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatRequest {
  conversation_id?: string;
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface ChatResponse {
  conversation_id: string;
  message: ChatMessage;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// OpenRouter API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Available models
const AVAILABLE_MODELS = [
  'openai/gpt-4-turbo-preview',
  'anthropic/claude-3-haiku',
  'google/gemini-pro',
  'meta-llama/llama-2-70b-chat',
  'openai/gpt-3.5-turbo'
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      conversation_id,
      messages,
      model = 'openai/gpt-4-turbo-preview',
      temperature = 0.7,
      max_tokens = 1000
    } = req.body as ChatRequest;

    // Validate request
    if (!messages || messages.length === 0) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    if (!OPENROUTER_API_KEY) {
      console.error('OpenRouter API key not configured');
      return res.status(500).json({ message: 'AI service not configured' });
    }

    // Validate model
    if (!AVAILABLE_MODELS.includes(model)) {
      return res.status(400).json({
        message: `Invalid model. Available models: ${AVAILABLE_MODELS.join(', ')}`
      });
    }

    // Prepare messages for OpenRouter API
    const openrouterMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system prompt for career advisor
    const systemPrompt = {
      role: 'system' as const,
      content: `You are Neurvia, an AI career advisor specializing in helping students and professionals with career guidance, academic choices, and personal development. You provide thoughtful, evidence-based advice tailored to individual circumstances.

Your expertise includes:
- Career path exploration and planning
- Academic guidance and study strategies
- Skill development and career transitions
- Industry insights and job market trends
- Personal development and goal setting

Always be:
- Empathetic and encouraging
- Specific and actionable in your advice
- Culturally aware and inclusive
- Professional yet approachable
- Focused on long-term success and fulfillment

If you don't have specific information about a particular field or industry, be honest about your limitations and suggest ways the user can find more information.`
    };

    const finalMessages = [systemPrompt, ...openrouterMessages];

    // Call OpenRouter API
    const response = await axios.post(OPENROUTER_API_URL, {
      model,
      messages: finalMessages,
      temperature,
      max_tokens,
      stream: false
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://neurvia.com',
        'X-Title': 'Neurvia AI Career Advisor'
      }
    });

    const aiResponse = response.data;
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: aiResponse.choices[0].message.content,
      timestamp: new Date()
    };

    // Log usage for analytics
    if (aiResponse.usage) {
      console.log('OpenRouter API usage:', {
        model,
        prompt_tokens: aiResponse.usage.prompt_tokens,
        completion_tokens: aiResponse.usage.completion_tokens,
        total_tokens: aiResponse.usage.total_tokens,
        conversation_id
      });
    }

    return res.status(200).json({
      conversation_id: conversation_id || Date.now().toString(),
      message: assistantMessage,
      usage: aiResponse.usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('OpenRouter API error:', error.response?.data);
      return res.status(500).json({
        message: 'Failed to get AI response. Please try again later.'
      });
    }
    
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}


