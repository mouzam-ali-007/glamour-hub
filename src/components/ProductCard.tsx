import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { toggleFavourites, addRecentlyViewed } from '@/store/slices/favouritesSlice';
import { AppDispatch, RootState } from '@/store/store';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Star } from 'lucide-react';

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
  
  // Get favourites from Redux store
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const isFavourite = favourites.some(item => item.id === product.id);

  const [open, setOpen] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking add to cart
    dispatch(addToCart(product));
    dispatch(openCart());
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    dispatch(toggleFavourites(product));
    
    if (isFavourite) {
      toast.success(`${product.name} removed from favourites!`);
    } else {
      toast.success(`${product.name} added to favourites!`);
    }
  };

  const handleCardClick = () => {
    dispatch(addRecentlyViewed(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
              className={`absolute top-2 right-2 transition-all duration-200 ${
                isFavourite 
                  ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                  : 'bg-white/80 hover:bg-white text-gray-600 hover:text-pink-600'
              }`}
              onClick={handleToggleFavourite}
            >
              <Heart className={`h-4 w-4 ${isFavourite ? 'fill-current' : ''}`} />
            </Button>
            {/* Quick View Button */}
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-pink-100 text-pink-600 border-pink-200 shadow-md"
                onClick={e => { e.stopPropagation(); setOpen(true); }}
              >
                Quick View
              </Button>
            </DialogTrigger>
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
        {/* Quick View Modal */}
        <DialogContent className="max-w-2xl">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-64 h-64 object-cover rounded-lg border"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>
                    <span className="text-pink-600 font-semibold">{product.brand}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-2 mb-4">
                  <span className="text-lg font-bold text-pink-600">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  <span className="flex items-center ml-4 text-yellow-500 font-medium">
                    <Star className="h-4 w-4 mr-1" />
                    {product.rating}
                  </span>
                  {product.isNew && (
                    <Badge className="ml-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white">NEW</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">SALE</Badge>
                  )}
                </div>
                <p className="text-gray-700 mb-4">This is a beautiful {product.category} from {product.brand}. Perfect for your collection!</p>
              </div>
              <DialogFooter className="flex flex-row gap-2 mt-4">
                <Button
                  variant={isFavourite ? 'default' : 'outline'}
                  className={isFavourite ? 'bg-pink-500 text-white hover:bg-pink-600' : 'text-pink-600 border-pink-200'}
                  onClick={() => dispatch(toggleFavourites(product))}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                </Button>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                  onClick={() => { dispatch(addToCart(product)); dispatch(openCart()); toast.success(`${product.name} added to cart!`); }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                {/* <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose> */}
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;