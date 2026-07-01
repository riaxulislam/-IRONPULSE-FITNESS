import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Twitter, ArrowRight, ShieldCheck, CreditCard, Award, Dumbbell } from 'lucide-react';
import { Page } from '../types';

const logoImg = '/src/assets/images/apex_forge_logo_1782839642460.jpg';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ setCurrentPage, onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-neutral-900 bg-black pt-16 pb-8 text-neutral-400" id="footer-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12" id="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4" id="footer-col-brand">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-950 border border-neutral-900">
                <img 
                  src={logoImg} 
                  alt="IronPulse Fitness Logo" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-heading text-lg tracking-[0.15em] text-white">
                IRONPULSE FITNESS
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 font-sans">
              Forging the future of elite athletic preparation with precision-engineered gear, thermal apparel, high-absorption nutrition, and distraction-free bio-telemetry.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-4" id="footer-col-nav">
            <h4 className="font-heading text-xs tracking-widest text-white uppercase">NAVIGATION</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors duration-200 text-left">
                  Home Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors duration-200 text-left">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors duration-200 text-left">
                  About Brand & Mission
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors duration-200 text-left">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections / Filter Shortcuts */}
          <div className="space-y-4" id="footer-col-collections">
            <h4 className="font-heading text-xs tracking-widest text-white uppercase">COLLECTIONS</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => {
                    setCurrentPage('shop');
                    // We can pass state later to trigger filter
                  }} 
                  className="hover:text-white transition-colors duration-200 text-left"
                >
                  Thermal Apparel
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors duration-200 text-left">
                  Performance Gear
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors duration-200 text-left">
                  Elite Nutrition
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors duration-200 text-left">
                  Bio-Telemetry Tech
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Input */}
          <div className="space-y-4" id="footer-col-newsletter">
            <h4 className="font-heading text-xs tracking-widest text-white uppercase">JOIN OUR COMMUNITY</h4>
            <p className="text-xs leading-relaxed text-neutral-400">
              Subscribe to unlock 15% off your first purchase, access early capsules, and receive training telemetry insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-sm bg-accent px-2.5 text-black hover:bg-opacity-90 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-accent animate-pulse">
                  Welcome to the Forge. Code sent to email!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Brand Trust Badges */}
        <div className="my-10 border-t border-neutral-900 pt-8 flex flex-wrap gap-6 items-center justify-between text-neutral-500 text-xs" id="footer-trust-strip">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-accent" />
            <span>Official Authorized Shopify Retailer</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>256-bit AES SSL Secure Gateway</span>
          </div>
          <div className="flex items-center space-x-4 text-neutral-600">
            <CreditCard className="h-4 w-4 inline" />
            <span>Visa • Mastercard • Amex • Shopify Pay • Apple Pay</span>
          </div>
        </div>

        {/* Policies & Copyright Section */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500" id="footer-bottom-bar">
          <div id="footer-copyright">
            © {new Date().getFullYear()} IRONPULSE FITNESS. All rights reserved.
          </div>
          
          {/* Policies Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center" id="footer-policies-links">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
