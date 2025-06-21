export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: 500, icon: '✨' },
  { id: 'lipstick', name: 'Lipstick', count: 120, icon: '' },
  { id: 'foundation', name: 'Foundation', count: 100, icon: '' },
  { id: 'eyeshadow', name: 'Eyeshadow', count: 80, icon: '️' },
  { id: 'mascara', name: 'Mascara', count: 60, icon: '' },
  { id: 'blush', name: 'Blush', count: 50, icon: '' },
  { id: 'concealer', name: 'Concealer', count: 40, icon: '🎭' },
  { id: 'eyeliner', name: 'Eyeliner', count: 30, icon: '✏️' },
  { id: 'bronzer', name: 'Bronzer', count: 20, icon: '☀️' }
];

// Array of random makeup product images
const randomImages = [
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop'
];

// Product name templates
const productTemplates = {
  lipstick: [
    'Velvet Matte Lipstick - {color}',
    'Satin Finish Lipstick - {color}',
    'Liquid Matte Lipstick - {color}',
    'Glossy Shine Lipstick - {color}',
    'Metallic Finish Lipstick - {color}',
    'Nude Collection Lipstick - {color}',
    'Bold Red Lipstick - {color}',
    'Pink Paradise Lipstick - {color}',
    'Berry Bliss Lipstick - {color}',
    'Coral Crush Lipstick - {color}'
  ],
  foundation: [
    'Flawless Coverage Foundation - {shade}',
    'HD Foundation - {shade}',
    'Natural Finish Foundation - {shade}',
    'Matte Foundation - {shade}',
    'Dewy Glow Foundation - {shade}',
    'Full Coverage Foundation - {shade}',
    'Light Coverage Foundation - {shade}',
    'Long Wear Foundation - {shade}',
    'Oil Control Foundation - {shade}',
    'Hydrating Foundation - {shade}'
  ],
  eyeshadow: [
    'Sunset Palette - {theme}',
    'Smoky Eye Palette - {theme}',
    'Neutral Tones Palette - {theme}',
    'Color Pop Palette - {theme}',
    'Metallic Dreams Palette - {theme}',
    'Pastel Paradise Palette - {theme}',
    'Bold & Bright Palette - {theme}',
    'Natural Nudes Palette - {theme}',
    'Sunset Glow Palette - {theme}',
    'Night Out Palette - {theme}'
  ],
  mascara: [
    'Volume Boost Mascara - {color}',
    'Lengthening Mascara - {color}',
    'Curling Mascara - {color}',
    'Waterproof Mascara - {color}',
    'Natural Look Mascara - {color}',
    'Dramatic Volume Mascara - {color}',
    'Defining Mascara - {color}',
    'Smudge Proof Mascara - {color}',
    'Lash Building Mascara - {color}',
    'Tubing Mascara - {color}'
  ],
  blush: [
    'Natural Glow Blush - {color}',
    'Peachy Keen Blush - {color}',
    'Rose Gold Blush - {color}',
    'Coral Sunset Blush - {color}',
    'Pink Blossom Blush - {color}',
    'Berry Tint Blush - {color}',
    'Golden Hour Blush - {color}',
    'Soft Rose Blush - {color}',
    'Apricot Glow Blush - {color}',
    'Dusty Rose Blush - {color}'
  ],
  concealer: [
    'Full Coverage Concealer - {shade}',
    'Brightening Concealer - {shade}',
    'Color Correcting Concealer - {shade}',
    'Long Wear Concealer - {shade}',
    'Hydrating Concealer - {shade}',
    'Matte Finish Concealer - {shade}',
    'Light Coverage Concealer - {shade}',
    'Under Eye Concealer - {shade}',
    'Spot Treatment Concealer - {shade}',
    'Natural Finish Concealer - {shade}'
  ],
  eyeliner: [
    'Liquid Liner - {color}',
    'Gel Liner - {color}',
    'Pencil Liner - {color}',
    'Winged Liner - {color}',
    'Smudge Proof Liner - {color}',
    'Waterproof Liner - {color}',
    'Glitter Liner - {color}',
    'Matte Finish Liner - {color}',
    'Long Wear Liner - {color}',
    'Easy Apply Liner - {color}'
  ],
  bronzer: [
    'Natural Glow Bronzer - {tone}',
    'Sun Kissed Bronzer - {tone}',
    'Golden Hour Bronzer - {tone}',
    'Warm Bronze Bronzer - {tone}',
    'Cool Tone Bronzer - {tone}',
    'Matte Finish Bronzer - {tone}',
    'Shimmer Glow Bronzer - {tone}',
    'Contour Pro Bronzer - {tone}',
    'Beach Glow Bronzer - {tone}',
    'Sunset Bronze Bronzer - {tone}'
  ]
};

