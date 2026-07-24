"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { initialChatMessages, ChatMessage } from "@/data/dummyData";

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    "Summarize Section 4 requirements",
    "Identify high-risk legal clauses",
    "Check ISO certification SLA",
    "Draft bid compliance response",
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate AI Streaming response
    const fullAiResponse = `I have analyzed your query regarding "${query}". Based on the uploaded tender document, here are the key extracted insights:

1. **Compliance Verification**: All standard security & operational clauses match internal capabilities.
2. **Action Item**: We recommend confirming Section 8 indemnity terms prior to final submission.
3. **Draft Proposal Note**: You can automatically copy this response into your tender bid draft.`;

    setTimeout(() => {
      const aiMsgId = `ai-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        sender: "ai",
        text: "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Stream character by character
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullAiResponse.length) {
          const charChunk = fullAiResponse.slice(0, index + 1);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId ? { ...msg, text: charChunk } : msg
            )
          );
          index++;
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
            )
          );
          clearInterval(interval);
        }
      }, 15);
    }, 800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="flex flex-col h-[650px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <span>BidReady AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">
              Active Context: <span className="text-blue-400 font-mono">Smart_City_Infrastructure_RFP.pdf</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(initialChatMessages)}
          className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
        >
          Reset Chat
        </button>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-md"
                  : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1 opacity-70">
                <span className="font-semibold uppercase tracking-wider">
                  {msg.sender === "user" ? "You" : "BidReady AI"}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <div className="whitespace-pre-line">{msg.text}</div>
              {msg.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse" />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl px-4 py-3 text-xs flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
              <span>Analyzing tender clauses...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="bg-slate-950 px-6 py-2 border-t border-slate-800/80 overflow-x-auto flex items-center space-x-2">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex-shrink-0">
          Suggested:
        </span>
        {promptSuggestions.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 text-xs px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-full transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="bg-slate-950 p-4 border-t border-slate-800 flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about tender clauses, compliance risks, or draft proposal sections..."
          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-md disabled:opacity-50 transition-all flex items-center space-x-1"
        >
          <span>Send</span>
          <span>⚡</span>
        </button>
      </form>
    </div>
  );
}
