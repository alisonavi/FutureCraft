import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const API_URL = 'https://api.future-craft.ru/api/career/ask';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! Ask me anything about careers.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deepThink, setDeepThink] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    let messageToSend = input;
    if (!deepThink) messageToSend += ' /no_think';

    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'skip_zrok_interstitial': 'true',
        },
        body: JSON.stringify({ message: messageToSend })
      });

      const data = await response.json();
      let aiText =
        data?.data?.npc_response ||
        data?.npc_response ||
        data?.message ||
        "Sorry, something went wrong. Please try again later.";

      // strip out any <think> blocks, then trim whitespace/newlines
      aiText = aiText
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .trim();

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Sorry, there was an error. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = e => {
    if (e.key === 'Enter' && !loading) sendMessage();
  };

  const TypingIndicator = () => (
    <div className="chatbot-message ai typing-indicator">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );

  if (!open) {
    return (
      <button
        className="chatbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <span role="img" aria-label="Chat">💬</span>
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        Career AI Chat
        <button
          className="chatbot-close-btn"
          onClick={() => setOpen(false)}
          title="Close chat">
          ×
        </button>
      </div>

      <div
        className="deep-think-control-wrapper"
      >
        <label
          className="deep-think-label"
        >
          <input
            type="checkbox"
            checked={deepThink}
            onChange={() => setDeepThink(v => !v)}
            className="deep-think-checkbox"
          />
          <span className="deep-think-slider"></span>
          <span className="deep-think-text">Deep Think</span>
        </label>
        <span
          className={`deep-think-status ${deepThink ? 'on' : 'off'}`}
        >
          {deepThink ? 'ON' : 'OFF'}
        </span>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-row">
        <input
          className="chatbot-input"
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={loading}
        />
        <button
          className="chatbot-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
