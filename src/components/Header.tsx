import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

const logoImg = '/src/assets/images/apex_forge_logo_1782839642460.jpg';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop All', page: 'shop' },
    { label: 'About Brand', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-[#0a0a0af2] backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            className="flex cursor-pointer items-center space-x-3 group"
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
            id="header-logo-container"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-950 border border-neutral-800 transition-all duration-300 group-hover:scale-105 group-hover:border-accent">
              <img 
                src={logoImg} 
                alt="IronPulse Fitness Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-heading text-xl tracking-[0.15em] text-white">
              IRONPULSE FITNESS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`relative py-2 text-xs font-heading tracking-widest uppercase transition-colors duration-200 ${
                  currentPage === item.page ? 'text-accent' : 'text-neutral-400 hover:text-white'
                }`}
                id={`nav-item-${item.page}`}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4" id="header-actions">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-400 transition-colors hover:text-white group border border-neutral-900 rounded-sm hover:border-neutral-800"
              aria-label="Open cart"
              id="header-cart-trigger"
            >
              <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black shadow-lg shadow-accent/20"
                    id="cart-badge-count"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-neutral-400 transition-colors hover:text-white md:hidden border border-neutral-900 rounded-sm"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-30 border-b border-neutral-900 bg-brand-bg md:hidden"
            id="mobile-nav-menu"
          >
            <div className="space-y-1 px-4 py-6 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-heading tracking-wider uppercase transition-colors ${
                    currentPage === item.page ? 'text-accent' : 'text-neutral-400'
                  }`}
                  id={`mobile-nav-item-${item.page}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-neutral-900">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="flex w-full items-center justify-between rounded-sm bg-neutral-950 p-4 text-xs font-heading tracking-widest text-white hover:bg-neutral-900 transition-colors"
                  id="mobile-nav-cart-trigger"
                >
                  <span>VIEW SHOPPING CART</span>
                  <div className="flex items-center space-x-2">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-black">
                      {cartCount}
                    </span>
                    <ShoppingBag className="h-4 w-4 text-neutral-400" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
