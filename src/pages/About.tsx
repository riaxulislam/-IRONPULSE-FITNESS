import React from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-brand-bg space-y-20" id="about-page-container">
      
      {/* Visual Title Banner */}
      <div className="border-b border-neutral-900 pb-6 text-center sm:text-left" id="about-title-block">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
          OUR ANTECEDENTS
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white uppercase mt-1">
          The IronPulse Chronicle
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1.5">
          Read the journey of how a small garage weightlifting workshop morphed into an international athletic benchmark.
        </p>
      </div>

      {/* 1. TEXT_WITH_IMAGE: split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-split-story">
        
        {/* Left Side: Brand Story Content */}
        <div className="lg:col-span-7 space-y-6" id="about-story-text">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            FOUNDED IN THE RACK
          </span>
          <h2 className="font-heading text-xl sm:text-2xl text-white uppercase">
            BRAND STORY & MISSION
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            IronPulse Fitness was founded in 2021 inside a cold concrete garage in Seattle. Dissatisfied with commercial dumbbells that rattled on heavy swings and activewear that lost compression after three washes, we decided to manufacture our own. We began machining plates from pure industrial carbon steel and tailoring hoodies with high-density cotton weaves.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Our mission is simple: <strong>To build gear that never fails your routine.</strong> We believe that mental willpower is the hardest part of conditioning, so your physical gear should be the absolute easiest. We combine raw metal knurling, thermal fabric weaves, and seamless bio-telemetry into an elite ecosystem that accelerates human achievement.
          </p>
          <div className="border-l-2 border-accent pl-4 py-1 text-xs text-neutral-300 font-mono italic">
            "We do not decorate. We do not make compromises. We forge." — Founders, IRONPULSE FITNESS
          </div>
        </div>

        {/* Right Side: Performance Image */}
        <div className="lg:col-span-5 relative" id="about-story-image">
          <div className="relative aspect-4/5 overflow-hidden rounded-sm border border-neutral-900 bg-neutral-950">
            <img
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
              alt="Elite gym trainer preparing bar with focus"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover grayscale opacity-75 hover:grayscale-0 hover:opacity-90 transition-all duration-500"
            />
            {/* Elegant glowing neon corner accent */}
            <div className="absolute -bottom-1 -right-1 h-12 w-12 bg-accent/20 blur-xl" />
          </div>
        </div>

      </div>

      {/* 2. VALUES: blocks for Mission, Vision, and Commitment */}
      <div className="space-y-10" id="about-values-section">
        <div className="text-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            FOUNDATIONAL PILLARS
          </span>
          <h2 className="font-heading text-xl sm:text-2xl text-white uppercase mt-1">
            Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-values-grid">
          
          {/* Mission Block */}
          <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-6 space-y-4 hover:border-neutral-800 transition-colors" id="value-mission-block">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/10 border border-accent/20 text-accent">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xs uppercase tracking-wider text-white">
              Our Mission
            </h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              To engineer bulletproof, uncompromising physical training gear and performance apparel that stands the test of heavy iron, elite athletics, and daily conditioning.
            </p>
          </div>

          {/* Vision Block */}
          <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-6 space-y-4 hover:border-neutral-800 transition-colors" id="value-vision-block">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/10 border border-accent/20 text-accent">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xs uppercase tracking-wider text-white">
              Our Vision
            </h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              To build a frictionless symbiosis between athletic physiology and data telemetry, creating distraction-free wearable nodes that optimize muscle strain in real-time.
            </p>
          </div>

          {/* Commitment Block */}
          <div className="rounded-sm bg-[#0d0d0d] border border-accent/30 p-6 space-y-4 hover:border-accent/50 transition-colors" id="value-commitment-block">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-black font-bold">
              <Sparkles className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="font-heading text-xs uppercase tracking-wider text-accent">
              Our Commitment
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              A lifetime hardware guarantee on all dumbbells, secure encrypted transaction channels, zero-subscription software, and dedicated athletic customer response under 12 hours.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
