import React, { useState } from "react";

const plans = [
  {
    name: "Chained",
    price: "$10",
    expires: "/ month",
    detail: "Starter access to the AI Boo identity experience.",
    accent: "from-slate-700 to-slate-800",
  },
  {
    name: "Unchained",
    price: "$16.99",
    expires: "/ month",
    detail: "Full premium access, avatar upgrades, and stronger AI identity features.",
    accent: "from-cyan-500 to-fuchsia-500",
    featured: true,
  },
  {
    name: "Velora Pro",
    price: "$49",
    expires: "/ month",
    detail: "Advanced identity personalization, support, and performance features.",
    accent: "from-violet-600 to-indigo-500",
  },
];

const motionStates = [
  "Idle",
  "Walk Left",
  "Walk Right",
  "Walk Forward",
  "Point",
  "Look Up",
  "Look Down",
  "Speak",
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("Unchained");
  const [selectedMotion, setSelectedMotion] = useState("Idle");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-black text-slate-950">
              A
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">AI BOO</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#identity" className="hover:text-white">Identity</a>
            <a href="#tiers" className="hover:text-white">Tiers</a>
            <a href="#motion" className="hover:text-white">Motion</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900">
              Sign In
            </button>
            <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
              Start Free
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section id="identity" className="grid gap-8 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Personalized AI identity
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Your AI avatar, your brand, your world.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              AI Boo is your own digital companion identity — built for personality, premium motion, social sharing, and monetization.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950">
                Try Demo
              </button>
              <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-white hover:bg-slate-900">
                Upgrade Identity
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Open source",
                "Custom motion states",
                "Subscription ready",
                "QR share compatible",
              ].map((item) => (
                <span key={item} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-fuchsia-500/10">
            <div className="rounded-[1.5rem] border border-slate-700 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live avatar</p>
                  <p className="mt-2 text-2xl font-black text-white">Velora</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Online
                </span>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-fuchsia-950/40 p-5">
                <div className="flex h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_top,_rgba(217,70,239,0.2),transparent_35%),#020617]">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <div className="absolute h-24 w-24 rounded-full border-2 border-fuchsia-500/70 bg-gradient-to-br from-slate-200/20 to-fuchsia-500/30" />
                    <div className="absolute top-8 flex gap-4">
                      <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                    <div className="absolute bottom-8 h-14 w-18 rounded-full border-4 border-white/70" />
                    <div className="absolute bottom-1 h-20 w-16 rounded-[40%] border-4 border-fuchsia-300/60" />
                    <div className="absolute bottom-[-6px] left-12 h-10 w-8 rounded-full bg-slate-900" />
                    <div className="absolute bottom-[-6px] right-12 h-10 w-8 rounded-full bg-slate-900" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Movement</p>
                  <p className="mt-1 text-sm font-bold text-cyan-300">{selectedMotion}</p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-3 py-1 text-xs font-bold text-slate-950">
                  Premium ready
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="motion" className="mt-12 rounded-[2rem] border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Avatar motion</p>
              <h2 className="mt-2 text-3xl font-black">Motion states</h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {motionStates.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedMotion(state)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedMotion === state
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-800"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </section>

        <section id="tiers" className="mt-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Membership</p>
            <h2 className="mt-2 text-3xl font-black">Choose your identity tier</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`rounded-[1.5rem] border p-6 text-left transition ${
                  selectedPlan === plan.name
                    ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700"
                }`}
              >
                <div className={`rounded-2xl bg-gradient-to-r ${plan.accent} p-3 text-sm font-bold uppercase tracking-[0.2em] text-white`}>
                  {plan.name}
                </div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="pb-1 text-sm text-slate-400">{plan.expires}</span>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">{plan.detail}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
