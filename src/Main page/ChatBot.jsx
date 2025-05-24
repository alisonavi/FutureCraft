import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';


const API_URL = 'https://g5ms0cwrjm6s.share.zrok.io/api/career/ask';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! Ask me anything about careers.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deepThink, setDeepThink] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    let messageToSend = input;
    if (!deepThink) messageToSend += ' /no_think';
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
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
      // Remove <think>...</think> and everything between
      aiText = aiText.replace(/<think>[\s\S]*?<\/think>/gi, '');
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiText }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, there was an error. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  // Typing indicator component
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
        <button className="chatbot-close-btn" onClick={() => setOpen(false)} title="Close chat">×</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0.5rem 1rem 0.5rem 1rem' }}>
        <label style={{ color: 'var(--color-gray-200)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={deepThink}
            onChange={() => setDeepThink(v => !v)}
            style={{ accentColor: '#3BB0D4', width: 18, height: 18 }}
          />
          Deep Think
        </label>
        <span style={{ marginLeft: '0.7rem', color: deepThink ? '#3BB0D4' : '#a5b4fc', fontWeight: 600, fontSize: '0.95rem' }}>
          {deepThink ? 'ON' : 'OFF'}
        </span>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.sender}`}
          >
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