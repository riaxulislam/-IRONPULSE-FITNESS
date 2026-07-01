import React, { useState, useEffect } from 'react';
import { Star, Truck, ShieldCheck, RefreshCw, Plus, Minus, ArrowLeft, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  onSelectProduct,
  onBackToShop,
}: ProductDetailProps) {
  // Gallery view
  const [activeImage, setActiveImage] = useState(product.primaryImage);
  
  // Variants selection
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Accordion blocks state
  const [expandedTab, setExpandedTab] = useState<'desc' | 'materials' | 'usage' | null>('desc');

  // Sync state if product changes
  useEffect(() => {
    setActiveImage(product.primaryImage);
    setSelectedColor(product.colors[0] || 'Default');
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
    setExpandedTab('desc');
    
    // Smooth scroll to top when viewing new product
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Related products (from same category, max 4, exclude current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // If not enough in same category, grab other ones
  const finalRelated = relatedProducts.length >= 4 
    ? relatedProducts 
    : [...relatedProducts, ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category)].slice(0, 4);

  const handleAddToCartClick = () => {
    if (!product.inStock) return;
    onAddToCart(product, selectedColor, selectedSize, quantity);
  };

  const toggleTab = (tab: 'desc' | 'materials' | 'usage') => {
    setExpandedTab(expandedTab === tab ? null : tab);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-brand-bg" id="product-detail-page">
      {/* Back Button */}
      <button
        onClick={onBackToShop}
        className="inline-flex items-center space-x-2 text-xs font-heading tracking-widest text-neutral-400 hover:text-accent transition-colors mb-8 uppercase"
        id="detail-back-to-shop"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>BACK TO CATALOG</span>
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2" id="detail-main-layout">
        
        {/* Gallery column */}
        <div className="space-y-4" id="detail-gallery-col">
          {/* Main Viewer */}
          <div className="relative aspect-square overflow-hidden rounded-sm bg-neutral-950 border border-neutral-900 flex items-center justify-center">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 rounded-sm bg-accent text-black px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-all duration-300"
              id="main-gallery-image"
            />
          </div>

          {/* Thumbnails list */}
          <div className="grid grid-cols-2 gap-4" id="gallery-thumbnails">
            <button
              onClick={() => setActiveImage(product.primaryImage)}
              className={`aspect-square overflow-hidden rounded-sm border bg-neutral-950 transition-all ${
                activeImage === product.primaryImage
                  ? 'border-accent'
                  : 'border-neutral-900 hover:border-neutral-700'
              }`}
              id="thumbnail-primary"
            >
              <img src={product.primaryImage} alt="Primary View" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
            </button>
            
            <button
              onClick={() => setActiveImage(product.hoverImage)}
              className={`aspect-square overflow-hidden rounded-sm border bg-neutral-950 transition-all ${
                activeImage === product.hoverImage
                  ? 'border-accent'
                  : 'border-neutral-900 hover:border-neutral-700'
              }`}
              id="thumbnail-hover"
            >
              <img src={product.hoverImage} alt="Alternative View" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        {/* Content detail panel */}
        <div className="space-y-6 flex flex-col justify-between" id="detail-meta-col">
          <div>
            {/* Category and Rating star row */}
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
              <span className="uppercase tracking-widest text-accent font-semibold">{product.category} COLLECTION</span>
              <div className="flex items-center space-x-1">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-accent' : 'text-neutral-800'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-neutral-300 font-sans font-medium">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-tight" id="detail-product-title">
              {product.name}
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-2 mb-6 leading-relaxed">
              {product.tagline}
            </p>

            {/* Price section */}
            <div className="flex items-baseline space-x-3.5 border-t border-b border-neutral-900 py-4.5 mb-6" id="detail-price-box">
              <span className="font-mono text-2xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="font-mono text-base text-neutral-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              {product.inStock ? (
                <span className="text-[10px] font-heading font-bold text-accent bg-accent/10 border border-accent/20 rounded-sm px-2.5 py-0.5 tracking-wider uppercase ml-auto">
                  IN STOCK
                </span>
              ) : (
                <span className="text-[10px] font-heading font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-sm px-2.5 py-0.5 tracking-wider uppercase ml-auto">
                  OUT OF STOCK
                </span>
              )}
            </div>

            {/* VARIANT PICKERS */}
            {product.colors.length > 0 && product.colors[0] !== 'Default' && (
              <div className="space-y-2 mb-5" id="color-variant-box">
                <span className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                  Select Color: <strong className="text-white font-sans">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-sm border px-4 py-2 text-xs font-sans transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-accent bg-accent/5 text-accent font-semibold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                      id={`color-picker-${color.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && product.sizes[0] !== 'Standard' && (
              <div className="space-y-2 mb-6" id="size-variant-box">
                <span className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                  Select Size: <strong className="text-white font-mono">{selectedSize}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-11 flex items-center justify-center rounded-sm border text-xs font-mono transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-accent bg-accent/5 text-accent font-bold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                      id={`size-picker-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY AND ADD TO CART CONTROLS */}
            <div className="flex items-center space-x-4 mb-8" id="detail-actions-box">
              {/* Quantity selector */}
              <div className="space-y-1.5" id="detail-quantity-stepper">
                <span className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase">
                  QTY
                </span>
                <div className="flex h-12 items-center border border-neutral-800 bg-neutral-950 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="p-3 text-neutral-500 hover:text-white transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 font-mono text-sm text-white font-bold select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="p-3 text-neutral-500 hover:text-white transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Add To Cart Full Width Button */}
              <div className="flex-1 pt-5">
                <button
                  onClick={handleAddToCartClick}
                  disabled={!product.inStock}
                  className={`flex w-full h-12 items-center justify-center space-x-2 rounded-sm text-xs font-heading tracking-widest uppercase transition-all duration-300 ${
                    product.inStock
                      ? 'bg-accent text-black hover:bg-white'
                      : 'bg-neutral-900 text-neutral-600 border border-neutral-800 cursor-not-allowed'
                  }`}
                  id="detail-add-to-cart-trigger"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{product.inStock ? 'ADD TO SHOPPING CART' : 'OUT OF STOCK'}</span>
                </button>
              </div>
            </div>

            {/* TRUST BADGES WRAPPER: style: inline */}
            <div className="grid grid-cols-3 gap-3 border-t border-b border-neutral-900 py-4 mb-8 text-[10px] text-neutral-400 font-mono" id="detail-trust-badges">
              <div className="flex items-center space-x-1.5">
                <Truck className="h-3.5 w-3.5 text-accent" />
                <span>FREE SHIPPING over $150</span>
              </div>
              <div className="flex items-center space-x-1.5 justify-center">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>SECURE CHECKOUT</span>
              </div>
              <div className="flex items-center space-x-1.5 justify-end">
                <RefreshCw className="h-3.5 w-3.5 text-accent" />
                <span>30-DAY WARRANTY</span>
              </div>
            </div>

            {/* TAB ACCORDION SYSTEM FOR SPECS */}
            <div className="space-y-2" id="detail-tabs-accordion">
              {/* Tab 1: Description */}
              <div className="border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden">
                <button
                  onClick={() => toggleTab('desc')}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-xs font-heading tracking-wider text-white hover:bg-neutral-900 transition-colors uppercase"
                >
                  <span>1. Product Description</span>
                  {expandedTab === 'desc' ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedTab === 'desc' && (
                  <div className="px-4 pb-4 pt-1.5 text-xs text-neutral-400 font-sans leading-relaxed border-t border-neutral-900/40">
                    {product.details.description}
                  </div>
                )}
              </div>

              {/* Tab 2: Materials */}
              <div className="border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden">
                <button
                  onClick={() => toggleTab('materials')}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-xs font-heading tracking-wider text-white hover:bg-neutral-900 transition-colors uppercase"
                >
                  <span>2. Structural Materials</span>
                  {expandedTab === 'materials' ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedTab === 'materials' && (
                  <div className="px-4 pb-4 pt-1.5 text-xs text-neutral-400 font-sans leading-relaxed border-t border-neutral-900/40">
                    {product.details.materials}
                  </div>
                )}
              </div>

              {/* Tab 3: Usage */}
              <div className="border border-neutral-900 rounded-sm bg-neutral-950 overflow-hidden">
                <button
                  onClick={() => toggleTab('usage')}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-xs font-heading tracking-wider text-white hover:bg-neutral-900 transition-colors uppercase"
                >
                  <span>3. Intended Usage & Maintenance</span>
                  {expandedTab === 'usage' ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {expandedTab === 'usage' && (
                  <div className="px-4 pb-4 pt-1.5 text-xs text-neutral-400 font-sans leading-relaxed border-t border-neutral-900/40">
                    {product.details.usage}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RELATED PRODUCTS: columns: 4 */}
      <div className="mt-20 border-t border-neutral-900 pt-16" id="related-products-block">
        <div className="text-center sm:text-left mb-10">
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">MATCHING TELEMETRY</span>
          <h2 className="font-heading text-xl text-white uppercase mt-1">Related Products</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4" id="related-grid-stage">
          {finalRelated.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
