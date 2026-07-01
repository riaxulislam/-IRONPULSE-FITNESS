import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw, Star, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  onAddToCart: (product: Product, color: string, size: string, qty: number) => void;
  onSelectProduct: (product: Product) => void;
}

export default function Shop({ onAddToCart, onSelectProduct }: ShopProps) {
  // Filter and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Categories list
  const categories = [
    { value: 'all', label: 'ALL PRODUCTS' },
    { value: 'apparel', label: 'APPAREL' },
    { value: 'gear', label: 'FITNESS GEAR' },
    { value: 'nutrition', label: 'ELITE NUTRITION' },
    { value: 'tech', label: 'BIO-TELEMETRY' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  // Process filters and sorts
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. In Stock Filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // 3. Search text filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // 4. Sort selection
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'alpha-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alpha-za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        // Keep initial mock ordering or prioritize badges
        result.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [selectedCategory, onlyInStock, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-brand-bg" id="shop-page-container">
      
      {/* Page Title Header */}
      <div className="border-b border-neutral-900 pb-6 mb-8 text-center sm:text-left" id="shop-title-block">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-bold">
          ONLINE STOREFRONT
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white uppercase mt-1">
          Catalog Collections
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1.5">
          Equip yourself with elite designs built for compound lifts, metabolic conditioning, and recovery.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-end mb-10" id="shop-filters-panel">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <label className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase mb-1.5">
            Search Gear
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search hoodie, dumbbells, proteins, sensors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm bg-neutral-950 border border-neutral-900 px-4 py-3 pl-10 text-xs text-white placeholder-neutral-600 focus:border-accent focus:outline-none transition-all"
              id="shop-search-input"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-600" />
          </div>
        </div>

        {/* Sort By Selector */}
        <div className="relative">
          <label className="block text-[10px] font-heading text-neutral-500 tracking-wider uppercase mb-1.5 flex items-center space-x-1">
            <ArrowUpDown className="h-3 w-3" />
            <span>Sort Collection</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-sm bg-neutral-950 border border-neutral-900 px-4 py-3 text-xs text-white focus:border-accent focus:outline-none cursor-pointer appearance-none uppercase"
            id="shop-sort-selector"
          >
            <option value="featured">Featured / Flagship</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
            <option value="alpha-az">Alphabetical: A-Z</option>
            <option value="alpha-za">Alphabetical: Z-A</option>
          </select>
        </div>

        {/* Toggle Availability */}
        <div className="flex h-11 items-center">
          <label className="flex items-center space-x-2.5 cursor-pointer" id="stock-toggle-label">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="h-4 w-4 rounded-sm border-neutral-800 bg-neutral-950 text-accent focus:ring-accent checked:bg-accent"
            />
            <span className="text-xs text-neutral-400 font-sans select-none hover:text-white transition-colors">
              Exclude Out of Stock Items
            </span>
          </label>
        </div>
      </div>

      {/* Categories Horizontal Tabs bar */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-900 pb-6 mb-10 overflow-x-auto scrollbar-none" id="shop-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`rounded-sm px-4.5 py-2.5 text-xs font-heading tracking-wider uppercase transition-all duration-300 ${
              selectedCategory === cat.value
                ? 'bg-accent text-black font-semibold'
                : 'bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800'
            }`}
            id={`cat-tab-${cat.value}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Header summary */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 font-mono" id="results-count-strip">
        <span>SHOWING {filteredProducts.length} OF {PRODUCTS.length} ITEMS</span>
        {(selectedCategory !== 'all' || searchQuery !== '' || onlyInStock || sortBy !== 'featured') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-1 text-accent hover:text-white transition-colors"
            id="reset-filters-trigger"
          >
            <RefreshCw className="h-3 w-3" />
            <span>RESET FILTERS</span>
          </button>
        )}
      </div>

      {/* Core Collection Grid: columns: 4 */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-sm bg-neutral-950 border border-neutral-900 p-16 text-center" id="no-products-fallback">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-500 mb-4 border border-neutral-800">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-sm text-white uppercase tracking-wider mb-2">
            No products matched your parameters
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed mb-6">
            We couldn't find anything matching "{searchQuery}". Try relaxing your filters or check our other flagship collections.
          </p>
          <button
            onClick={handleResetFilters}
            className="rounded-sm bg-accent text-black px-6 py-2.5 text-xs font-heading tracking-widest uppercase hover:bg-white transition-colors"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" id="shop-catalog-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
