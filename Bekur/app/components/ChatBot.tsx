"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconMessageChatbot } from '@tabler/icons-react';


type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: "👋 Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: "Thanks for your message! We'll get back to you soon." },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };


  return (
    <div className="p-4 fixed bottom-5 z-50 right-2 w-full md:w-96">
      <Card className={"max-w-3xl mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md flex flex-col h-[70vh]"} style={{ display: openModal ? 'flex' : 'none' }}>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-xl font-semibold"> <Bot className="inline w-6 h-6 mr-2" /> AI Chatbot Assistant</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 p-0">
          <ScrollArea className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm",
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 p-4">
            <Input
              placeholder="Ask me anything..."
              className="flex-1 dark:bg-gray-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
              <span className="hidden md:block">Send</span>  <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center ml-auto mt-4 cursor-pointer shadow-lg" onClick={() => setOpenModal(!openModal)}>
        {openModal ? <X className="w-6 h-6 text-white m-auto" /> : <IconMessageChatbot className="w-6 h-6 text-white m-auto" />}
      </div>
      
    </div>
  );
}