// Color and shade variations
const variations = {
  lipstick: ['Ruby Red', 'Nude Pink', 'Berry Wine', 'Coral Orange', 'Plum Purple', 'Peach Nude', 'Burgundy', 'Rose Gold', 'Mauve', 'Hot Pink', 'Classic Red', 'Deep Wine', 'Soft Coral', 'Pink Rose', 'Berry Red', 'Nude Beige', 'Coral Pink', 'Deep Plum', 'Rose Pink', 'Coral Red'],
  foundation: ['Fair', 'Light', 'Medium', 'Dark', 'Deep', 'Warm Fair', 'Cool Light', 'Neutral Medium', 'Warm Dark', 'Cool Deep', 'Fair Warm', 'Light Cool', 'Medium Warm', 'Dark Cool', 'Deep Warm', 'Fair Cool', 'Light Warm', 'Medium Cool', 'Dark Warm', 'Deep Cool'],
  eyeshadow: ['Warm Tones', 'Dark Tones', 'Everyday', 'Bright Colors', 'Shimmer', 'Soft Colors', 'Vibrant', 'Subtle', 'Golden Hour', 'Dramatic', 'Romantic', 'Green Tones', 'Purple Tones', 'Bronze Tones', 'Silver Tones', 'Coral Tones', 'Berry Tones', 'Nude Tones', 'Gold Tones', 'Neutral'],
  mascara: ['Black', 'Brown', 'Blue Black', 'Deep Brown', 'Jet Black', 'Rich Brown', 'Carbon Black', 'Warm Brown', 'Intense Black', 'Natural Brown'],
  blush: ['Pink', 'Coral', 'Rose Gold', 'Sunset Coral', 'Soft Pink', 'Berry', 'Golden', 'Rose', 'Apricot', 'Dusty Rose', 'Peach', 'Bright Coral', 'Rose Pink', 'Coral Pink', 'Berry Pink'],
  concealer: ['Fair', 'Light', 'Medium', 'Dark', 'Deep', 'Warm Fair', 'Cool Light', 'Neutral Medium', 'Warm Dark', 'Cool Deep', 'Fair Warm', 'Light Cool', 'Medium Warm', 'Dark Cool', 'Deep Warm'],
  eyeliner: ['Black', 'Brown', 'Blue Black', 'Deep Brown', 'Jet Black', 'Rich Brown', 'Carbon Black', 'Warm Brown', 'Intense Black', 'Natural Brown'],
  bronzer: ['Golden', 'Warm', 'Golden Hour', 'Warm Bronze', 'Cool', 'Matte', 'Shimmer', 'Contour', 'Beach Glow', 'Sunset Bronze']
};

// Generate 500 products
const generateProducts = (): Product[] => {
  const brands = ['Glamour Pro', 'Beauty Base', 'Color Dreams', 'Lash Perfect', 'Rosy Cheeks', 'Timeless Beauty', 'Pro Makeup', 'Night Glam', 'Luxe Beauty', 'Natural Glow', 'Urban Style', 'Classic Elegance', 'Modern Beauty', 'Vintage Glam', 'Eco Beauty', 'Luxury Makeup'];
  const products: Product[] = [];
  
  // Category distribution
  const categoryCounts = {
    lipstick: 120,
    foundation: 100,
    eyeshadow: 80,
    mascara: 60,
    blush: 50,
    concealer: 40,
    eyeliner: 30,
    bronzer: 20
  };

  let id = 1;

  Object.entries(categoryCounts).forEach(([category, count]) => {
    for (let i = 0; i < count; i++) {
      const template = productTemplates[category as keyof typeof productTemplates][i % productTemplates[category as keyof typeof productTemplates].length];
      const variation = variations[category as keyof typeof variations][i % variations[category as keyof typeof variations].length];
      const name = template.replace('{color}', variation).replace('{shade}', variation).replace('{theme}', variation).replace('{tone}', variation);
      
      const basePrice = {
        lipstick: 20 + Math.random() * 15,
        foundation: 30 + Math.random() * 20,
        eyeshadow: 25 + Math.random() * 25,
        mascara: 15 + Math.random() * 15,
        blush: 18 + Math.random() * 12,
        concealer: 20 + Math.random() * 15,
        eyeliner: 12 + Math.random() * 12,
        bronzer: 18 + Math.random() * 10
      }[category];

      const price = Math.round(basePrice * 100) / 100;
      const isSale = Math.random() > 0.7;
      const originalPrice = isSale ? Math.round((price + Math.random() * 8) * 100) / 100 : undefined;

      products.push({
        id: id++,
        name,
        brand: brands[i % brands.length],
        price,
        originalPrice,
        image: randomImages[i % randomImages.length],
        category,
        rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10,
        isNew: Math.random() > 0.8,
        isSale
      });
    }
  });

  return products;
};

export const products: Product[] = generateProducts();