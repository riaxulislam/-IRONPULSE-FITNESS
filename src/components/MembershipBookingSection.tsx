/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Database, 
  Trash2, 
  Check, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface GymMembershipPlan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  badge?: string;
  features: string[];
  color: string;
}

const MEMBERSHIP_PLANS: GymMembershipPlan[] = [
  {
    id: 'base',
    name: 'IronPulse Base Access',
    price: 49,
    tagline: 'Standard access for disciplined athletes.',
    features: [
      'Full access to all Strength & Conditioning zones',
      'Standard digital locker rooms & showers',
      '1x Complimentary InBody fitness evaluation',
      'Access to standard group training sessions',
      'Elite tracking app integration'
    ],
    color: 'border-neutral-800 hover:border-neutral-700'
  },
  {
    id: 'pro',
    name: 'IronPulse Pro Conditioning',
    price: 89,
    tagline: 'Unrestricted entry and comprehensive recovery.',
    badge: 'MOST POPULAR',
    features: [
      '24/7 biometric gym entry authorization',
      'Priority bookings for elite conditioning classes',
      'Full locker with premium laundry services',
      'Sauna, Cold Plunge, & Hyperbaric oxygen access',
      '10% constant discount on IronPulse Fitness gear'
    ],
    color: 'border-accent shadow-[0_0_15px_rgba(202,253,0,0.15)] bg-neutral-950/70'
  },
  {
    id: 'elite',
    name: 'IronPulse Elite VIP Coaching',
    price: 149,
    tagline: 'All-inclusive guidance, coaching, and premium fuels.',
    badge: 'UNLIMITED VALUE',
    features: [
      '2x 1-on-1 private personal training sessions / mo',
      'Sauna, Cold Plunge, & unlimited recovery zone access',
      '100% customized athletic nutrition & diet mapping',
      'Free daily protein shake at the IronPulse Fuel Bar',
      'Unlimited guest passes (1 guest per session)'
    ],
    color: 'border-purple-500/50 hover:border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
  }
];

interface BookingSubmission {
  id: string;
  planId: string;
  planName: string;
  planPrice: number;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  timeSlot: string;
  goal: string;
  notes: string;
  status: 'pending' | 'contacted' | 'confirmed';
  submittedAt: string;
}

