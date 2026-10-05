import React, { useState } from "react";

const plans = [
  {
    name: "Chained",
    price: "$10",
    detail: "Starter access for your AI Boo experience",
    highlighted: false,
  },
  {
    name: "Unchained",
    price: "$16.99",
    detail: "Full feature access, premium avatar upgrades, and support",
    highlighted: true,
  },
  {
    name: "Velora Pro",
    price: "$49",
    detail: "Advanced identity, custom AI behavior, and premium delivery",
    highlighted: false,
  },
];

const perks = [
  "Custom AI identity",
  "Subscription tiers",
  "Premium motion and animation",
  "Open-source foundation",
  "Brand and personalization controls",
  "QR-sharing ready",
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("Unchained");

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
        <section className="grid gap-10 py-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Your AI identity
            </span>
            <h1 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">
              Meet Velora, your branded AI concierge.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              AI Boo gives you a self-owned AI companion experience with premium upgrades, personal identity, subscription tiers, and open-source flexibility.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950">
                Book Demo
              </button>
              <button className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-white hover:bg-slate-900">
                Explore Plans
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
              {perks.map((perk) => (
                <span key={perk} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2">
                  {perk}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-500/10">
            <div className="rounded-[1.5rem] border border-slate-700 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Avatar status</p>
                  <p className="mt-2 text-2xl font-black text-white">Velora Ready</p>
                </div>
                <div className="h-4 w-4 rounded-full bg-emerald-400" />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-5">
                <div className="flex items-center justify-center">
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-fuchsia-500/50 bg-gradient-to-br from-fuchsia-600/30 to-cyan-500/30">
                    <div className="flex gap-4">
                      <div className="h-4 w-4 rounded-full bg-white" />
                      <div className="h-4 w-4 rounded-full bg-white" />
                    </div>
                    <div className="absolute bottom-12 h-10 w-20 rounded-full border-4 border-white/60" />
                    <div className="absolute bottom-8 h-14 w-14 rounded-full border-4 border-cyan-300/60" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-slate-300">Current plan</p>
                <p className="mt-1 text-xl font-bold text-cyan-300">{selectedPlan}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black">Membership Tiers</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`rounded-[1.75rem] border p-6 text-left transition ${
                  selectedPlan === plan.name
                    ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{plan.name}</p>
                <p className="mt-4 text-4xl font-black text-white">{plan.price}</p>
                <p className="mt-4 text-slate-300">{plan.detail}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-slate-800 bg-slate-900 p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-4xl font-black text-white">24/7</p>
              <p className="mt-2 text-slate-300">Always-on avatar access</p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">1.5k+</p>
              <p className="mt-2 text-slate-300">Subscriber engagement signals</p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">$0</p>
              <p className="mt-2 text-slate-300">Open-source project foundation</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
