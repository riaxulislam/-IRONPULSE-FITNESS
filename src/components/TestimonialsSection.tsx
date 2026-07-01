import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-black py-20 border-t border-neutral-900 overflow-hidden" id="testimonials-carousel-section">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12" id="testimonials-header">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
            COMMUNITY FIRST
          </span>
          <h2 className="font-heading text-xl sm:text-2xl text-white uppercase mt-1">
            TESTED BY ELITE ATHLETES
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="relative rounded-sm bg-neutral-950 border border-neutral-900 p-8 sm:p-12 shadow-2xl shadow-black" id="testimonials-slider-box">
          
          {/* Quote Graphic */}
          <div className="absolute top-6 left-6 text-neutral-900 z-0">
            <Quote className="h-20 w-20 transform -scale-x-100 fill-neutral-950" />
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center space-y-6"
                id={`active-testimonial-${TESTIMONIALS[activeIndex].id}`}
              >
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base leading-relaxed text-neutral-300 font-sans italic max-w-2xl">
                  "{TESTIMONIALS[activeIndex].text}"
                </p>

                {/* User Bio */}
                <div className="flex items-center space-x-3 pt-4">
                  <img
                    src={TESTIMONIALS[activeIndex].avatar}
                    alt={TESTIMONIALS[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 rounded-full object-cover border border-neutral-800"
                  />
                  <div className="text-left">
                    <h4 className="font-heading text-xs text-white uppercase tracking-wider">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="font-mono text-[10px] text-neutral-500">
                      {TESTIMONIALS[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Navigation Indicators */}
          <div className="flex items-center justify-between mt-10 border-t border-neutral-900 pt-6 relative z-10">
            {/* Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Previous testimonial"
                id="testimonial-prev-trigger"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Next testimonial"
                id="testimonial-next-trigger"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
