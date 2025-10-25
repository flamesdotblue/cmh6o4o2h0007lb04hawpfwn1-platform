import { useMemo, useState } from 'react';
import { Star, Plus, Ruler } from 'lucide-react';

export default function ProductGrid({ products, grout, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} grout={grout} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

function ProductCard({ product, grout, onAddToCart }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);
  const [roomSqft, setRoomSqft] = useState(120);

  const selectedColor = product.colors[colorIndex];
  const tilesPerSqft = useMemo(() => {
    const tileArea = (product.sizeInInches.w * product.sizeInInches.h) / 144; // sqft per tile
    return tileArea > 0 ? (1 / tileArea) : 0;
  }, [product.sizeInInches]);

  const boxesNeeded = useMemo(() => {
    if (!roomSqft) return 0;
    const raw = roomSqft / product.coveragePerBoxSqft;
    return Math.ceil(raw * 1.1); // add 10% waste
  }, [roomSqft, product.coveragePerBoxSqft]);

  const estCost = useMemo(() => boxesNeeded * product.pricePerBox, [boxesNeeded, product.pricePerBox]);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="relative aspect-[4/3]">
        <TilePreview color={selectedColor.hex} grout={grout} size={product.sizeInInches} />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-2 py-1 text-xs font-medium text-slate-700 border border-white/60">
            <Star className="w-3.5 h-3.5 text-amber-500" /> {product.rating}
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-2 py-1 text-xs font-medium text-slate-700 border border-white/60">
            {product.size}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{product.name}</h3>
            <p className="text-sm text-slate-600">{product.finish} • {product.material}</p>
          </div>
          <div className="text-right">
            <p className="text-rose-600 font-semibold">${product.pricePerSqft.toFixed(2)} / sq.ft</p>
            <p className="text-xs text-slate-500">${product.pricePerBox.toFixed(2)} / box • {product.coveragePerBoxSqft} sq.ft</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {product.colors.map((c, idx) => (
            <button
              key={c.name}
              aria-label={`Select color ${c.name}`}
              onClick={() => setColorIndex(idx)}
              className={`h-7 w-7 rounded-full border ${idx===colorIndex? 'ring-2 ring-rose-500 border-white' : 'border-slate-300'}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onAddToCart(product, { color: selectedColor })}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" /> Quick add (1 box)
          </button>
          <button
            onClick={() => setCalcOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300"
          >
            <Ruler className="w-4 h-4 text-rose-600" /> Calculator
          </button>
        </div>

        {calcOpen && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Ruler className="w-4 h-4" />
              Estimate coverage and cost
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">
                <span className="text-slate-600">Room area (sq.ft)</span>
                <input
                  type="number"
                  min={1}
                  value={roomSqft}
                  onChange={(e) => setRoomSqft(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 focus:outline-none"
                />
              </label>
              <div>
                <div className="text-slate-600">Tiles per sq.ft</div>
                <div className="font-medium">{tilesPerSqft.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-slate-600">Boxes needed (10% overage)</div>
                <div className="font-medium">{boxesNeeded}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-600">Estimated cost</div>
                <div className="text-lg font-semibold text-rose-600">${estCost.toFixed(2)}</div>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => onAddToCart(product, { color: selectedColor })}
                  className="w-full rounded-lg bg-rose-600 hover:bg-rose-700 text-white py-2 text-sm font-medium"
                >
                  Add estimated boxes to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TilePreview({ color, grout, size }) {
  const cell = 16; // px pseudo grid unit
  const groutColor = groutToHex(grout);
  const background = `repeating-linear-gradient(90deg, ${groutColor}, ${groutColor} 1px, transparent 1px, transparent ${cell}px), repeating-linear-gradient(0deg, ${groutColor}, ${groutColor} 1px, transparent 1px, transparent ${cell}px)`;

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundImage: background, backgroundColor: color, backgroundSize: `${cell}px ${cell}px` }} />
      <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between text-[10px] text-slate-600">
        <span>Grout: {grout}</span>
        <span>Preview tile ratio approx.</span>
      </div>
    </div>
  );
}

function groutToHex(name) {
  const map = {
    'Cool Gray': '#cbd5e1',
    'Charcoal': '#111827',
    'Alabaster': '#f1f5f9',
    'White': '#ffffff',
    'Fog': '#e5e7eb',
    'Black': '#000000',
    'Natural': '#d1d5db',
    'Taupe': '#b39b86',
    'Sable': '#8b7355',
    'Pearl': '#e2e8f0',
    'Gray': '#9ca3af',
    'Onyx': '#0f172a',
  };
  return map[name] || '#cbd5e1';
}
