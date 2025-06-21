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
  { id: 'all', name: 'All Products', count: 24, icon: '✨' },
  { id: 'lipstick', name: 'Lipstick', count: 8, icon: '💋' },
  { id: 'foundation', name: 'Foundation', count: 6, icon: '🤍' },
  { id: 'eyeshadow', name: 'Eyeshadow', count: 5, icon: '👁️' },
  { id: 'mascara', name: 'Mascara', count: 3, icon: '👀' },
  { id: 'blush', name: 'Blush', count: 2, icon: '🌸' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Velvet Matte Lipstick - Ruby Red',
    brand: 'Glamour Pro',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JJ2lB2Aw_mXn20_APBSRTkSS5Fu62Bx2ew&s',
    category: 'lipstick',
    rating: 4.8,
    isNew: true,
    isSale: true
  },
  {
    id: 2,
    name: 'Flawless Coverage Foundation',
    brand: 'Beauty Base',
    price: 42.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCD-3SNWuVQLwUoh6O-_ttZYRJ7_63zEJ9Mg&s',
    category: 'foundation',
    rating: 4.6,
    isNew: false
  },
  {
    id: 3,
    name: 'Sunset Eyeshadow Palette',
    brand: 'Color Dreams',
    price: 35.99,
    originalPrice: 45.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7mmFc4RVwCCmKezmkjR6WQHUdCbgo8g7VYw&s',
    category: 'eyeshadow',
    rating: 4.9,
    isSale: true
  },
  {
    id: 4,
    name: 'Volume Boost Mascara',
    brand: 'Lash Perfect',
    price: 18.50,
    image: '/placeholder.svg',
    category: 'mascara',
    rating: 4.7
  },
  {
    id: 5,
    name: 'Natural Glow Blush',
    brand: 'Rosy Cheeks',
    price: 22.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JJ2lB2Aw_mXn20_APBSRTkSS5Fu62Bx2ew&s',
    category: 'blush',
    rating: 4.5,
    isNew: true
  },
  {
    id: 6,
    name: 'Classic Red Lipstick',
    brand: 'Timeless Beauty',
    price: 28.99,
    image: '/placeholder.svg',
    category: 'lipstick',
    rating: 4.8
  },
  {
    id: 7,
    name: 'HD Foundation Stick',
    brand: 'Pro Makeup',
    price: 38.00,
    originalPrice: 42.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCD-3SNWuVQLwUoh6O-_ttZYRJ7_63zEJ9Mg&s',
    category: 'foundation',
    rating: 4.4,
    isSale: true
  },
  {
    id: 8,
    name: 'Smoky Eye Palette',
    brand: 'Night Glam',
    price: 32.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JJ2lB2Aw_mXn20_APBSRTkSS5Fu62Bx2ew&s',
    category: 'eyeshadow',
    rating: 4.6,
    isNew: true
  }
];