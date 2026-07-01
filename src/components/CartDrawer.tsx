import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Lock, Percent, ShoppingBag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (orderSummary: { items: CartItem[]; total: number; discount: number }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percentage, e.g. 15 for 15%
  const [appliedCodeLabel, setAppliedCodeLabel] = useState('');
  const [couponError, setCouponError] = useState('');
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);

  // Constants
  const FREE_SHIPPING_THRESHOLD = 150;
  const SHIPPING_COST = 9.99;

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (appliedDiscount / 100);
  const discountableSubtotal = subtotal - discountAmount;
  
  const isFreeShipping = discountableSubtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : SHIPPING_COST;
  const tax = discountableSubtotal * 0.08; // 8% sales tax
  const total = discountableSubtotal + shipping + tax;

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const distanceToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === 'PULSE15') {
      setAppliedDiscount(15);
      setAppliedCodeLabel('PULSE15 (15% OFF)');
      setCouponCode('');
    } else if (cleanCode === 'PULSE10') {
      setAppliedDiscount(10);
      setAppliedCodeLabel('PULSE10 (10% OFF)');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon. Try "PULSE15" or "PULSE10"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setAppliedCodeLabel('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutProcessing(true);
    
    // Simulate Shopify checkout processing
    setTimeout(() => {
      setCheckoutProcessing(false);
      onCheckoutSuccess({
        items: [...cartItems],
        total: total,
        discount: discountAmount,
      });
      onClearCart();
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            id="cart-drawer-backdrop"
          />

          {/* Drawer Element */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-neutral-950 border-l border-neutral-900 shadow-2xl sm:max-w-md"
            id="cart-drawer-panel"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 p-5" id="cart-drawer-header">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h2 className="font-heading text-base text-white">YOUR CART</h2>
                <span className="font-mono text-xs text-neutral-500">({cartItems.length})</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 transition-colors hover:text-white rounded-sm hover:bg-neutral-900"
                aria-label="Close cart"
                id="cart-close-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar" id="cart-drawer-body">
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex h-full flex-col items-center justify-center text-center space-y-4 py-20" id="cart-empty-state">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-sm text-white">YOUR CART IS EMPTY</h3>
                  <p className="text-xs text-neutral-500 max-w-[240px]">
                    Looks like you haven't added any elite gear to your routine yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="rounded-sm bg-accent px-6 py-2.5 text-xs font-heading tracking-widest text-black hover:bg-white transition-colors"
                    id="cart-empty-shop-now"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                /* Active Cart State */
                <>
                  {/* Shopify shipping target CRO progress bar */}
                  <div className="rounded-sm bg-neutral-900 border border-neutral-800 p-4 space-y-2.5" id="shipping-progress-box">
                    <div className="flex items-center space-x-2 text-xs text-white">
                      <Truck className="h-4 w-4 text-accent" />
                      <span className="font-sans">
                        {isFreeShipping ? (
                          <span className="font-medium text-accent">Congrats! You unlocked FREE shipping!</span>
                        ) : (
                          <span>
                            Add <strong className="font-mono">${distanceToFreeShipping.toFixed(2)}</strong> more for <strong>FREE SHIPPING</strong>
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-950 overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="space-y-4" id="cart-items-list">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start space-x-4 border-b border-neutral-900 pb-4"
                        id={`cart-item-${item.id}`}
                      >
                        {/* Product Mini Image */}
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-sm bg-neutral-900 object-cover border border-neutral-900"
                        />

                        {/* Product Meta & Controls */}
                        <div className="flex-1 space-y-1">
                          <h4 className="font-heading text-xs text-white line-clamp-1 hover:text-accent transition-colors duration-200">
                            {item.product.name}
                          </h4>
                          <div className="flex flex-wrap gap-x-2 text-[10px] text-neutral-500 uppercase font-mono">
                            <span>Color: {item.selectedColor}</span>
                            <span>•</span>
                            <span>Size: {item.selectedSize}</span>
                          </div>

                          {/* Stepper and Delete */}
                          <div className="flex items-center justify-between pt-2">
                            {/* Stepper */}
                            <div className="flex items-center border border-neutral-800 rounded-sm bg-neutral-950">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 px-2 text-neutral-400 hover:text-white transition-colors"
                                id={`qty-dec-${item.id}`}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 font-mono text-xs text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 px-2 text-neutral-400 hover:text-white transition-colors"
                                id={`qty-inc-${item.id}`}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Price and trash */}
                            <div className="flex items-center space-x-3">
                              <span className="font-mono text-xs text-white font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                                aria-label="Remove item"
                                id={`remove-item-${item.id}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Coupon Application */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2 border-b border-neutral-900 pb-5" id="cart-promo-form">
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="PULSE10 or PULSE15"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full rounded-sm bg-neutral-950 border border-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none uppercase"
                        />
                        <Percent className="absolute right-3 top-2.5 h-3.5 w-3.5 text-neutral-700" />
                      </div>
                      <button
                        type="submit"
                        className="rounded-sm bg-neutral-900 border border-neutral-800 px-4 text-xs font-heading tracking-wider text-white hover:bg-neutral-800 transition-colors uppercase"
                      >
                        APPLY
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-500">{couponError}</p>}
                    {appliedCodeLabel && (
                      <div className="flex items-center justify-between rounded-sm bg-accent/10 border border-accent/20 px-3 py-1.5 text-[10px] text-accent">
                        <span>Discount Active: {appliedCodeLabel}</span>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="font-bold underline hover:text-white transition-colors uppercase"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Cart Footer Checkout Receipt */}
            {cartItems.length > 0 && (
              <div className="border-t border-neutral-900 bg-neutral-950 p-5 space-y-4" id="cart-drawer-checkout-sheet">
                <div className="space-y-2 text-xs" id="cart-receipt-breakdown">
                  {/* Subtotal */}
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Discount line */}
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>Discount ({appliedDiscount}%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-neutral-400">
                    <span>Est. Shipping & Handling</span>
                    <span className="font-mono text-white">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Taxes */}
                  <div className="flex justify-between text-neutral-400">
                    <span>Sales Tax (8.0%)</span>
                    <span className="font-mono text-white">${tax.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between border-t border-neutral-900 pt-3 text-sm font-bold">
                    <span className="text-white font-heading">ESTIMATED TOTAL</span>
                    <span className="font-mono text-accent text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger button */}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutProcessing}
                  className="flex w-full items-center justify-center space-x-2 rounded-sm bg-accent py-3.5 text-xs font-heading tracking-widest text-black hover:bg-white transition-all duration-300 disabled:opacity-50"
                  id="checkout-trigger-btn"
                >
                  {checkoutProcessing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>SECURE SHOPPING GATEWAY...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>PROCEED TO SECURE CHECKOUT</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-neutral-600 flex items-center justify-center space-x-1.5">
                  <span>SSL SECURE ENCRYPTION PROTOCOLS ACTIVE</span>
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
