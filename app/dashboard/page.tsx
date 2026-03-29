'use client';
import { useSupabase } from '@/components/SupabaseProvider';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const supabase = useSupabase();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('chats').select('*').order('created_at', { ascending: false }).then(({ data }) => setChats(data || []));
  }, []);

  const newChat = async () => {
    const { data } = await supabase.from('chats').insert({ title: 'New Chat' }).select().single();
    window.location.href = `/chat/${data.id}`;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Your AI SaaS Chats 🔥</h1>
      <button onClick={newChat} className="mb-8 px-6 py-3 bg-emerald-500 text-black font-bold rounded-2xl">+ New Chat</button>
      <div className="grid gap-4">
        {chats.map(chat => (
          <Link key={chat.id} href={`/chat/${chat.id}`} className="block p-6 bg-zinc-900 hover:bg-zinc-800 rounded-3xl">
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
