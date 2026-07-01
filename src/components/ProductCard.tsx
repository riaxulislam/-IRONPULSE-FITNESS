import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
}: ProductCardProps) {
  const {
    name,
    price,
    compareAtPrice,
    badge,
    primaryImage,
    hoverImage,
    rating,
    reviewsCount,
    inStock,
  } = product;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;
    // Add default first color and first size
    const defaultColor = product.colors[0] || 'Default';
    const defaultSize = product.sizes[0] || 'Standard';
    onAddToCart(product, defaultColor, defaultSize, 1);
  };

  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-sm bg-neutral-950 border border-neutral-900 cursor-pointer p-3 transition-all duration-300 hover:border-neutral-800 hover:shadow-xl hover:shadow-black/50"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 rounded-sm">
        {/* Badges */}
        {badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 rounded-sm px-2.5 py-1 text-[9px] font-heading tracking-wider font-bold ${
              badge.includes('SALE')
                ? 'bg-red-500 text-white'
                : badge.includes('NEW')
                ? 'bg-accent text-black'
                : 'bg-neutral-800 text-white'
            }`}
            id={`product-badge-${product.id}`}
          >
            {badge}
          </span>
        )}

        {/* Image Swap Frame */}
        <div className="absolute inset-0 h-full w-full">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            loading="lazy"
          />
          {/* Hover Image */}
          <img
            src={hoverImage}
            alt={`${name} alternative angle`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            loading="lazy"
          />
        </div>

        {/* Action Triggers Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 group-hover:translate-y-0 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={!inStock}
            className={`flex flex-1 items-center justify-center space-x-1.5 rounded-sm py-2 px-3 text-[10px] font-heading tracking-widest uppercase transition-all duration-200 ${
              inStock
                ? 'bg-accent text-black hover:bg-white'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
            id={`quick-add-${product.id}`}
          >
            <ShoppingCart className="h-3 w-3" />
            <span>{inStock ? 'QUICK ADD' : 'SOLD OUT'}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="View Details"
            id={`view-details-${product.id}`}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Meta Detail Section */}
      <div className="flex flex-col pt-4 pb-1">
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
          <span className="uppercase tracking-widest font-mono text-[10px]">{product.category}</span>
          {/* Rating */}
          <div className="flex items-center space-x-0.5">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-mono text-neutral-300">{rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-sm text-white group-hover:text-accent transition-colors duration-200 line-clamp-1">
          {name}
        </h3>
        
        {/* Tagline */}
        <p className="text-xs text-neutral-400 font-sans mt-0.5 mb-2.5 line-clamp-1">
          {product.tagline}
        </p>

        {/* Price Tag */}
        <div className="flex items-baseline space-x-2 mt-auto">
          <span className="font-mono text-sm font-bold text-white">
            ${price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="font-mono text-xs text-neutral-500 line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
