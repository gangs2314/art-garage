import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';
import { faqData, getCategoryEmoji } from '../data/faqData';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey! 👋 Welcome to Art Garage. I'm here to answer your questions about our tattoo studio, booking, designs, and more. What can I help you with?",
      timestamp: new Date(),
      suggestions: ['Booking', 'Aftercare', 'Design', 'Studio', 'Artists']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (query) => {
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    faqData.forEach(faq => {
      let score = 0;
      const titleMatch = faq.question.toLowerCase().split(' ').filter(word => lowerQuery.includes(word)).length;
      score += titleMatch * 10;

      faq.keywords.forEach(keyword => {
        if (lowerQuery.includes(keyword)) score += 5;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    });

    return bestScore > 0 ? bestMatch : null;
  };

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const match = findBestMatch(messageText);

      let botMessage;
      if (match) {
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: match.answer,
          timestamp: new Date(),
          category: match.category,
          emoji: getCategoryEmoji(match.category)
        };
      } else {
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: "I'm not quite sure about that. Could you ask about booking, aftercare, design styles, our studio location, or our artists? Feel free to contact us directly at +91 7795875799 or via WhatsApp!",
          timestamp: new Date(),
          suggestions: ['Booking', 'Aftercare', 'Design', 'Studio', 'Artists', 'Contact Us']
        };
      }

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleSuggestion = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleCategoryClick = (category) => {
    const categoryFaqs = faqData.filter(faq => faq.category === category);
    if (categoryFaqs.length > 0) {
      handleSendMessage(`Show me FAQs about ${category}`);
    }
  };

  return (
    <>
      {/* Chat Bubble Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 transition-all duration-300 ${
          isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'
        } ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-bloodRed rounded-full animate-pulse opacity-30"></div>
          <div className={`w-${isMobile ? '14' : '16'} h-${isMobile ? '14' : '16'} bg-bloodRed hover:bg-bloodRed/90 rounded-full flex items-center justify-center text-bone shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}>
            <MessageCircle className={`w-${isMobile ? '6' : '7'} h-${isMobile ? '6' : '7'}`} />
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${
            isMobile
              ? 'bottom-0 right-0 left-0 top-0 rounded-none md:bottom-8 md:right-8 md:left-auto md:top-auto md:w-96 md:h-[600px]'
              : 'bottom-8 right-8 w-96 h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-ink to-bloodRed text-bone p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg">Art Garage Chat</h3>
              <p className="text-xs text-bone/80">We typically reply instantly</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-bone/20 p-2 rounded transition-colors duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-bone/30"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {message.type === 'bot' ? (
                  <div className="flex gap-2 max-w-xs">
                    <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-bone font-bold">AG</span>
                    </div>
                    <div className="bg-ink/10 border border-ink/20 rounded-lg p-3 rounded-tl-none">
                      {message.emoji && <div className="text-2xl mb-2">{message.emoji}</div>}
                      <p className="text-sm text-ink leading-relaxed">{message.text}</p>
                      <p className="text-xs text-warmGray mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-bloodRed text-bone rounded-lg p-3 max-w-xs rounded-br-none">
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-bone/80 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-bone font-bold">AG</span>
                  </div>
                  <div className="bg-ink/10 border border-ink/20 rounded-lg p-3 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-warmGray rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-warmGray rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-warmGray rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages[messages.length - 1]?.suggestions && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-warmGray font-semibold uppercase tracking-wider">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="px-3 py-2 bg-bloodRed/10 border border-bloodRed/30 text-bloodRed text-xs font-semibold rounded hover:bg-bloodRed/20 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-ink/10 p-4 bg-white rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-ink/20 rounded text-sm focus:outline-none focus:border-bloodRed transition-colors duration-200"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-bloodRed hover:bg-bloodRed/90 disabled:opacity-50 text-bone p-2 rounded transition-colors duration-200"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-warmGray mt-2 text-center">
              For complex questions, contact us directly at +91 7795875799
            </p>
          </div>
        </div>
      )}

      {/* Backdrop for mobile fullscreen */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 1.4s infinite;
        }
      `}</style>
    </>
  );
}
