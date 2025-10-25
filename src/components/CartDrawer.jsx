import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

export default function CartDrawer({ open, setOpen, cart, subtotal, formatCurrency, updateItem, removeItem }) {
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white px-4 py-3 text-sm font-medium shadow-lg shadow-rose-600/20"
      >
        <ShoppingCart className="w-4 h-4" />
        Cart
        <span className="ml-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] rounded-full bg-white text-rose-600 text-xs font-bold px-1">{itemCount}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div className="font-semibold">Your Cart</div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 && (
                  <div className="text-sm text-slate-600">Your cart is empty.</div>
                )}
                {cart.map((item) => (
                  <div key={item.key} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-slate-900">{item.name}</div>
                          <div className="text-xs text-slate-600">{item.meta.finish} • {item.meta.size} • {item.color}</div>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-xs text-slate-500 hover:text-rose-600"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="inline-flex items-center gap-2">
                          <button onClick={() => updateItem(item.key, { qty: Math.max(1, item.qty - 1) })} className="p-1 rounded border border-slate-200 hover:bg-slate-50">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateItem(item.key, { qty: item.qty + 1 })} className="p-1 rounded border border-slate-200 hover:bg-slate-50">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-slate-900 font-medium">{formatCurrency(item.pricePerSqft * item.sqft * item.qty)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <button className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-3 text-sm font-medium">
                  Checkout
                </button>
                <p className="text-[11px] text-slate-500">Taxes and shipping calculated at checkout.</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
