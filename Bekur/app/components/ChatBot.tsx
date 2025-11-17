// app/page.js
'use client';

import { useState } from 'react';

export default function ChatApp() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Ask the GPT-OSS model a question...');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setOutput('Thinking...');
    setIsLoading(true);

    try {
      // 1. Call your Next.js API Route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        // 2. Display the response from the LLM
        setOutput(data.response);
        setInput('');
      }
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
      setOutput('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-red-400 w-96 h-96 p-4 flex flex-col absolute top-1/2 left-50 transform -translate-x-1/2 -translate-y-1/2'>
      <h1>GPT-OSS Chat</h1>
      <div >
        {output}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
      
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px 20px' }}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}