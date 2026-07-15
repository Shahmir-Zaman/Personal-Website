import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { sendMessage, resetChat } from "../lib/geminiService";
import { X, Send, RotateCcw } from "lucide-react";

const INITIAL_MESSAGE = {
    role: "bot",
    text: "Welcome! I'm Shahmir's portfolio assistant. I can help you learn about his skills, projects, experience, and availability. What would you like to know?",
};

const SUGGESTED_QUESTIONS = [
    "What are Shahmir's key projects?",
    "What tech stack does he use?",
    "Is he available for hire?",
    "How can I contact him?",
];

const ChatPanel = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 400);
        }
    }, [isOpen]);

    const handleSend = async (textToSend) => {
        const messageText = typeof textToSend === 'string' ? textToSend : input;
        const trimmed = messageText.trim();
        if (!trimmed || isTyping) return;

        // Add user message
        const userMsg = { role: "user", text: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Call Gemini
        const response = await sendMessage(trimmed);

        // Add bot response
        setMessages((prev) => [
            ...prev,
            { role: "bot", text: response.text },
        ]);
        setIsTyping(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleReset = () => {
        resetChat();
        setMessages([INITIAL_MESSAGE]);
        setInput("");
    };

    return createPortal(
        <div className={`chat-overlay ${isOpen ? "chat-open" : ""}`}>
            <div className="chat-panel">
                {/* Gradient accent line */}
                <div className="chat-gradient-bar" />

                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-left">
                        <div className="chat-header-avatar-indicator" />
                        <div>
                            <h3 className="chat-header-title">Shahmir's Assistant</h3>
                            <span className="chat-header-status">
                                {isTyping ? "Typing..." : "Online"}
                            </span>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        <button
                            onClick={handleReset}
                            className="chat-header-btn"
                            title="Reset conversation"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <button
                            onClick={onClose}
                            className="chat-header-btn"
                            title="Close chat"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}
                        >
                            {msg.role === "bot" && (
                                <div className="chat-bubble-avatar">
                                    <img src="/images/avatar-face.png" alt="Shahmir AI" className="w-full h-full object-cover rounded-full scale-125" />
                                </div>
                            )}
                            <div className="chat-bubble-content">
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {messages.length === 1 && !isTyping && (
                        <div className="flex flex-wrap gap-2 mt-4 ml-[40px]">
                            {SUGGESTED_QUESTIONS.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(q)}
                                    className="text-xs px-3 py-1.5 rounded-full border border-blue-500/30 text-blue-200 hover:bg-blue-500/10 transition-colors cursor-pointer"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="chat-bubble chat-bubble-bot">
                            <div className="chat-bubble-avatar">
                                <img src="/images/avatar-face.png" alt="Shahmir AI" className="w-full h-full object-cover rounded-full scale-125" />
                            </div>
                            <div className="chat-typing-indicator">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="chat-input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="chat-input"
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSend}
                        className={`chat-send-btn ${!input.trim() || isTyping ? "disabled" : ""}`}
                        disabled={!input.trim() || isTyping}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ChatPanel;
