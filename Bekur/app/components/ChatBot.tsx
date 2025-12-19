"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, X, User, Loader2, MoreVertical, Trash2, RefreshCw, HelpCircle } from "lucide-react";
import { IconMessageChatbot } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: "bot", content: data.text }]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage(e);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {openModal && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              className="fixed bottom-20 right-4 w-[92vw] max-w-96 h-[70vh] md:h-[620px]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="flex h-full flex-col rounded-xl bg-gray-900 text-white shadow-2xl ring-1 ring-black/10">
                {/* Header */}
                <header className="p-4 border-b border-gray-800 flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Bot size={15} />
                  </div>
                  <h1 className="text-lg font-bold uppercase tracking-wider flex-1">
                    Bekur Chat
                  </h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="Chat options"
                        className="p-2 rounded-md hover:bg-gray-800/80 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-44">
                      <DropdownMenuItem onClick={() => setMessages([{ role: "bot", content: "Hello! How can I help you today?" }])}>
                        <RefreshCw className="w-4 h-4" /> Reset conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMessages([])}>
                        <Trash2 className="w-4 h-4" /> Clear messages
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => window.open("/client%20side/learn", "_blank")}> 
                        <HelpCircle className="w-4 h-4" /> Help & docs
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button
                    onClick={() => setOpenModal(false)}
                    aria-label="Close chat"
                    className="ml-1 p-2 rounded-md hover:bg-gray-800/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </header>

                {/* Message Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-500" : "bg-gray-700"}`}>
                          {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
                        </div>
                        <div className={`p-2 rounded-2xl ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none text-sm" : "bg-gray-800 text-gray-200 rounded-tl-none text-sm"}`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 items-center bg-gray-800 p-3 rounded-2xl rounded-tl-none">
                        <Loader2 className="animate-spin text-blue-400" size={18} />
                        <span className="text-gray-400 text-sm">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="p-3 border-t border-gray-800 bg-gray-900">
                  <div className="relative max-w-4xl mx-auto">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your question..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-full py-2.5 px-4 pr-12 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 rounded-full disabled:opacity-50 disabled:bg-gray-700 transition-all"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
        onClick={() => setOpenModal((v) => !v)}
        aria-label={openModal ? "Close chat" : "Open chat"}
      >
        {openModal ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <IconMessageChatbot className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
