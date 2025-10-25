import Spline from '@splinetool/react-spline';
import { Palette, Ruler, Package, Rocket } from 'lucide-react';

export default function HeroCoverSpline({ onExplore, grout, setGrout }) {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/40 to-white/90" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 border border-white/60 shadow-sm pointer-events-auto">
          <Rocket className="w-3.5 h-3.5 text-rose-500" />
          Modern Tile Commerce
        </div>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900">
          TileFlow — elevate every surface
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 text-base sm:text-lg">
          Shop designer tiles with smart tools: live grout preview, coverage calculator, and frictionless cart.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <button onClick={onExplore} className="inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 text-sm font-medium shadow-lg shadow-rose-600/20 transition-colors">
            Explore catalog
          </button>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-2 text-sm text-slate-700 border border-white/60 shadow-sm">
            <Palette className="w-4 h-4 text-rose-500" />
            Grout
            <select
              value={grout}
              onChange={(e) => setGrout(e.target.value)}
              className="bg-transparent focus:outline-none text-slate-900"
            >
              {['Cool Gray','Charcoal','Alabaster','White','Fog','Black','Natural','Taupe','Sable','Pearl','Gray','Onyx'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 max-w-3xl w-full pointer-events-auto">
          <Feature icon={Palette} title="Live grout preview" desc="Instantly visualize grout tones across tiles." />
          <Feature icon={Ruler} title="Coverage calculator" desc="Get boxes and cost for your room size." />
          <Feature icon={Package} title="Fast checkout" desc="Cart drawer with instant updates." />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-white/60 backdrop-blur p-4 text-left shadow-sm">
      <div className="flex items-center gap-2 text-slate-900">
        <Icon className="w-4 h-4 text-rose-600" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-1 text-xs text-slate-600">{desc}</p>
    </div>
  );
}
