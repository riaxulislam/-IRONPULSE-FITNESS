import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activePin, setActivePin] = useState<'seattle' | 'london' | 'tokyo'>('seattle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form on complete
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const locations = {
    seattle: {
      title: 'Seattle Head Forge (HQ)',
      address: '2200 Westlake Ave, Suite 400, Seattle, WA 98121',
      coords: '47.6062° N, 122.3321° W',
    },
    london: {
      title: 'London Conditioning Station',
      address: 'Shoreditch High St, London E1 6PG, United Kingdom',
      coords: '51.5242° N, 0.0784° W',
    },
    tokyo: {
      title: 'Tokyo Athletic Tech Center',
      address: '4 Chome-28 Shibuya, Tokyo 150-0002, Japan',
      coords: '35.6580° N, 139.7016° E',
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-brand-bg space-y-16" id="contact-page-container">
      
      {/* Page Title Block */}
      <div className="border-b border-neutral-900 pb-6 text-center sm:text-left" id="contact-title-block">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
          ATHLETE COORDINATION
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white uppercase mt-1">
          Liaise With The Forge
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1.5">
          Submit equipment inquiries, customized heavy rack consulting, or apparel volume solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-main-grid">
        
        {/* Left Side Column: Form & Info */}
        <div className="lg:col-span-5 space-y-8" id="contact-left-col">
          
          {/* Support Information Card */}
          <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-6 space-y-5" id="contact-coordinates-card">
            <h3 className="font-heading text-xs uppercase tracking-wider text-white border-b border-neutral-900 pb-3.5">
              Support Coordinates
            </h3>
            
            <div className="space-y-4 text-xs font-sans text-neutral-400">
              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <Mail className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-[10px] tracking-wider text-white uppercase mb-0.5">Email Support</h4>
                  <a href="mailto:support@ironpulsefitness.com" className="hover:text-accent transition-colors font-mono">
                    support@ironpulsefitness.com
                  </a>
                  <p className="text-[10px] text-neutral-600 mt-0.5">Response under 12 hours guaranteed.</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3.5">
                <Phone className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-[10px] tracking-wider text-white uppercase mb-0.5">Phone Hotline</h4>
                  <a href="tel:+18005552739" className="hover:text-accent transition-colors font-mono">
                    +1 (800) 555-PULSE
                  </a>
                  <p className="text-[10px] text-neutral-600 mt-0.5">Mon–Fri: 8:00 AM – 6:00 PM EST.</p>
                </div>
              </div>

              {/* Response Pledge */}
              <div className="flex items-start space-x-3.5">
                <Clock className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-[10px] tracking-wider text-white uppercase mb-0.5">Athletic Pledge</h4>
                  <p className="leading-relaxed">
                    Zero automated run-arounds. You will always match with a real sports bio-mechanic or apparel expert.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-6" id="contact-form-box">
            <h3 className="font-heading text-xs uppercase tracking-wider text-white border-b border-neutral-900 pb-3.5 mb-5">
              Inquiry Transmission Form
            </h3>

            {submitted ? (
              <div className="text-center py-8 space-y-4 text-accent" id="contact-success-panel">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                  <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h4 className="font-heading text-xs tracking-wider uppercase">SECURE TRANSMISSION COMPLETE</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xs mx-auto">
                  Thank you, <strong className="text-white">{formData.name || 'Athlete'}</strong>. Your request has been logged safely. A specialist will match with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-sm border border-neutral-800 bg-neutral-900 text-xs font-heading tracking-widest uppercase px-5 py-2 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-fields-form">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full rounded-sm bg-neutral-900 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@athlete.com"
                    className="w-full rounded-sm bg-neutral-900 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                    Inquiry Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type details of your gym gear requirements..."
                    className="w-full rounded-sm bg-neutral-900 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center space-x-2 rounded-sm bg-accent py-3 text-xs font-heading tracking-widest text-black hover:bg-white transition-all duration-300"
                  id="contact-submit-btn"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Side Column: Vector Map Widget */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6" id="contact-right-col">
          <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-6 flex-1 flex flex-col justify-between" id="map-widget-box">
            
            {/* Map Header */}
            <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-neutral-900 pb-4 mb-4">
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase font-bold">SATELLITE BEACON INDICATORS</span>
                <h3 className="font-heading text-xs text-white uppercase mt-0.5">Physical Hub Locator Map</h3>
              </div>
              <div className="flex space-x-2.5 mt-2 sm:mt-0 font-mono text-[10px]">
                <button
                  onClick={() => setActivePin('seattle')}
                  className={`px-2 py-0.5 rounded-sm transition-colors ${
                    activePin === 'seattle' ? 'bg-accent text-black font-semibold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  SEATTLE
                </button>
                <button
                  onClick={() => setActivePin('london')}
                  className={`px-2 py-0.5 rounded-sm transition-colors ${
                    activePin === 'london' ? 'bg-accent text-black font-semibold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  LONDON
                </button>
                <button
                  onClick={() => setActivePin('tokyo')}
                  className={`px-2 py-0.5 rounded-sm transition-colors ${
                    activePin === 'tokyo' ? 'bg-accent text-black font-semibold' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  TOKYO
                </button>
              </div>
            </div>

            {/* Custom Vector Obsidian-Green Map Canvas */}
            <div className="relative h-64 sm:h-80 w-full rounded-sm bg-neutral-950 border border-neutral-900 overflow-hidden flex items-center justify-center p-4" id="vector-map-frame">
              {/* Styled Cyber Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
              
              {/* Stylized Abstract World outline map in SVG */}
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-35 text-neutral-800" referrerPolicy="no-referrer">
                {/* Mock abstract paths for visual map outline */}
                <path fill="currentColor" d="M150,120 Q180,90 220,110 T280,140 T320,130 Q360,110 390,140 T440,180 T480,160 Q520,120 570,140 T620,180 T680,130 T730,150 L750,190 L700,240 Q670,280 620,290 T540,260 T480,220 Q440,200 390,230 T320,280 T260,250 T200,220 L130,180 Z" />
                <path fill="currentColor" d="M50,220 Q70,180 110,210 T160,230 L180,260 L140,290 T80,270 Z" />
              </svg>

              {/* Real Pin Indicators with Pulse animations */}
              {/* Seattle Pin (US West Coast approx 22% X, 35% Y) */}
              <div
                className="absolute transition-all duration-500 cursor-pointer"
                style={{ left: '22%', top: '35%' }}
                onClick={() => setActivePin('seattle')}
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePin === 'seattle' ? 'bg-accent' : 'bg-neutral-600'}`}></span>
                </div>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-neutral-800 px-1.5 py-0.5 rounded-sm text-[8px] font-mono text-white tracking-widest whitespace-nowrap">
                  SEATTLE
                </span>
              </div>

              {/* London Pin (UK approx 48% X, 32% Y) */}
              <div
                className="absolute transition-all duration-500 cursor-pointer"
                style={{ left: '48%', top: '32%' }}
                onClick={() => setActivePin('london')}
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePin === 'london' ? 'bg-accent' : 'bg-neutral-600'}`}></span>
                </div>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-neutral-800 px-1.5 py-0.5 rounded-sm text-[8px] font-mono text-white tracking-widest whitespace-nowrap">
                  LONDON
                </span>
              </div>

              {/* Tokyo Pin (Japan approx 76% X, 42% Y) */}
              <div
                className="absolute transition-all duration-500 cursor-pointer"
                style={{ left: '76%', top: '42%' }}
                onClick={() => setActivePin('tokyo')}
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${activePin === 'tokyo' ? 'bg-accent' : 'bg-neutral-600'}`}></span>
                </div>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-neutral-800 px-1.5 py-0.5 rounded-sm text-[8px] font-mono text-white tracking-widest whitespace-nowrap">
                  TOKYO
                </span>
              </div>

              {/* Globe grid telemetry details in bottom corner */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-neutral-950 border border-neutral-900 px-2.5 py-1.5 rounded-sm text-[8px] font-mono text-neutral-500">
                <Globe className="h-3 w-3 text-accent animate-spin" style={{ animationDuration: '10s' }} />
                <span>GRID: IRONPULSE_GLOBAL_NET_SECURE</span>
              </div>
            </div>

            {/* Selected Location Meta readout */}
            <div className="mt-4 rounded-sm bg-neutral-950 border border-neutral-900 p-4 space-y-1.5" id="location-meta-display">
              <div className="flex justify-between items-baseline">
                <h4 className="font-heading text-xs text-white uppercase tracking-wider">
                  {locations[activePin].title}
                </h4>
                <span className="font-mono text-[9px] text-accent font-semibold tracking-widest">
                  {locations[activePin].coords}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                <MapPin className="h-3 w-3 text-accent inline mr-1.5 shrink-0 -mt-0.5" />
                {locations[activePin].address}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
