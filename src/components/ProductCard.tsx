import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { AppDispatch } from '@/store/store';
import { toast } from 'sonner';

interface Product {
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking add to cart
    dispatch(addToCart(product));
    dispatch(openCart());
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            NEW
          </Badge>
        )}
        {product.isSale && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            SALE
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-pink-600 hover:text-pink-700"
          onClick={(e) => e.stopPropagation()} // Prevent card click
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-pink-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;