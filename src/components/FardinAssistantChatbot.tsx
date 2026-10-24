import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  MessageSquareText, 
  User, 
  ShieldCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { getAssistantResponse, ChatMessage } from '../utils/chatbotEngine';
import { QUICK_SUGGESTIONS } from '../data/fardinBio';

export const FardinAssistantChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `আসসালামু আলাইকুম! 👋 আমি **ফারদিনের ভার্চুয়াল অ্যাসিস্ট্যান্ট**। 

ফারদিনের কোনো নির্দিষ্ট স্কিল, ক্যারিয়ার লক্ষ্য, প্রযুক্তি বা তথ্য সম্পর্কে যা জানতে চান, সরাসরি প্রশ্ন করুন।`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Fast, responsive thinking delay
    setTimeout(() => {
      const reply = getAssistantResponse(query);
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 280);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        sender: 'assistant',
        text: `চ্যাট রিসেট করা হয়েছে। ফারদিন সম্পর্কে আপনার প্রশ্নটি লিখুন।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Minimal, Sleek Floating Launcher (Cyan/Dark Blue Theme, Zero Pink) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
        {!isOpen && (
          <button
            id="fardin-ai-assistant-launcher"
            onClick={() => setIsOpen(true)}
            aria-label="Ask Fardin's AI Assistant"
            className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#090b14]/90 hover:bg-[#0d1222] border border-[#00e5ff]/40 hover:border-[#00e5ff] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] backdrop-blur-md transition-all duration-300 active:scale-95"
          >
            {/* Robot Icon Circle (Pure Cyan & Deep Blue Glow, No Pink) */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0090FF] to-[#00e5ff] flex items-center justify-center text-[#06060c] shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              <Bot className="w-4 h-4 text-[#06060c]" />
            </div>

            <div className="flex items-center gap-1.5 pr-1">
              <span className="font-orbitron font-semibold text-xs tracking-wider text-white group-hover:text-[#00e5ff] transition-colors">
                Ask Fardin's AI
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></span>
            </div>
          </button>
        )}

        {/* Chat Window Container (Minimal Sleek Cyber Frame) */}
        {isOpen && (
          <div
            id="fardin-ai-assistant-window"
            className={`w-[92vw] sm:w-[380px] bg-[#070913]/95 backdrop-blur-2xl border border-[#00e5ff]/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden transition-all duration-300 ${
              isMinimized ? 'h-[58px]' : 'h-[500px] max-h-[80vh]'
            }`}
          >
            {/* Header: Cyan & Deep Blue Clean Tech Bar */}
            <div className="px-4 py-3 bg-[#0a0d1c] border-b border-white/[0.08] flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0090FF] to-[#00e5ff] p-[1px] shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                  <div className="w-full h-full bg-[#070913] rounded-[7px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#00e5ff]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-orbitron font-bold text-xs text-white tracking-wide">
                      FARDIN'S ASSISTANT
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono-tech text-[9px] text-[#A0A0C0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping"></span>
                    <span className="text-[#00e5ff]">Active Engine</span> &bull; To-the-Point
                  </div>
                </div>
              </div>

              {/* Minimal Window Controls */}
              <div className="flex items-center gap-1 text-gray-400">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1 hover:text-[#00e5ff] hover:bg-white/5 rounded-md transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Maximize" : "Minimize"}
                  className="p-1 hover:text-[#00e5ff] hover:bg-white/5 rounded-md transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* If NOT minimized, show messages & minimal inputs */}
            {!isMinimized && (
              <>
                {/* Message Stream */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs font-poppins scrollbar-thin scrollbar-thumb-[#00e5ff]/20">
                  {messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-6 h-6 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex-shrink-0 flex items-center justify-center text-[#00e5ff] mt-0.5">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2 relative group leading-relaxed ${
                            isUser
                              ? 'bg-gradient-to-r from-[#0090FF] to-[#00c8e6] text-[#06060c] font-medium rounded-tr-none shadow-[0_2px_10px_rgba(0,144,255,0.25)]'
                              : 'bg-white/[0.04] border border-white/[0.08] text-gray-200 rounded-tl-none'
                          }`}
                        >
                          <div className="whitespace-pre-wrap leading-relaxed font-poppins">
                            {msg.text}
                          </div>

                          <div className="mt-1 flex items-center justify-between text-[9px] opacity-60 font-mono-tech gap-3 pt-0.5">
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <button
                                onClick={() => handleCopy(msg.text, msg.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#00e5ff]"
                                title="Copy answer"
                              >
                                {copiedId === msg.id ? (
                                  <Check className="w-3 h-3 text-[#00ff88]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {isUser && (
                          <div className="w-6 h-6 rounded-md bg-[#0090FF]/20 border border-[#0090FF]/40 flex-shrink-0 flex items-center justify-center text-[#00e5ff] mt-0.5">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-[#00e5ff] font-mono-tech">
                      <div className="w-6 h-6 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-[#00e5ff]" />
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                <div className="px-2.5 py-1.5 border-t border-white/[0.06] bg-black/40 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
                  {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-[10px] font-poppins text-gray-300 hover:text-white bg-white/[0.03] hover:bg-[#00e5ff]/15 hover:border-[#00e5ff]/40 border border-white/10 px-2.5 py-1 rounded-full whitespace-nowrap transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Minimalist Chat Input */}
                <div className="p-2.5 bg-[#060811] border-t border-white/[0.08] flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="প্রশ্ন লিখুন (যেমন: সে কি React দিয়ে কাজ করে?)..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/40 transition-all font-poppins pr-7"
                    />
                    <MessageSquareText className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim()}
                    className={`p-2 rounded-xl font-medium transition-all ${
                      inputMessage.trim()
                        ? 'bg-gradient-to-r from-[#0090FF] to-[#00e5ff] text-black hover:opacity-90 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
