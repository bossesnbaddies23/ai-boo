import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";

const mockCreators = {
  bosses: [
    { id: 1, name: "Boss Queen", image: "https://via.placeholder.com/400x500?text=Boss+Queen", votes: 1240, category: "bosses", bio: "Creator & Entrepreneur" },
    { id: 2, name: "Power Player", image: "https://via.placeholder.com/400x500?text=Power+Player", votes: 980, category: "bosses", bio: "Streamer & Influencer" },
    { id: 3, name: "Hustle King", image: "https://via.placeholder.com/400x500?text=Hustle+King", votes: 756, category: "bosses", bio: "Entrepreneur" },
  ],
  baddies: [
    { id: 4, name: "Baddie Supreme", image: "https://via.placeholder.com/400x500?text=Baddie+Supreme", votes: 2100, category: "baddies", bio: "Fashion & Content" },
    { id: 5, name: "Vibe Setter", image: "https://via.placeholder.com/400x500?text=Vibe+Setter", votes: 1650, category: "baddies", bio: "Lifestyle Creator" },
    { id: 6, name: "Trend Maker", image: "https://via.placeholder.com/400x500?text=Trend+Maker", votes: 1420, category: "baddies", bio: "TikTok Star" },
  ],
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("bosses");
  const [currentCreatorIndex, setCurrentCreatorIndex] = useState(0);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [memory, setMemory] = useState(null);
  const [trialDays, setTrialDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const aiMessagesEndRef = useRef(null);

  const creators = mockCreators[currentTab] || [];
  const currentCreator = creators[currentCreatorIndex];

  useEffect(() => {
    fetchUserMemory();
  }, []);

  useEffect(() => {
    aiMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  const fetchUserMemory = async () => {
    try {
      const res = await fetch("/api/memory/default");
      const data = await res.json();
      setMemory(data);
      setTrialDays(data.trialDaysRemaining);
      if (data.conversationHistory) {
        setAiMessages(data.conversationHistory.slice(-5));
      }
    } catch (e) {
      console.error("Error loading memory:", e);
    }
  };

  const handleVote = async (voteType) => {
    if (trialDays <= 0) {
      alert("Trial expired. Upgrade to continue voting!");
      return;
    }

    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "default",
          creatorId: currentCreator.id,
          voteType,
        }),
      });
    } catch (e) {
      console.error("Error voting:", e);
    }

    // Move to next creator
    if (currentCreatorIndex < creators.length - 1) {
      setCurrentCreatorIndex(currentCreatorIndex + 1);
    } else {
      setCurrentCreatorIndex(0);
    }
  };

  const handleAiMessage = async () => {
    if (!aiInput.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: aiInput,
      timestamp: new Date().toISOString(),
    };

    setAiMessages((prev) => [...prev, userMessage]);
    setAiInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "default", message: aiInput }),
      });

      const data = await res.json();
      if (data.response) {
        setAiMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.response,
            timestamp: new Date().toISOString(),
          },
        ]);
      }

      // Attempt text-to-speech
      if (window.speechSynthesis && data.response) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
      }

      fetchUserMemory();
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setCurrentCreatorIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-purple-900/50 bg-slate-950/90 backdrop-blur">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg border border-purple-700 bg-purple-900/30 p-2 hover:bg-purple-900/50"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-2xl font-black tracking-tighter">
            BOSSES & BADDIES
          </h1>

          <button
            onClick={() => setAiSidebarOpen(!aiSidebarOpen)}
            className="rounded-lg border border-fuchsia-700 bg-fuchsia-900/30 p-2 hover:bg-fuchsia-900/50"
          >
            <Volume2 size={24} />
          </button>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-30 w-64 border-r border-purple-900/50 bg-slate-900/95 backdrop-blur transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-2 p-4">
          <button className="w-full rounded-xl border border-purple-700 bg-purple-900/30 px-4 py-3 text-left text-sm font-bold hover:bg-purple-900/60">
            🎙️ Podcast
          </button>
          <button className="w-full rounded-xl border border-cyan-700 bg-cyan-900/30 px-4 py-3 text-left text-sm font-bold hover:bg-cyan-900/60">
            👕 Unchained Merch
          </button>
          <button className="w-full rounded-xl border border-fuchsia-700 bg-fuchsia-900/30 px-4 py-3 text-left text-sm font-bold hover:bg-fuchsia-900/60">
            🚀 Upgrade Premium
          </button>
          <button className="w-full rounded-xl border border-violet-700 bg-violet-900/30 px-4 py-3 text-left text-sm font-bold hover:bg-violet-900/60">
            🤖 AI Boo Assistant
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 pb-20">
        {/* Tabs */}
        <div className="flex justify-center gap-4 px-5 py-6">
          <button
            onClick={() => handleTabChange("bosses")}
            className={`rounded-full px-6 py-2 font-bold transition ${
              currentTab === "bosses"
                ? "border-2 border-cyan-400 bg-cyan-500/20 text-cyan-300"
                : "border-2 border-slate-700 bg-slate-800 text-slate-300 hover:border-cyan-400"
            }`}
          >
            BOSSES
          </button>
          <button
            onClick={() => handleTabChange("baddies")}
            className={`rounded-full px-6 py-2 font-bold transition ${
              currentTab === "baddies"
                ? "border-2 border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-300"
                : "border-2 border-slate-700 bg-slate-800 text-slate-300 hover:border-fuchsia-400"
            }`}
          >
            BADDIES
          </button>
        </div>

        {/* Swipe Creator Card */}
        {currentCreator && (
          <div className="flex flex-col items-center px-5 py-8">
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border-4 border-purple-500/50 shadow-2xl shadow-purple-500/20">
              <img
                src={currentCreator.image}
                alt={currentCreator.name}
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl font-black">{currentCreator.name}</h2>
                <p className="text-sm text-purple-200">{currentCreator.bio}</p>
                <p className="mt-2 text-xs text-slate-400">Votes: {currentCreator.votes}</p>
              </div>
            </div>

            {/* Vote Buttons */}
            <div className="mt-8 flex gap-6">
              <button
                onClick={() => handleVote("no")}
                className="rounded-full border-2 border-red-500 bg-red-500/20 p-4 hover:bg-red-500/40"
              >
                <ThumbsDown size={32} className="text-red-400" />
              </button>
              <button
                onClick={() => handleVote("yes")}
                className="rounded-full border-2 border-green-500 bg-green-500/20 p-4 hover:bg-green-500/40"
              >
                <ThumbsUp size={32} className="text-green-400" />
              </button>
            </div>

            {/* Trial Status */}
            <div className="mt-8 rounded-2xl border border-purple-700/50 bg-purple-900/30 px-6 py-3 text-center">
              <p className="text-sm text-purple-200">
                {trialDays > 0 ? (
                  <>
                    Free Trial: <span className="font-bold text-purple-300">{trialDays} days remaining</span>
                  </>
                ) : (
                  <span className="font-bold text-red-300">Trial Expired - Upgrade to Continue</span>
                )}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* AI Boo Sidebar */}
      <aside
        className={`fixed right-0 top-16 bottom-0 z-30 w-80 border-l border-fuchsia-900/50 bg-slate-900/95 backdrop-blur transition-transform ${
          aiSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          {/* AI Avatar */}
          <div className="mb-4 rounded-2xl border border-fuchsia-700/50 bg-fuchsia-900/30 p-4 text-center">
            <div className="flex justify-center">
              <div className="relative h-16 w-16 rounded-full border-2 border-fuchsia-500 bg-gradient-to-br from-fuchsia-500/30 to-purple-500/30">
                <div className="absolute top-3 flex w-full justify-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
            </div>
            <p className="mt-3 font-bold text-fuchsia-300">Velora</p>
            <p className="text-xs text-slate-400">AI Assistant</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto mb-4">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === "user"
                    ? "ml-auto max-w-[85%] bg-fuchsia-600 text-white"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={aiMessagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="space-y-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiMessage()}
              placeholder="Chat with Velora..."
              disabled={loading || trialDays <= 0}
              className="w-full rounded-xl border border-fuchsia-700 bg-slate-950 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-fuchsia-500 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleAiMessage}
              disabled={loading || !aiInput.trim() || trialDays <= 0}
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 px-4 py-2 text-sm font-bold hover:from-fuchsia-500 hover:to-purple-500 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
