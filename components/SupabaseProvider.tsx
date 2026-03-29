'use client';
import { createClient } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

const SupabaseContext = createContext<any>(null);

export function SupabaseProvider({ children, supabase }: any) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export const useSupabase = () => useContext(SupabaseContext);
