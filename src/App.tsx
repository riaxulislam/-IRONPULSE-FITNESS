/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Sparkles, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Page, Product, CartItem } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  // Page routing
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart logic
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Toast System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Checkout Receipt Modal
  const [completedOrder, setCompletedOrder] = useState<{
    items: CartItem[];
    total: number;
    discount: number;
    orderId: string;
  } | null>(null);

  // Handle active page changes
  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to trigger toast
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // Automatically dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sync cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ironpulse_fitness_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart details', e);
      }
    }
  }, []);

  // Write cart to localStorage on changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('ironpulse_fitness_cart', JSON.stringify(updatedCart));
  };

  // 1. Add to cart
  const handleAddToCart = (product: Product, color: string, size: string, qty: number) => {
    const cartItemId = `${product.id}-${color.replace(/\s+/g, '-').toLowerCase()}-${size.toLowerCase()}`;
    const existingIndex = cartItems.findIndex((item) => item.id === cartItemId);

    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      // Increment existing
      const existingItem = updatedCart[existingIndex];
      updatedCart[existingIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + qty,
      };
    } else {
      // Add new
      updatedCart.push({
        id: cartItemId,
        product,
        quantity: qty,
        selectedColor: color,
        selectedSize: size,
      });
    }

    saveCartToStorage(updatedCart);
    triggerToast(`Added ${qty}x ${product.name} (${size} / ${color}) to cart.`);
    
    // Auto-open cart for premium Shopify conversion flow
    setTimeout(() => {
      setCartOpen(true);
    }, 400);
  };

  // 2. Remove from cart
  const handleRemoveFromCart = (itemId: string) => {
    const itemToRemove = cartItems.find((i) => i.id === itemId);
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    saveCartToStorage(updatedCart);
    
    if (itemToRemove) {
      triggerToast(`Removed ${itemToRemove.product.name} from cart.`, 'info');
    }
  };

  // 3. Update item quantities
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  // 4. Clear all cart items
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // 5. Checkout simulation success callback
  const handleCheckoutSuccess = (orderSummary: { items: CartItem[]; total: number; discount: number }) => {
    const randomOrderId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrder({
      ...orderSummary,
      orderId: randomOrderId,
    });
  };

  // 6. User clicks on a specific product card to view detailed template
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (email: string) => {
    triggerToast(`Subscribed successfully! Check ${email} for code: PULSE15`);
  };

  // Total items in cart count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-white" id="ironpulse-app-root">
      
      {/* Dynamic Announcement Ticker bar */}
      <div className="bg-accent text-black py-2 px-4 text-center text-[10px] font-heading font-bold tracking-[0.2em] uppercase select-none" id="announcement-ticker">
        SUMMER CAPSULE DROPPED // CODE: PULSE15 FOR 15% OFF ALL APPAREL • FREE GLOBAL SHIPPING OVER $150
      </div>

      {/* Main sticky navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Core SPA Router pages manager */}
      <main className="flex-grow" id="spa-page-viewer">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage === 'product' && selectedProduct ? `prod-${selectedProduct.id}` : currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {currentPage === 'home' && (
              <Home
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
                setCurrentPage={handlePageChange}
                onSubscribe={handleSubscribe}
              />
            )}
            
            {currentPage === 'shop' && (
              <Shop
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
              />
            )}
            
            {currentPage === 'product' && selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
                onBackToShop={() => handlePageChange('shop')}
              />
            )}
            
            {currentPage === 'about' && (
              <About />
            )}
            
            {currentPage === 'contact' && (
              <Contact />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Main structured footer */}
      <Footer
        setCurrentPage={handlePageChange}
        onSubscribe={handleSubscribe}
      />

      {/* Cart Drawer sliding panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Micro-interactive Notification Toast pop-ups */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center space-x-3.5 rounded-sm bg-neutral-900 border border-neutral-800 p-4 text-xs shadow-2xl text-white min-w-[280px] sm:min-w-[340px]"
            id="toast-notification"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div className="flex-1 pr-4">
              <p className="font-heading text-[10px] tracking-wider uppercase text-neutral-500">Store Alert</p>
              <p className="text-[11px] text-neutral-300 font-sans mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Success Receipt Modal Overlay */}
      <AnimatePresence>
        {completedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" id="checkout-receipt-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-sm bg-neutral-950 border border-neutral-800 p-6 space-y-6 shadow-2xl relative"
            >
              {/* Confetti header check */}
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-black">
                  <CheckCircle2 className="h-7 w-7 stroke-[2.5]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent font-bold block uppercase">
                  TRANSACTION DISPATCHED SECURELY
                </span>
                <h3 className="font-heading text-lg text-white uppercase">
                  ORDER ACQUIRED!
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  We have registered your details. Preparing your athletic gear.
                </p>
              </div>

              {/* Order Receipt breakdown list */}
              <div className="rounded-sm border border-neutral-900 bg-[#070707] p-4.5 space-y-3.5" id="receipt-box">
                <div className="flex justify-between border-b border-neutral-900 pb-2.5 text-[10px] font-mono text-neutral-500">
                  <span>ORDER CODE: {completedOrder.orderId}</span>
                  <span>EST. DELIVERY: 2-3 DAYS</span>
                </div>

                {/* Items loop */}
                <div className="max-h-36 overflow-y-auto space-y-2.5 pr-1.5 scrollbar" id="receipt-items-list">
                  {completedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs font-sans">
                      <span className="text-neutral-400 line-clamp-1 pr-6 flex-1">
                        {item.quantity}x {item.product.name}
                        <span className="text-[10px] font-mono text-neutral-600 block">
                          Size: {item.selectedSize} / Color: {item.selectedColor}
                        </span>
                      </span>
                      <span className="font-mono text-white font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial overview */}
                <div className="border-t border-neutral-900 pt-3 space-y-1.5 text-xs">
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-[11px] text-accent">
                      <span>Coupon Discount</span>
                      <span className="font-mono">-${completedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-neutral-400">
                    <span>Est. Shipping & Handling</span>
                    <span className="font-mono text-white">FREE</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-900 pt-2.5 font-bold text-sm">
                    <span className="text-white font-heading">GRAND TOTAL CHARGED</span>
                    <span className="font-mono text-accent">${completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Secure note */}
              <div className="flex items-center space-x-2 rounded-sm bg-neutral-900/50 border border-neutral-900 p-3 text-[10px] text-neutral-500 font-sans justify-center">
                <Sparkles className="h-4 w-4 text-accent shrink-0 animate-pulse" />
                <span>Shopify tracking code has been transmitted to your email.</span>
              </div>

              {/* Return btn */}
              <button
                onClick={() => setCompletedOrder(null)}
                className="w-full rounded-sm bg-accent py-3 text-xs font-heading tracking-widest text-black hover:bg-white transition-colors uppercase"
                id="receipt-modal-close"
              >
                RETURN TO CATALOG
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
