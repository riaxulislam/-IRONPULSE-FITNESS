import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product, Page } from '../types';
import ProductCard from './ProductCard';

interface FeaturedCollectionsProps {
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onSelectProduct: (product: Product) => void;
  onViewAllClick: (page: Page) => void;
}

export default function FeaturedCollections({
  onAddToCart,
  onSelectProduct,
  onViewAllClick,
}: FeaturedCollectionsProps) {
  // Grab first 4 flagship products
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="bg-[#0a0a0a] py-20" id="featured-products-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 border-b border-neutral-900 pb-5" id="featured-header">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
              CURATED TRAINING GEAR
            </span>
            <h2 className="font-heading text-xl sm:text-2xl text-white uppercase mt-1">
              Featured Products
            </h2>
          </div>
          
          <button
            onClick={() => onViewAllClick('shop')}
            className="flex items-center space-x-1 text-xs font-heading tracking-widest text-neutral-400 hover:text-accent transition-colors mt-3 sm:mt-0 uppercase"
            id="featured-view-all-btn"
          >
            <span>EXPLORE ALL CAPSULE</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2]" />
          </button>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4" id="featured-products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
