import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { DropsSection } from './components/DropsSection';
import { StatementSection } from './components/StatementSection';
import { LookbookSection } from './components/LookbookSection';
import { ManifestoSection } from './components/ManifestoSection';
import { JoinClubSection } from './components/JoinClubSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Product, CartItem } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('acid_club_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('acid_club_cart', JSON.stringify(cartItems));
    } catch {
      // Local storage fallback
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, size: string) => {
    const cartItemId = `${product.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity: 1,
          gradient: product.gradient,
        },
      ];
    });

    // Display temporary alert toast
    setToastMessage(`ADDED TO BAG: ${product.name} (${size})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F1] text-black font-sans-clean relative selection:bg-[#B4E33D] selection:text-black">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Persistent Navigation Bar with dynamic Bag counter */}
      <TopBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={scrollToSection}
      />

      <main className="w-full">
        {/* HERO SECTION with seamless JavaScript boomerang loop & 3-layer parallax */}
        <Hero onExploreDrops={() => scrollToSection('drops')} />

        {/* BOTTOM MARQUEE (Black strip, lime text) */}
        <Marquee />

        {/* LATEST DROPS SECTION (3 cards with pure CSS gradients + typography + Add to bag) */}
        <DropsSection onAddToCart={handleAddToCart} />

        {/* BLACK STATEMENT SECTION ("DON'T BLEND IN." word-by-word scroll reveal) */}
        <StatementSection />

        {/* LOOKBOOK SECTION */}
        <LookbookSection />

        {/* MANIFESTO SECTION */}
        <ManifestoSection />

        {/* JOIN THE CLUB SECTION (Working email signup with success state) */}
        <JoinClubSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* SLIDE-OVER BAG / CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Add to Bag Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 border-2 border-[#B4E33D] shadow-2xl flex items-center gap-3 animate-slide-up">
          <div className="p-1 bg-[#B4E33D] text-black rounded-full">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            {toastMessage}
          </span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-mono font-bold text-[#B4E33D] underline cursor-pointer hover:text-white"
          >
            VIEW BAG
          </button>
        </div>
      )}
    </div>
  );
}
