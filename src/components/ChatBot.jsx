import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { faqData, getCategoryEmoji } from '../data/faqData';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Welcome to Art Garage. How can we help you?",
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
        // Check if it's a location query and add maps/phone links
        if (match.category === 'Studio' && match.question.toLowerCase().includes('where')) {
          botMessage = {
            id: Date.now() + 1,
            type: 'bot',
            text: `${match.answer}\n\n📍 <a href="https://maps.google.com/?q=Art+Garage+Tattoo+Studio+Rajajinagar+Bangalore" target="_blank" rel="noopener noreferrer" style="color: #8C1F1F; text-decoration: underline;">Open Google Maps</a>\n\n📞 <a href="tel:+917795875799" style="color: #8C1F1F; text-decoration: underline;">+91 7795875799</a>`,
            timestamp: new Date(),
            category: match.category,
            emoji: getCategoryEmoji(match.category),
            hasLinks: true
          };
        } else {
          botMessage = {
            id: Date.now() + 1,
            type: 'bot',
            text: match.answer,
            timestamp: new Date(),
            category: match.category,
            emoji: getCategoryEmoji(match.category)
          };
        }
      } else {
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: "I'm not quite sure about that. Feel free to contact us directly:\n\n📞 <a href=\"tel:+917795875799\" style=\"color: #8C1F1F; text-decoration: underline;\">+91 7795875799</a>\n\n💬 <a href=\"https://wa.me/917795875799\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #8C1F1F; text-decoration: underline;\">WhatsApp</a>",
          timestamp: new Date(),
          suggestions: ['Booking', 'Aftercare', 'Design', 'Studio', 'Artists'],
          hasLinks: true
        };
      }

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleSuggestion = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Bubble Button - Positioned above Instagram */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-40 transition-all duration-300 ${
          isMobile ? 'bottom-24 right-3' : 'bottom-24 right-6'
        } ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 pointer-events-auto'}`}
        aria-label="Open chat"
      >
        <div className="relative group">
          {/* Pulsing effect */}
          <div className="absolute inset-0 bg-sky-300/30 rounded-full animate-pulse"></div>

          {/* Main button - Sky blue with white messenger icon */}
          <div className="relative w-14 h-14 bg-sky-300 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer border border-sky-200">
            {/* Messenger/Chat icon */}
            <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-40 bg-bone border border-ink/15 rounded-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
            isMobile
              ? 'bottom-0 left-0 right-0 top-0 rounded-none'
              : 'bottom-28 right-6 w-96 h-[600px] max-h-screen'
          }`}
        >
          {/* Header - Luxury minimalist */}
          <div className="bg-gradient-to-r from-ink via-ink to-bloodRed text-bone p-4 flex items-center justify-between border-b border-bloodRed/20">
            <div>
              <h3 className="font-serif font-bold text-base tracking-tight">Chat</h3>
              <p className="text-xs text-bone/75 font-sans uppercase tracking-widest mt-0.5">Support</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-bloodRed/30 p-2 rounded-full transition-all duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-bone"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {message.type === 'bot' ? (
                  <div className="flex gap-2.5 max-w-xs">
                    <div className="w-7 h-7 bg-sky-300 rounded-full flex items-center justify-center flex-shrink-0 border border-sky-200">
                      <span className="text-xs text-white font-serif font-bold">A</span>
                    </div>
                    <div className="bg-white border border-ink/10 rounded-lg p-3 rounded-tl-none shadow-sm">
                      {message.emoji && <div className="text-xl mb-2">{message.emoji}</div>}
                      <p className="text-sm text-ink leading-relaxed font-sans">
                        {message.hasLinks ? (
                          <div dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br/>') }} />
                        ) : (
                          message.text
                        )}
                      </p>
                      <p className="text-xs text-warmGray mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-ink text-bone rounded-lg p-3 max-w-xs rounded-br-none shadow-sm border border-ink/50">
                    <p className="text-sm font-sans">{message.text}</p>
                    <p className="text-xs text-bone/70 mt-1.5">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 bg-sky-300 rounded-full flex items-center justify-center flex-shrink-0 border border-sky-200">
                    <span className="text-xs text-white font-serif font-bold">A</span>
                  </div>
                  <div className="bg-white border border-ink/10 rounded-lg p-3 rounded-tl-none shadow-sm">
                    <div className="flex gap-1.5">
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
              <div className="space-y-2.5 mt-4 pt-2 border-t border-ink/10">
                <p className="text-xs text-warmGray font-semibold uppercase tracking-wider font-sans">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="px-3 py-1.5 bg-bone border border-ink/15 text-ink text-xs font-semibold rounded hover:bg-ink/5 transition-all duration-200 font-sans uppercase tracking-wider"
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
          <div className="border-t border-ink/10 p-3 bg-bone">
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
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 border border-ink/15 rounded text-sm focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-200 transition-all duration-200 bg-white font-sans"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-sky-300 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-all duration-200 hover:shadow-lg"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Backdrop for mobile fullscreen */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
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
