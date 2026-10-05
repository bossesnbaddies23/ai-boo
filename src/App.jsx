import React, { useState, useEffect, useRef } from "react";

const tabs = ["Overview", "Profiles", "Motion", "Plans", "Support"];
const motions = ["Idle", "Speak", "Walk Left", "Walk Right", "Point", "Look Up", "Look Down"];
const genders = ["she/her", "he/him", "they/them", "custom"];
const personalityOptions = ["friendly", "professional", "playful", "fierce", "mysterious"];
const premiumFeatures = [
  "Personalized AI addressing",
  "Custom identity memory",
  "Premium avatar upgrades",
  "Custom personality tuning",
  "QR share and profile setup",
  "Advanced support",
];

const plans = [
  {
    name: "Chained",
    price: "$10",
    detail: "Starter identity access",
    accent: "from-slate-700 to-slate-800",
  },
  {
    name: "Unchained",
    price: "$16.99",
    detail: "Full access with premium motion",
    accent: "from-cyan-500 to-fuchsia-500",
    featured: true,
  },
  {
    name: "Velora Pro",
    price: "$49",
    detail: "Advanced identity + support",
    accent: "from-violet-600 to-indigo-500",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedPlan, setSelectedPlan] = useState("Unchained");
  const [motion, setMotion] = useState("Idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const messagesEndRef = useRef(null);

  const [userProfile, setUserProfile] = useState({
    name: "Friend",
    pronouns: "they/them",
    howToAddress: "Hey there",
  });

  const [aiProfile, setAiProfile] = useState({
    name: "Velora",
    gender: "she/her",
    personality: "friendly",
    whatToCall: "darling",
    style: "glam and fierce",
  });

  useEffect(() => {
    fetchUserMemory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUserMemory = async () => {
    try {
      const res = await fetch("/api/memory/default");
      const data = await res.json();
      setMemory(data);
      setUserProfile(data.userProfile || userProfile);
      setAiProfile(data.aiProfile || aiProfile);
      if (data.conversationHistory && data.conversationHistory.length > 0) {
        const convertedMessages = data.conversationHistory
          .map((item, idx) => [
            { id: idx * 2, sender: "user", text: item.userMessage },
            { id: idx * 2 + 1, sender: "ai", text: item.aiResponse },
          ])
          .flat();
        setMessages(convertedMessages);
      }
    } catch (e) {
      console.error("Error loading memory:", e);
    }
  };

  const saveUserProfile = async () => {
    try {
      await fetch("/api/profile/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "default", ...userProfile }),
      });
      fetchUserMemory();
      alert("User profile saved!");
    } catch (e) {
      console.error("Error saving profile:", e);
    }
  };

  const saveAiProfile = async () => {
    try {
      await fetch("/api/profile/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "default", ...aiProfile }),
      });
      fetchUserMemory();
      alert("AI profile saved!");
    } catch (e) {
      console.error("Error saving AI profile:", e);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "default",
          message: input,
          tier: selectedPlan,
        }),
      });

      const data = await res.json();
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setMotion(data.motionState || "Speak");
      fetchUserMemory();
    } catch (e) {
      console.error("Error:", e);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: "Error connecting to AI backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMotionChange = async (newMotion) => {
    setMotion(newMotion);
    try {
      await fetch("/api/motion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "default", motionState: newMotion }),
      });
    } catch (e) {
      console.error("Error updating motion:", e);
    }
  };

  const handleUpgrade = async (newTier) => {
    setSelectedPlan(newTier);
    try {
      await fetch("/api/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "default", newTier }),
      });
      fetchUserMemory();
    } catch (e) {
      console.error("Error upgrading:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-[1700px] items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-black text-slate-950">
                A
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">AI BOO</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium ${
                    activeTab === tab ? "text-cyan-300" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900">
                Login
              </button>
              <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950">
                Upgrade
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col lg:flex-row">
          <aside className="w-full border-b border-slate-800 bg-slate-950/60 lg:w-[240px] lg:border-b-0 lg:border-r">
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Identity panel</p>
              <div className="mt-5 space-y-3">
                {[
                  "Home",
                  "Profiles",
                  "Motion library",
                  "Memory",
                  "Premium",
                  "Monetization",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => item === "Profiles" && setShowProfileEditor(!showProfileEditor)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-left text-sm text-slate-200 hover:border-slate-700"
                  >
                    <span>{item}</span>
                    <span className="text-slate-500">→</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current mode</p>
                <p className="mt-2 text-xl font-black text-cyan-300">{aiProfile.name}</p>
                <p className="mt-1 text-sm text-slate-400">{selectedPlan} active</p>
                {memory && (
                  <p className="mt-2 text-xs text-slate-500">
                    Conversations: {memory.conversationHistory?.length || 0}
                  </p>
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1 p-5 md:p-7">
            {showProfileEditor && (
              <section className="mb-8 grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-900 p-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-6 text-2xl font-black">Your Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Your Name</label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Your Pronouns</label>
                      <input
                        type="text"
                        value={userProfile.pronouns}
                        onChange={(e) => setUserProfile({ ...userProfile, pronouns: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">How to Address You</label>
                      <input
                        type="text"
                        value={userProfile.howToAddress}
                        onChange={(e) => setUserProfile({ ...userProfile, howToAddress: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={saveUserProfile}
                      className="mt-4 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950"
                    >
                      Save Your Profile
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-black">AI {aiProfile.name}'s Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">AI Name</label>
                      <input
                        type="text"
                        value={aiProfile.name}
                        onChange={(e) => setAiProfile({ ...aiProfile, name: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Gender / Pronouns</label>
                      <select
                        value={aiProfile.gender}
                        onChange={(e) => setAiProfile({ ...aiProfile, gender: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        {genders.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Personality</label>
                      <select
                        value={aiProfile.personality}
                        onChange={(e) => setAiProfile({ ...aiProfile, personality: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      >
                        {personalityOptions.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">What She Calls You</label>
                      <input
                        type="text"
                        value={aiProfile.whatToCall}
                        onChange={(e) => setAiProfile({ ...aiProfile, whatToCall: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Style</label>
                      <input
                        type="text"
                        value={aiProfile.style}
                        onChange={(e) => setAiProfile({ ...aiProfile, style: e.target.value })}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={saveAiProfile}
                      className="mt-4 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950"
                    >
                      Save AI Profile
                    </button>
                  </div>
                </div>
              </section>
            )}

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-fuchsia-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live identity</p>
                    <h2 className="mt-2 text-3xl font-black">{aiProfile.name} Avatar Stage</h2>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-slate-800 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_top,_rgba(217,70,239,0.2),transparent_35%),#020617] p-5">
                  <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950/60">
                    <div className="relative flex h-52 w-52 items-center justify-center">
                      <div
                        className={`absolute h-28 w-28 rounded-full border-2 border-fuchsia-500/70 bg-gradient-to-br from-white/10 to-fuchsia-500/30 transition-all ${
                          motion === "Speak" ? "animate-pulse" : ""
                        }`}
                      />
                      <div className="absolute top-8 flex gap-5">
                        <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                        <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                      </div>
                      <div
                        className={`absolute bottom-14 h-14 w-24 rounded-full border-4 border-white/70 transition ${
                          motion === "Speak" ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute bottom-2 h-24 w-20 rounded-[40%] border-4 border-fuchsia-300/60" />
                      <div className="absolute left-8 bottom-[-8px] h-12 w-4 rounded-full bg-slate-800" />
                      <div className="absolute right-8 bottom-[-8px] h-12 w-4 rounded-full bg-slate-800" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {motions.map((state) => (
                    <button
                      key={state}
                      onClick={() => handleMotionChange(state)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        motion === state
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </section>

              <aside className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chat</p>
                  <button
                    onClick={() => setMessages([])}
                    className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
                  >
                    Clear
                  </button>
                </div>

                <div className="mt-5 flex-1 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.sender === "user"
                          ? "ml-auto bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-slate-950"
                          : "bg-slate-800 text-slate-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex gap-2 text-sm text-slate-400">
                      <span>{aiProfile.name} is thinking</span>
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="mt-6">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    placeholder={`Ask ${aiProfile.name}...`}
                    disabled={loading}
                    className="h-[100px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </div>
              </aside>
            </div>

            <section className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-900 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Membership</p>
                  <h3 className="mt-2 text-3xl font-black">Premium access</h3>
                </div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
                  {selectedPlan}
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => handleUpgrade(plan.name)}
                    className={`rounded-[1.5rem] border p-5 text-left transition ${
                      selectedPlan === plan.name
                        ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                        : "border-slate-800 bg-slate-950 hover:border-slate-700"
                    }`}
                  >
                    <div className={`rounded-xl bg-gradient-to-r ${plan.accent} p-3 text-xs font-bold uppercase tracking-[0.2em] text-white`}>
                      {plan.name}
                    </div>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-4xl font-black text-white">{plan.price}</span>
                      <span className="pb-1 text-sm text-slate-400">/ mo</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-300">{plan.detail}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Premium features</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {premiumFeatures.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Your Setup</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="font-bold text-cyan-300">You: {userProfile.name}</p>
                    <p className="text-xs text-slate-500">{userProfile.pronouns}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="font-bold text-fuchsia-300">{aiProfile.name}</p>
                    <p className="text-xs text-slate-500">{aiProfile.gender} • {aiProfile.personality}</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
