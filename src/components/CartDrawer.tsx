import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'VOLT20' || clean === 'ACID20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('INVALID AUTH CODE. TRY "VOLT20"');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      const generatedOrder = `ACID-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrder);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#B4E33D', '#000000', '#F4F4F2'],
        });
      } catch (e) {}
    }, 1200);
  };

  const handleCloseOrder = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F4F4F2] border-l-2 border-black flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-6 border-b border-black/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl uppercase tracking-tight text-black">
                BAG APPARATUS
              </span>
              <span className="text-xs font-mono font-bold bg-black text-[#B4E33D] px-2 py-0.5">
                {items.reduce((s, i) => s + i.quantity, 0)} ITEMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-black hover:bg-black/10 rounded transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderConfirmed ? (
            /* Checkout Confirmation Screen */
            <div className="p-8 flex flex-col items-center justify-center text-center my-auto space-y-4">
              <div className="w-16 h-16 bg-black text-[#B4E33D] rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#688a14]">
                DISPATCH COMMENCED
              </div>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight text-black">
                ORDER CONFIRMED
              </h3>
              <p className="font-mono text-sm font-bold text-black bg-black/5 px-4 py-2 border border-black/10">
                {orderNumber}
              </p>
              <p className="text-xs font-sans-clean text-black/70 max-w-xs leading-relaxed">
                Your drop acquisition has been registered in the Acid Club logistics network. Tracking details will arrive via encrypted mail.
              </p>
              <button
                onClick={handleCloseOrder}
                className="w-full mt-4 py-3.5 bg-black text-[#B4E33D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                RETURN TO SURFACE
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty state */
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 border-2 border-black/30 rounded-full flex items-center justify-center text-black/40 mb-4 font-mono text-xl">
                0
              </div>
              <h4 className="font-display font-bold text-xl uppercase tracking-tight text-black mb-1">
                YOUR BAG IS EMPTY
              </h4>
              <p className="text-xs font-mono text-black/50 mb-6 max-w-xs">
                No tactical drop articles currently queued. Explore Drop 01 to equip your high-voltage uniform.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-[#B4E33D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                EXPLORE DROP 01
              </button>
            </div>
          ) : (
            /* Itemized List & Checkout */
            <>
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white border border-black/15 items-center justify-between"
                  >
                    {/* Thumbnail Gradient */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.gradient} border border-black/20 shrink-0 flex items-center justify-center`}
                    >
                      <span className="font-display font-black text-xs text-white uppercase">
                        ACID
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-bold text-base uppercase tracking-tight text-black truncate">
                        {item.name}
                      </h4>
                      <div className="text-xs font-mono text-black/60">
                        SIZE: <span className="font-bold text-black">{item.size}</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-black mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border border-black/20 bg-[#F4F4F2]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-black/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-black/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-black/40 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="DISCOUNT CODE (TRY 'VOLT20')"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow px-3 py-2 bg-white border border-black/20 text-xs font-mono uppercase focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="text-[11px] font-mono text-[#587711] font-bold mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> 20% DISCOUNT APPLIED
                    </div>
                  )}
                  {promoError && (
                    <div className="text-[11px] font-mono text-red-600 mt-1">
                      {promoError}
                    </div>
                  )}
                </form>
              </div>

              {/* Order Summary Footer */}
              <div className="p-6 bg-white border-t border-black/15 space-y-3">
                <div className="space-y-1.5 text-xs font-mono text-black/70">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="font-bold text-black tabular-nums">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#587711] font-bold">
                      <span>VOLT20 DISCOUNT (20%)</span>
                      <span className="tabular-nums">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>SHIPPING (FREE OVER ₹2,500)</span>
                    <span className="font-bold text-black tabular-nums">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-black/10">
                    <span>ESTIMATED TOTAL</span>
                    <span className="tabular-nums">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-black text-[#B4E33D] font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isCheckingOut ? (
                    <span>AUTHORIZING DISPATCH...</span>
                  ) : (
                    <>
                      <span>PROCEED TO CHECKOUT — ₹{total.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-black/50 text-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PRE-AUTHENTICATED // ZERO-COUNTERFEIT GUARANTEE</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
