'use client';
import { useChat } from 'ai/react';
import { useSupabase } from '@/components/SupabaseProvider';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

export default function ChatPage() {
  const { id } = useParams();
  const supabase = useSupabase();

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    id: id as string,
    initialMessages: [],
    onFinish: async (message) => {
      // save to Supabase
      await supabase.from('messages').insert([
        { chat_id: id, role: 'user', content: input },
        { chat_id: id, role: 'assistant', content: message.content }
      ]);
    }
  });

  useEffect(() => {
    // load history
    supabase.from('messages').select('*').eq('chat_id', id).order('created_at').then(({ data }) => {
      // you can set initial messages if wanted
    });
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col bg-zinc-950 text-white">
      <div className="p-6 border-b flex items-center gap-3">
        <Bot className="w-8 h-8" />
        <h1 className="font-black text-2xl">Grok-Powered SaaS Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl ${m.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t flex gap-3">
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-zinc-900 border-0 rounded-3xl px-6 py-5 text-lg focus:outline-none"
          placeholder="Ask Grok anything... (SaaS users only)"
        />
        <button type="submit" disabled={isLoading} className="px-8 bg-white text-black rounded-3xl font-bold flex items-center gap-2">
          <Send className="w-5 h-5" /> Send
        </button>
      </form>
    </div>
  );
}
