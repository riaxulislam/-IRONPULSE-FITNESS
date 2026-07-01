import React from 'react';
import { Dumbbell, TrendingUp, ShieldCheck } from 'lucide-react';
import { BENEFITS } from '../data';

export default function BenefitsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'strength':
        return <Dumbbell className="h-6 w-6 text-accent" />;
      case 'result':
        return <TrendingUp className="h-6 w-6 text-accent" />;
      case 'trust':
        default:
          return <ShieldCheck className="h-6 w-6 text-accent" />;
    }
  };

  return (
    <section className="bg-neutral-950 py-16 border-t border-b border-neutral-900" id="benefits-grid-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3" id="benefits-layout-grid">
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-start rounded-sm bg-[#0a0a0a] border border-neutral-900 p-6 transition-all duration-300 hover:border-neutral-800 hover:shadow-lg hover:shadow-black"
              id={`benefit-card-${index}`}
            >
              {/* Icon Container with background pulse */}
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 transition-all duration-300 group-hover:bg-accent group-hover:text-black">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {getIcon(benefit.icon)}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-sm text-white uppercase tracking-wider mt-4 mb-2 group-hover:text-accent transition-colors duration-200">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
