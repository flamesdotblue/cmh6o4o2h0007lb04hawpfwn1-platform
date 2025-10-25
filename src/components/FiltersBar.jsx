import { Filter } from 'lucide-react';

const finishOptions = ['All', 'Matte', 'Glossy', 'Honed', 'Satin'];
const sizeOptions = ['All', 'Small', 'Medium', 'Large'];
const materialOptions = ['All', 'Porcelain', 'Ceramic', 'Stone'];

export default function FiltersBar({ search, setSearch, filters, setFilters }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Filter className="w-4 h-4 text-rose-600" />
          Refine
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, finish, material"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={filters.finish} onChange={(v) => setFilters((f) => ({ ...f, finish: v }))} label="Finish" options={finishOptions} />
          <Select value={filters.size} onChange={(v) => setFilters((f) => ({ ...f, size: v }))} label="Size" options={sizeOptions} />
          <Select value={filters.material} onChange={(v) => setFilters((f) => ({ ...f, material: v }))} label="Material" options={materialOptions} />
        </div>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-900 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
