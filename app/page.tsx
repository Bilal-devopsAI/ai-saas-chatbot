export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-7xl font-black mb-4">AI SaaS Chatbot</h1>
      <p className="text-2xl mb-12 text-zinc-400">Full-stack, Grok-powered, multi-tenant, zero local RAM hassle</p>
      <a href="/login" className="px-12 py-6 bg-white text-3xl font-black text-black rounded-3xl">Get Started Free →</a>
    </div>
  );
}
