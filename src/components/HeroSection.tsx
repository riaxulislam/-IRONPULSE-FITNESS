import React from 'react';
import { Play, Dumbbell, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';
import { IMAGES } from '../data';

interface HeroSectionProps {
  onCtaClick: (page: Page) => void;
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black" id="hero-banner-section">
      {/* Background Graphic Box with Neon Green Laser Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroBanner}
          alt="Premium Dark Aesthetic Gym Interior"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-45 md:opacity-55 scale-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Subtle neon glow overlay style */}
        <div className="absolute inset-0 bg-[#00ff88]/5 mix-blend-color" />
      </div>

      {/* Main Content Stage */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-48" id="hero-content-box">
        <div className="max-w-2xl space-y-6">
          {/* Subtle Accent Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 text-xs text-accent"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] tracking-widest uppercase">THE IRONPULSE PERFORMANCE STANDARD</span>
          </motion.div>

          {/* Main Hero Header */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white"
            id="hero-header-title"
          >
            STRONG FITNESS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">IDENTITY</span>
          </motion.h1>

          {/* Subheading text */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed max-w-lg"
          >
            Train Hard. Stay Strong. We forge professional grade equipment, hybrid compression gear, and bio-telemetry tech engineered to unlock maximum physical metrics.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
            id="hero-cta-buttons"
          >
            <button
              onClick={() => onCtaClick('shop')}
              className="rounded-sm bg-accent px-8 py-3.5 text-xs font-heading tracking-widest text-black hover:bg-white transition-all duration-300 shadow-lg shadow-accent/15 hover:shadow-white/10 uppercase"
              id="hero-primary-cta"
            >
              Shop Now
            </button>
            
            <button
              onClick={() => onCtaClick('about')}
              className="rounded-sm border border-neutral-800 bg-neutral-950 px-8 py-3.5 text-xs font-heading tracking-widest text-white hover:text-accent hover:border-accent transition-all duration-300 uppercase"
              id="hero-secondary-cta"
            >
              Explore Products
            </button>
          </motion.div>

          {/* Fast trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 pt-10 text-xs text-neutral-500 font-mono border-t border-neutral-900/50"
          >
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>LIFETIME GUARANTEE</span>
            </div>
            <span>|</span>
            <div>FREE SHIPPING ON ORDERS OVER $150</div>
            <span>|</span>
            <div>30-DAY HASSLE-FREE RETURNS</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
