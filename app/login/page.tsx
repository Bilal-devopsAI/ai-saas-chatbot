'use client';
import { useSupabase } from '@/components/SupabaseProvider';
import { useRouter } from 'next/navigation';

export default function Login() {
  const supabase = useSupabase();
  const router = useRouter();

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <button onClick={signIn} className="px-8 py-4 bg-blue-600 rounded-xl text-xl font-bold">Login with Google → SaaS Chat</button>
    </div>
  );
}
