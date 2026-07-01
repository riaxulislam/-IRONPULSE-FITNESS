import React from 'react';
import HeroSection from '../components/HeroSection';
import BenefitsSection from '../components/BenefitsSection';
import FeaturedCollections from '../components/FeaturedCollections';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import MembershipBookingSection from '../components/MembershipBookingSection';
import { Product, Page } from '../types';

interface HomeProps {
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onSelectProduct: (product: Product) => void;
  setCurrentPage: (page: Page) => void;
  onSubscribe: (email: string) => void;
}

export default function Home({
  onAddToCart,
  onSelectProduct,
  setCurrentPage,
  onSubscribe,
}: HomeProps) {
  return (
    <div id="home-page-container">
      {/* 1. Hero Section */}
      <HeroSection onCtaClick={setCurrentPage} />

      {/* 2. Featured Collections Grid */}
      <FeaturedCollections
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        onViewAllClick={setCurrentPage}
      />

      {/* 3. Core Benefits Block */}
      <BenefitsSection />

      {/* 4. Gym Membership & Consultation Appointment Booking Form */}
      <MembershipBookingSection />

      {/* 5. Testimonials Slider */}
      <TestimonialsSection />

      {/* 6. Newsletter subscription */}
      <NewsletterSection onSubscribe={onSubscribe} />
    </div>
  );
}