export default function MembershipBookingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [goal, setGoal] = useState('Strength & Power');
  const [notes, setNotes] = useState('');
  
  // App states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<BookingSubmission | null>(null);
  
  // Staff database dashboard states
  const [submissions, setSubmissions] = useState<BookingSubmission[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  // Sync submissions on load
  useEffect(() => {
    const saved = localStorage.getItem('ironpulse_fitness_gym_bookings');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse gym bookings', e);
      }
    }
  }, []);

  const saveSubmissions = (updated: BookingSubmission[]) => {
    setSubmissions(updated);
    localStorage.setItem('ironpulse_fitness_gym_bookings', JSON.stringify(updated));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !startDate) {
      return;
    }

    setIsSubmitting(true);

    const planObj = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[1];

    setTimeout(() => {
      const newBooking: BookingSubmission = {
        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        planId: selectedPlan,
        planName: planObj.name,
        planPrice: planObj.price,
        fullName,
        email,
        phone,
        startDate,
        timeSlot,
        goal,
        notes,
        status: 'pending',
        submittedAt: new Date().toLocaleString()
      };

      const updatedList = [newBooking, ...submissions];
      saveSubmissions(updatedList);
      
      setSuccessBooking(newBooking);
      setIsSubmitting(false);

      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setStartDate('');
      setTimeSlot('morning');
      setGoal('Strength & Power');
      setNotes('');
    }, 1200);
  };

  // Delete booking
  const handleDeleteBooking = (id: string) => {
    const updated = submissions.filter(item => item.id !== id);
    saveSubmissions(updated);
  };

  // Update status (e.g., mark as contacted or confirmed)
  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'contacted' | 'confirmed') => {
    const updated = submissions.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    saveSubmissions(updated);
  };

  const currentPlanDetails = MEMBERSHIP_PLANS.find(p => p.id === selectedPlan) || MEMBERSHIP_PLANS[1];

  return (
    <section className="relative py-24 px-4 bg-black border-t border-b border-neutral-900" id="membership-booking-section">
      {/* Background visual grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header container */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] font-mono font-bold uppercase">
              RECRUITMENT OPEN • SEASON 01
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-tight">
            BUILD YOUR PHYSICAL <span className="text-accent italic">ULTIMATUM</span>
          </h2>
          <p className="text-sm text-neutral-400 font-sans">
            Secure your monthly subscription below. Book an onboarding tour and initial conditioning consultation. A member of our coaching staff will personally connect with you to confirm enrollment.
          </p>
        </div>

        {/* 1. Subscription Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer transition-all duration-300 relative rounded-sm p-6 border flex flex-col justify-between ${
                  isSelected 
                    ? 'border-accent bg-neutral-950 shadow-[0_0_20px_rgba(202,253,0,0.1)] scale-[1.02]' 
                    : 'border-neutral-900 bg-[#060606] hover:bg-neutral-950/40 hover:border-neutral-800'
                }`}
                id={`plan-card-${plan.id}`}
              >
                {plan.badge && (
                  <span className={`absolute -top-3 right-4 px-2 py-0.5 rounded-sm text-[8px] font-mono tracking-widest font-bold text-black ${
                    plan.id === 'elite' ? 'bg-purple-500 text-white' : 'bg-accent'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg text-white uppercase tracking-wider">{plan.name}</h3>
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-accent bg-accent text-black' : 'border-neutral-800'
                    }`}>
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans mb-6 leading-relaxed min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline space-x-1.5 mb-8">
                    <span className="font-mono text-3xl font-bold text-white">${plan.price}</span>
                    <span className="font-sans text-xs text-neutral-500">/ month</span>
                  </div>

                  <div className="border-t border-neutral-900 pt-6 space-y-3.5">
                    <span className="font-mono text-[9px] tracking-wider text-neutral-500 block uppercase font-bold">
                      INCLUDED IN BENEFITS
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-neutral-300">
                          <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5 mr-2" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-900/60">
                  <span className={`w-full py-2.5 text-center text-[10px] tracking-widest font-heading font-bold rounded-sm block transition-colors uppercase ${
                    isSelected 
                      ? 'bg-accent text-black' 
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                  }`}>
                    {isSelected ? 'SELECTED PLAN' : 'SELECT PLAN'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Interactive Booking Grid (Form on left, plan dynamic check list on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="booking-grid-wrapper">
          
          {/* Form container */}
          <div className="lg:col-span-7 bg-[#050505] border border-neutral-900 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-5">
              <div>
                <h4 className="font-heading text-lg text-white uppercase tracking-wider">
                  MEMBERSHIP APPLICATION
                </h4>
                <p className="text-xs text-neutral-500 font-sans mt-1">
                  Selected Subscription: <span className="text-accent font-semibold">{currentPlanDetails.name} (${currentPlanDetails.price}/mo)</span>
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5" id="gym-appointment-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-600" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Aurelius"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black border border-neutral-800 focus:border-accent text-xs text-white rounded-sm py-3.5 pl-11 pr-4 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-600" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@ironpulsefitness.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-neutral-800 focus:border-accent text-xs text-white rounded-sm py-3.5 pl-11 pr-4 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-600" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 382-9011"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-neutral-800 focus:border-accent text-xs text-white rounded-sm py-3.5 pl-11 pr-4 focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                    Desired Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-600 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-black border border-neutral-800 focus:border-accent text-xs text-white rounded-sm py-3.5 pl-11 pr-4 focus:outline-none transition-colors font-sans scheme-dark"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                  Best Tour & Consultation Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'morning', label: 'Morning', time: '08:00 AM - 12:00 PM' },
                    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 05:00 PM' },
                    { id: 'evening', label: 'Evening', time: '05:00 PM - 09:00 PM' }
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setTimeSlot(slot.id)}
                      className={`py-3 rounded-sm border text-center transition-colors ${
                        timeSlot === slot.id
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-neutral-900 bg-black text-neutral-400 hover:border-neutral-800 hover:text-white'
                      }`}
                    >
                      <span className="font-heading text-[10px] block uppercase tracking-wider">{slot.label}</span>
                      <span className="text-[8px] font-mono text-neutral-500 mt-0.5 block">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                  Primary Athletic Objective
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Strength & Power',
                    'Cardio & Stamina',
                    'Aesthetic & Leanness',
                    'Movement Rehab',
                    'Premium Wellness'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGoal(item)}
                      className={`px-3 py-2 text-[10px] font-mono uppercase border rounded-full transition-all ${
                        goal === item
                          ? 'border-accent bg-accent text-black font-bold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold block">
                  Additional Requests / Fitness Background (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell our training coaches about any past injuries, personal goals, or special equipment requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black border border-neutral-800 focus:border-accent text-xs text-white rounded-sm p-4.5 focus:outline-none transition-colors font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-white text-black font-heading font-bold text-xs tracking-widest py-4 rounded-sm transition-colors flex items-center justify-center space-x-2 uppercase"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>SECURED CHANNEL FORWARDING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT BOOKING APPLICATION</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-500 font-sans mt-4">
                <ShieldCheck className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Encrypted secure intake. No pre-payment required today.</span>
              </div>
            </form>
          </div>

          {/* Side Info / Security Board */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual onboarding guide banner */}
            <div className="bg-[#050505] border border-neutral-900 rounded-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-28 w-28 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                <Activity className="h-4 w-4 text-accent" />
                <span>Onboarding Protocol</span>
              </h4>
              <ol className="space-y-4 text-xs font-sans text-neutral-300">
                <li className="flex items-start">
                  <span className="font-mono text-accent text-[10px] font-bold bg-accent/15 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    01
                  </span>
                  <div>
                    <strong className="text-white">Submit Intake Telemetry</strong>
                    <p className="text-neutral-400 mt-0.5 text-[11px]">Select your tier above, input correct contact info, and submit the application.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-mono text-accent text-[10px] font-bold bg-accent/15 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    02
                  </span>
                  <div>
                    <strong className="text-white">Personal Lead Verification</strong>
                    <p className="text-neutral-400 mt-0.5 text-[11px]">Our Head Coach will review your athletic profile and personally call/email you to verify details.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-mono text-accent text-[10px] font-bold bg-accent/15 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    03
                  </span>
                  <div>
                    <strong className="text-white">Onboarding & Gym Tour</strong>
                    <p className="text-neutral-400 mt-0.5 text-[11px]">Complete a premium walk-through of the IronPulse Fitness facility, claim your biometric pass, and activate the subscription.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Submissions Admin log switch */}
            <div className="bg-[#070707] border border-neutral-900 rounded-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h5 className="font-heading text-[11px] tracking-wider text-neutral-300 uppercase">
                    IronPulse Store Manager Desk
                  </h5>
                  <p className="text-[10px] font-sans text-neutral-500">
                    Verify received leads and booking submissions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDashboard(!showDashboard)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 border border-neutral-800 hover:border-accent text-neutral-400 hover:text-accent rounded-sm text-[10px] font-mono uppercase transition-colors"
                >
                  {showDashboard ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5" />
                      <span>Hide Database ({submissions.length})</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Database ({submissions.length})</span>
                    </>
                  )}
                </button>
              </div>

              {!showDashboard && (
                <div className="border border-dashed border-neutral-900 rounded-sm p-4 text-center">
                  <Database className="h-5 w-5 text-neutral-800 mx-auto mb-2" />
                  <p className="text-[10px] font-mono text-neutral-600 uppercase">
                    ADMIN DESK LOCKED • PRESS BUTTON TO INSPECT LEADS
                  </p>
                </div>
              )}

              {showDashboard && (
                <div className="space-y-3" id="submissions-dashboard-content">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 border-b border-neutral-900 pb-2">
                    <span>RECEIVED LEADS ({submissions.length})</span>
                    {submissions.length > 0 && (
                      <button 
                        onClick={() => { if(confirm("Clear all received submissions from localStorage?")) saveSubmissions([]); }}
                        className="text-red-500 hover:text-red-400 flex items-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>CLEAR ALL</span>
                      </button>
                    )}
                  </div>

                  {submissions.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500 text-xs font-sans">
                      No applications submitted yet. Try filling out the form to watch database capture in real time!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1.5 scrollbar" id="submissions-log-items">
                      {submissions.map((lead) => (
                        <div key={lead.id} className="bg-black border border-neutral-900 rounded-sm p-3.5 space-y-2.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-mono text-[9px] text-accent font-bold bg-accent/10 px-1.5 py-0.5 rounded-sm">
                                {lead.id}
                              </span>
                              <span className="ml-2 font-mono text-[9px] text-neutral-400">
                                {lead.submittedAt}
                              </span>
                            </div>
                            
                            {/* Lead status buttons */}
                            <div className="flex items-center space-x-1">
                              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold ${
                                lead.status === 'confirmed' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : lead.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-yellow-500/10 text-yellow-500'
                              }`}>
                                {lead.status}
                              </span>
                            </div>
                          </div>

                          <div className="text-xs space-y-1">
                            <p className="font-semibold text-white font-heading uppercase text-[11px]">{lead.fullName}</p>
                            <p className="text-neutral-400 text-[10px] font-mono">{lead.email} | {lead.phone}</p>
                            <div className="text-neutral-500 text-[10px] grid grid-cols-2 gap-y-1 bg-neutral-950/40 p-2 border border-neutral-950 rounded-sm">
                              <div>Plan: <span className="text-neutral-300 font-bold">{lead.planName}</span></div>
                              <div>Price: <span className="text-neutral-300 font-mono">${lead.planPrice}/mo</span></div>
                              <div>Start: <span className="text-neutral-300 font-mono">{lead.startDate}</span></div>
                              <div>Slot: <span className="text-neutral-300 capitalize">{lead.timeSlot}</span></div>
                              <div className="col-span-2">Goal: <span className="text-accent">{lead.goal}</span></div>
                            </div>
                            {lead.notes && (
                              <p className="text-[10px] italic text-neutral-400 bg-neutral-950 p-2 border border-neutral-950 rounded-sm">
                                "{lead.notes}"
                              </p>
                            )}
                          </div>

                          <div className="flex justify-between border-t border-neutral-950 pt-2 text-[10px]">
                            <div className="flex items-center space-x-1">
                              <span className="text-neutral-500 font-mono text-[9px]">Follow Up:</span>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                                className="px-1.5 py-0.5 bg-neutral-900 text-neutral-300 hover:bg-blue-900/40 hover:text-blue-300 rounded-sm text-[8px] font-mono transition-colors"
                              >
                                Mark Contacted
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'confirmed')}
                                className="px-1.5 py-0.5 bg-neutral-900 text-neutral-300 hover:bg-green-900/40 hover:text-green-300 rounded-sm text-[8px] font-mono transition-colors"
                              >
                                Mark Confirmed
                              </button>
                            </div>

                            <button
                              onClick={() => handleDeleteBooking(lead.id)}
                              className="text-neutral-600 hover:text-red-400 p-0.5 transition-colors"
                              title="Delete Submission"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Booking Success modal overlay */}
      <AnimatePresence>
        {successBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="booking-success-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-sm bg-neutral-950 border border-neutral-800 p-6 space-y-6 shadow-2xl relative text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-black">
                <CheckCircle2 className="h-7 w-7 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent font-bold block uppercase">
                  APPLICATION REGISTRATION COMPLETED
                </span>
                <h3 className="font-heading text-lg text-white uppercase">
                  INTAKE TELEMETRY CAPTURED
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Excellent choice, <span className="text-white font-semibold">{successBooking.fullName}</span>. Your application for <span className="text-accent font-semibold">{successBooking.planName}</span> subscription is safely pending verification.
                </p>
              </div>

              <div className="rounded-sm bg-neutral-900/50 border border-neutral-900 p-4 text-left space-y-2 text-xs font-sans">
                <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-wider text-center border-b border-neutral-900 pb-2 mb-2">
                  Booking Receipt: {successBooking.id}
                </p>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Contact Email:</span>
                  <span className="text-white font-mono">{successBooking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Desired Start:</span>
                  <span className="text-white font-mono">{successBooking.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Time Slot:</span>
                  <span className="text-white font-mono capitalize">{successBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Primary Goal:</span>
                  <span className="text-accent font-semibold">{successBooking.goal}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
                  Our gym manager/coaching staff has received this submission. We will personally review your file and contact you via phone or email within 24 hours to confirm your membership badge and coordinate your onboarding tour.
                </p>
                <button
                  onClick={() => setSuccessBooking(null)}
                  className="w-full rounded-sm bg-accent py-3 text-xs font-heading tracking-widest text-black hover:bg-white transition-colors uppercase"
                  id="success-modal-dismiss-btn"
                >
                  DISMISS PROMPT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
