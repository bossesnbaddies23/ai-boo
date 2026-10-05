import React, { useState } from "react";

const tabs = ["Overview", "Identity", "Motion", "Plans", "Support"];
const motions = ["Idle", "Speak", "Walk Left", "Walk Right", "Point", "Look Up", "Look Down"];
const premiumFeatures = [
  "Priority AI memory",
  "Premium avatar upgrades",
  "Custom personality tuning",
  "QR share and profile setup",
  "Advanced support",
  "Contest access",
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

const messages = [
  { id: 1, sender: "ai", text: "Welcome back. I’m Velora. Your identity is active and ready." },
  { id: 2, sender: "user", text: "I want my AI to feel premium and self-owned." },
  { id: 3, sender: "ai", text: "Absolutely. Your AI identity can grow with your brand, memory, and premium upgrades." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedPlan, setSelectedPlan] = useState("Unchained");
  const [motion, setMotion] = useState("Idle");
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4">
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
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-left text-sm text-slate-200 hover:border-slate-700"
                  >
                    <span>{item}</span>
                    <span className="text-slate-500">→</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current mode</p>
                <p className="mt-2 text-xl font-black text-cyan-300">Velora</p>
                <p className="mt-1 text-sm text-slate-400">Premium identity active</p>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-5 md:p-7">
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-fuchsia-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live identity</p>
                    <h2 className="mt-2 text-3xl font-black">Velora Avatar Stage</h2>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                   Online
                  </span>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-slate-800 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_top,_rgba(217,70,239,0.2),transparent_35%),#020617] p-5">
                  <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950/60">
                    <div className="relative flex h-52 w-52 items-center justify-center">
                      <div className="absolute h-28 w-28 rounded-full border-2 border-fuchsia-500/70 bg-gradient-to-br from-white/10 to-fuchsia-500/30" />
                      <div className="absolute top-8 flex gap-5">
                        <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                        <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                      </div>
                      <div className="absolute bottom-14 h-14 w-24 rounded-full border-4 border-white/70" />
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
                      onClick={() => setMotion(state)}
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

              <aside className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chat</p>
                  <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800">
                    New chat
                  </button>
                </div>

                <div className="mt-5 space-y-4">
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
                </div>

                <div className="mt-6">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your AI identity..."
                    className="h-[100px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                  />
                  <button className="mt-3 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950">
                    Send message
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
                    onClick={() => setSelectedPlan(plan.name)}
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
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Identity memory</p>
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-7 text-slate-300">
                  Velora keeps your identity, premium state, and user preferences in a persistent local profile while remaining open-source and owner-controlled.
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
