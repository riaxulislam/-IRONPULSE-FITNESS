import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterSectionProps {
  onSubscribe: (email: string) => void;
}

export default function NewsletterSection({ onSubscribe }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-neutral-950 py-24 border-t border-neutral-900" id="newsletter-signup-block">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase font-bold">
            NEWSLETTER CAPSULE
          </span>
          
          <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase" id="newsletter-title">
            Join Our Community
          </h2>
          
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Stay ahead of the competition. Subscribe to receive first-look notifications for upcoming limited collections, engineered biomechanical designs, and athlete nutrition guidelines.
          </p>

          {/* Form */}
          <div className="pt-4 max-w-md mx-auto" id="newsletter-form-container">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your athletic email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-sm bg-neutral-900 border border-neutral-800 px-4 py-3.5 pl-10 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all duration-300"
                    />
                    <Mail className="absolute left-3.5 top-4 h-4 w-4 text-neutral-600" />
                  </div>
                  <button
                    type="submit"
                    className="rounded-sm bg-accent hover:bg-white text-black px-8 py-3.5 text-xs font-heading tracking-widest uppercase transition-colors duration-300"
                    id="newsletter-subscribe-btn"
                  >
                    SUBSCRIBE
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-sm bg-accent/5 border border-accent/20 p-5 text-accent"
                  id="newsletter-success-box"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black mb-3">
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-heading text-xs tracking-wider uppercase mb-1">CONGRATULATIONS</h4>
                  <p className="text-xs text-neutral-300">
                    You are officially registered. Check your inbox for your 15% discount code: <strong className="font-mono text-accent">PULSE15</strong>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
