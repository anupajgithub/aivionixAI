import { useState } from 'react';
import { MessageSquare, Send, Sparkles, Code, FileText, Zap } from 'lucide-react';
import { mockChatMessages } from '../../data/mockData';
import { aiService } from '../../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await aiService.chat(newMessages, input);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please check your API key and try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { icon: Code, label: 'Generate Code', color: 'from-cyan-500 to-blue-500' },
    { icon: FileText, label: 'Explain Concept', color: 'from-emerald-500 to-teal-500' },
    { icon: Zap, label: 'Debug Error', color: 'from-amber-500 to-orange-500' },
    { icon: Sparkles, label: 'Optimize Code', color: 'from-violet-500 to-purple-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
          <MessageSquare className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Assistant</h1>
          <p className="text-slate-400">Your intelligent coding companion</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`bg-gradient-to-r ${action.color} rounded-xl p-4 text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 overflow-y-auto mb-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-gradient-to-br from-violet-500 to-purple-500'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-500'
              }`}
            >
              {message.role === 'assistant' ? (
                <Sparkles className="text-white" size={20} />
              ) : (
                <MessageSquare className="text-white" size={20} />
              )}
            </div>
            <div className="flex-1">
              <div
                className={`rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white ml-auto max-w-2xl'
                    : 'bg-slate-700/50 text-slate-100 max-w-3xl'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              <p className="text-slate-500 text-xs mt-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-violet-500 to-purple-500">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="bg-slate-700/50 rounded-2xl p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your code..."
            className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
