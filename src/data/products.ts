import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'voltage-puffer-vest',
    name: 'Voltage Puffer Vest',
    price: 3999,
    formattedPrice: '₹3,999',
    category: 'OUTERWEAR / 01',
    tagline: '700-FILL THERMAL // VOLTAGE LIME RIPSTOP',
    gradient: 'from-[#0A0A0A] via-[#1A2608] to-[#B4E33D]',
    accentColor: '#B4E33D',
    specs: [
      'High-density 70D nylon micro-ripstop shell',
      '700+ fill-power insulated baffles',
      'Dual oversized tactical magnetic cargo pockets',
      'Weatherproof YKK AquaGuard® front two-way zip',
      'High-stance stand collar with storm flap'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'LIMITED RUN // 150 PCS',
    description: 'The centerpiece of Drop 01. Engineered for maximum thermal defense with zero movement compromise, rendered in high-voltage signature lime with tactical matte hardware.'
  },
  {
    id: 'static-turtleneck',
    name: 'Static Turtleneck',
    price: 1799,
    formattedPrice: '₹1,799',
    category: 'BASE LAYER / 02',
    tagline: 'CARBON RIB KNIT // TACTICAL HIGH COLLAR',
    gradient: 'from-[#050505] via-[#121212] to-[#2B2B2B]',
    accentColor: '#FFFFFF',
    specs: [
      '320 GSM heavyweight combed cotton blend',
      'Seamless tubular engineered torso',
      'Extended thumbhole cuffs for thermal layering',
      'Subtle high-density tonal silicon Acid Club seal',
      'Double-knit ribbed turtleneck that retains shape'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'CORE ESSENTIAL',
    description: 'Pitch-black architectural base layer. Structured to fit close to skin under puffers or oversized parkas, featuring elongated cuffs with tactical thumb loops.'
  },
  {
    id: 'sticker-beanie',
    name: 'Sticker Beanie',
    price: 999,
    formattedPrice: '₹999',
    category: 'HEADWEAR / 03',
    tagline: 'CHUNKY ACID RIB // SMILEY & STAR PATCHES',
    gradient: 'from-[#1E260A] via-[#658217] to-[#B4E33D]',
    accentColor: '#B4E33D',
    specs: [
      'Heavy 7-gauge double-fold chunky rib knit',
      'Twin direct-embroidered patches: Acid Smiley & Midnight Star',
      '100% hypoallergenic soft-spun thermal acrylic',
      'Snug deep-crown fit with adjustable cuff fold',
      'Vibrant voltage lime dye with UV fastness'
    ],
    sizes: ['ONE SIZE'],
    badge: 'CULT ARTIFACT',
    description: 'As worn by the 3D pilot. Iconic high-frequency lime beanie with embroidered twin patches. Designed to turn heads across full city blocks.'
  }
];
