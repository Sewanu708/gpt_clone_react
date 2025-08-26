import { GrAttachment } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { LuLightbulb } from "react-icons/lu";
import gemini from '../../public/google-gemini-icon.svg'
import chatgpt from '../../public/chatgpt-icon.svg'
import cluade from '../../public/claude-ai-icon.svg'
import grok from '../../public/grok-icon.svg'

export const actions = [
    { id: 'attach', label: 'Attach', icon: GrAttachment },
    { id: 'search', label: 'Search', icon: TfiWorld },
    { id: 'reason', label: 'Reason', icon: LuLightbulb },
];

export const models = [
    {
        name: "Gemini",
        provider: "Google DeepMind",
        icon: gemini,
        key:'google'
    },
    {
        name: "ChatGPT",
        provider: "OpenAI",
        icon: chatgpt,
        key:'openai'
    },
    {
        name: "Claude",
        provider: "Anthropic",
        icon: cluade,
        key:'anthropic'
    }, {
        name: "Grok",
        provider: "X ai",
        icon: grok,
        key:'xai'
    }
];

export const aiModels = {
  openai: [
    {
      name: "GPT-5",
      description: "OpenAI's smartest, fastest, most useful model with built-in thinking",
      capabilities: ["reasoning", "text generation", "multimodal"],
      contextWindow: "1M+ tokens",
      status: "available"
    },
    {
      name: "GPT-4.5",
      description: "Enhanced model with better human collaboration and aesthetic intuition",
      capabilities: ["text generation", "reasoning", "creativity", "EQ"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "GPT-4.1",
      description: "Major improvements in coding and instruction following",
      capabilities: ["coding", "instruction following", "reasoning"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "GPT-4o",
      description: "Multimodal model optimized for chat and traditional completions",
      capabilities: ["text", "image", "audio", "multimodal"],
      contextWindow: "128k tokens",
      status: "available"
    },
    {
      name: "GPT-4o mini",
      description: "Cost-efficient small model surpassing GPT-3.5 Turbo",
      capabilities: ["text", "multimodal", "cost-efficient"],
      contextWindow: "128k tokens",
      status: "available"
    },
    {
      name: "o3",
      description: "Advanced reasoning model for complex problem solving",
      capabilities: ["advanced reasoning", "math", "coding", "science"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "o4-mini",
      description: "Smaller model optimized for fast, cost-efficient reasoning",
      capabilities: ["math", "coding", "visual tasks", "reasoning"],
      contextWindow: "128k tokens",
      status: "available"
    },
    {
      name: "GPT-4 Turbo",
      description: "Large multimodal model with high accuracy",
      capabilities: ["text", "image", "multimodal"],
      contextWindow: "128k tokens",
      status: "available"
    },
    {
      name: "GPT-3.5 Turbo",
      description: "Legacy model optimized for chat",
      capabilities: ["text generation", "chat"],
      contextWindow: "16k tokens",
      status: "legacy"
    }
  ],
  
  xai: [
    {
      name: "Grok 4",
      description: "Latest flagship model from xAI with advanced capabilities",
      capabilities: ["reasoning", "real-time data", "uncensored responses"],
      contextWindow: "1M+ tokens",
      status: "available"
    },
    {
      name: "Grok 3",
      description: "Claimed as 'Smartest AI in the world' with 10-15x more compute power",
      capabilities: ["reasoning", "real-time data", "massive compute"],
      contextWindow: "1M tokens", 
      status: "available"
    },
    {
      name: "Grok 5",
      description: "Next-generation model expected before end of 2025",
      capabilities: ["advanced reasoning", "multimodal", "real-time"],
      contextWindow: "TBD",
      status: "upcoming"
    }
  ],

  anthropic: [
    {
      name: "Claude 4 Opus",
      description: "Anthropic's most capable model for complex tasks",
      capabilities: ["reasoning", "coding", "long context", "safety"],
      contextWindow: "1M+ tokens",
      status: "available"
    },
    {
      name: "Claude 4 Sonnet", 
      description: "Balanced performance and efficiency",
      capabilities: ["general use", "coding", "analysis"],
      contextWindow: "200k tokens",
      status: "available"
    },
    {
      name: "Claude 3.7 Sonnet",
      description: "Enhanced version with improved capabilities",
      capabilities: ["reasoning", "coding", "analysis", "safety"],
      contextWindow: "200k tokens",
      status: "available"
    },
    {
      name: "Claude 3.5 Sonnet",
      description: "Advanced model with strong coding capabilities",
      capabilities: ["coding", "reasoning", "analysis"],
      contextWindow: "200k tokens",
      status: "available"
    },
    {
      name: "Claude 3 Opus",
      description: "Most intelligent model for complex tasks",
      capabilities: ["complex reasoning", "analysis", "creativity"],
      contextWindow: "200k tokens",
      status: "available"
    },
    {
      name: "Claude 3 Sonnet",
      description: "Balanced model for everyday tasks",
      capabilities: ["general use", "analysis", "writing"],
      contextWindow: "200k tokens",
      status: "available"
    },
    {
      name: "Claude 3 Haiku",
      description: "Fast and lightweight model",
      capabilities: ["quick responses", "basic tasks", "cost-efficient"],
      contextWindow: "200k tokens",
      status: "available"
    }
  ],

  google: [
    {
      name: "Gemini 3.0",
      description: "Next-generation model expected before end of 2025",
      capabilities: ["multimodal", "advanced reasoning", "integration"],
      contextWindow: "TBD",
      status: "upcoming"
    },
    {
      name: "Gemini 2.5 Pro",
      description: "Advanced multimodal model with enhanced capabilities",
      capabilities: ["multimodal", "reasoning", "code generation"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "Gemini 2.0 Pro",
      description: "Flagship model with multimodal capabilities",
      capabilities: ["text", "image", "video", "audio", "code"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "Gemini 1.5 Pro",
      description: "Enhanced model with long context understanding",
      capabilities: ["multimodal", "long context", "reasoning"],
      contextWindow: "2M tokens",
      status: "available"
    },
    {
      name: "Gemini 1.5 Flash",
      description: "Fast and efficient model for quick tasks",
      capabilities: ["multimodal", "speed", "efficiency"],
      contextWindow: "1M tokens",
      status: "available"
    },
    {
      name: "Gemini 1.0 Pro",
      description: "Original Gemini model for general use",
      capabilities: ["text", "reasoning", "general tasks"],
      contextWindow: "32k tokens",
      status: "legacy"
    }
  ]
};
