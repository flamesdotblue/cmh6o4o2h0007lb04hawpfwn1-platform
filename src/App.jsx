import { useMemo, useState } from 'react';
import HeroCoverSpline from './components/HeroCoverSpline';
import FiltersBar from './components/FiltersBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

const PRODUCTS = [
  {
    id: 'tile-aurora-matte-12x24',
    name: 'Aurora Matte',
    slug: 'aurora-matte-12x24',
    size: '12x24 in',
    sizeInInches: { w: 12, h: 24 },
    finish: 'Matte',
    material: 'Porcelain',
    rating: 4.8,
    pricePerSqft: 4.25,
    pricePerBox: 54.99,
    coveragePerBoxSqft: 13.2,
    groutOptions: ['Cool Gray', 'Charcoal', 'Alabaster'],
    colors: [
      { name: 'White', hex: '#f8fafc' },
      { name: 'Sand', hex: '#e7e0d6' },
      { name: 'Ash', hex: '#d1d5db' },
    ],
  },
  {
    id: 'tile-cascade-glossy-3x12',
    name: 'Cascade Glossy',
    slug: 'cascade-glossy-3x12',
    size: '3x12 in',
    sizeInInches: { w: 3, h: 12 },
    finish: 'Glossy',
    material: 'Ceramic',
    rating: 4.6,
    pricePerSqft: 3.85,
    pricePerBox: 41.5,
    coveragePerBoxSqft: 10.8,
    groutOptions: ['White', 'Fog', 'Black'],
    colors: [
      { name: 'Ice', hex: '#eef2ff' },
      { name: 'Sky', hex: '#dbeafe' },
      { name: 'Blush', hex: '#ffe4e6' },
    ],
  },
  {
    id: 'tile-terra-honed-24x24',
    name: 'Terra Honed',
    slug: 'terra-honed-24x24',
    size: '24x24 in',
    sizeInInches: { w: 24, h: 24 },
    finish: 'Honed',
    material: 'Stone',
    rating: 4.9,
    pricePerSqft: 6.9,
    pricePerBox: 79.99,
    coveragePerBoxSqft: 12.0,
    groutOptions: ['Natural', 'Taupe', 'Sable'],
    colors: [
      { name: 'Ivory', hex: '#faf7f2' },
      { name: 'Clay', hex: '#e2d0c2' },
      { name: 'Umber', hex: '#c7b5a3' },
    ],
  },
  {
    id: 'tile-grid-tech-6x6',
    name: 'Grid Tech',
    slug: 'grid-tech-6x6',
    size: '6x6 in',
    sizeInInches: { w: 6, h: 6 },
    finish: 'Satin',
    material: 'Porcelain',
    rating: 4.7,
    pricePerSqft: 4.1,
    pricePerBox: 49.0,
    coveragePerBoxSqft: 12.0,
    groutOptions: ['Pearl', 'Gray', 'Onyx'],
    colors: [
      { name: 'Arctic', hex: '#f1f5f9' },
      { name: 'Slate', hex: '#cbd5e1' },
      { name: 'Rose', hex: '#fecdd3' },
    ],
  },
];

function formatCurrency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ finish: 'All', size: 'All', material: 'All' });
  const [grout, setGrout] = useState('Cool Gray');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const products = useMemo(() => PRODUCTS, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = `${p.name} ${p.finish} ${p.material}`.toLowerCase().includes(search.toLowerCase());
      const matchesFinish = filters.finish === 'All' || p.finish === filters.finish;
      const matchesMaterial = filters.material === 'All' || p.material === filters.material;
      const matchesSize = (() => {
        if (filters.size === 'All') return true;
        const s = p.sizeInInches;
        const area = s.w * s.h;
        if (filters.size === 'Small') return area <= 36; // up to 6x6
        if (filters.size === 'Medium') return area > 36 && area <= 288; // up to 12x24
        if (filters.size === 'Large') return area > 288; // larger than 12x24
        return true;
      })();
      return matchesSearch && matchesFinish && matchesMaterial && matchesSize;
    });
  }, [products, search, filters]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.pricePerSqft * item.sqft * item.qty, 0);
  }, [cart]);

  const handleAddToCart = (product, variant) => {
    const sqftDefault = product.coveragePerBoxSqft; // add one box by default
    const key = `${product.id}-${variant?.color?.name || 'Default'}`;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.key === key);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          color: variant?.color?.name || product.colors?.[0]?.name,
          pricePerSqft: product.pricePerSqft,
          sqft: sqftDefault,
          qty: 1,
          meta: {
            finish: product.finish,
            size: product.size,
          },
        },
      ];
    });
  };

  const updateCartItem = (key, updates) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, ...updates } : i)));
  };
  const removeCartItem = (key) => setCart((prev) => prev.filter((i) => i.key !== key));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <HeroCoverSpline onExplore={() => {
        const el = document.getElementById('catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} grout={grout} setGrout={setGrout} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section id="catalog" className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Explore Tiles</h2>
            <div className="text-sm text-slate-500">Seamless UX with quick add, coverage calculator, and dynamic grout preview.</div>
          </div>
          <FiltersBar
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
          />
          <ProductGrid
            products={filteredProducts}
            grout={grout}
            onAddToCart={handleAddToCart}
          />
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        subtotal={subtotal}
        formatCurrency={formatCurrency}
        updateItem={updateCartItem}
        removeItem={removeCartItem}
      />
    </div>
  );
}
