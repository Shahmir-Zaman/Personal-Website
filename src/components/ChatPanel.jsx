import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { sendMessage, resetChat } from "../lib/geminiService";
import { X, Send, RotateCcw } from "lucide-react";
import Markdown from "react-markdown";

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

const renderMessageContent = (text, handleSend, onClose) => {
    if (!text) return null;

    // 1. Extract buttons from the text
    const buttonRegex = /\[BUTTON:\s*(.*?)\]/g;
    const buttons = [];
    let match;
    while ((match = buttonRegex.exec(text)) !== null) {
        buttons.push(match[1]);
    }

    // 2. Strip button tags from the text
    const cleanText = text.replace(buttonRegex, '').trim();

    return (
        <div className="chat-content-rich">
            <Markdown>{cleanText}</Markdown>
            {buttons.length > 0 && (
                <div className="chat-action-buttons">
                    {buttons.map((btnLabel, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                if (btnLabel.toLowerCase() === "contact me") {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    onClose();
                                } else {
                                    handleSend(btnLabel);
                                }
                            }}
                            className="chat-action-btn"
                        >
                            {btnLabel}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

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

    // Focus the input on open; Escape closes; focus returns to whatever opened
    // the panel (the avatar widget), so keyboard users are not dropped at the top.
    useEffect(() => {
        if (!isOpen) return;
        const opener = document.activeElement;
        const focusTimer = setTimeout(() => inputRef.current?.focus(), 400);
        const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            clearTimeout(focusTimer);
            window.removeEventListener("keydown", onKeyDown);
            if (opener instanceof HTMLElement && opener !== document.body) opener.focus();
        };
    }, [isOpen, onClose]);

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
        <div
            className={`chat-overlay ${isOpen ? "chat-open" : ""}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="chat-panel" role="dialog" aria-modal="true" aria-label="Chat with Shahmir's assistant" inert={!isOpen}>
                {/* Gradient accent line */}
                <div className="chat-gradient-bar" />

                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-left">
                        <div className={`chat-header-avatar-indicator ${isTyping ? "is-typing" : ""}`} />
                        <div>
                            <h3 className="chat-header-title text-base font-semibold">Shahmir's Assistant</h3>
                            {/* "Online" is filler — the panel being open says that.
                                The line now carries something a visitor can act on. */}
                            <span className="chat-header-status text-xs font-medium">
                                {isTyping ? "Writing…" : "Ask about his work"}
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
                            <div className="chat-bubble-content">
                                {renderMessageContent(msg.text, handleSend, onClose)}
                            </div>
                        </div>
                    ))}

                    {messages.length === 1 && !isTyping && (
                        <div className="flex flex-wrap gap-2 mt-4">
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
                        maxLength={2000}
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
