import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { removeFromFavourites } from '@/store/slices/favouritesSlice';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Favourites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const favourites = useSelector((state: RootState) => state.favourites.items);

  const handleRemoveFromFavourites = (productId: number, productName: string) => {
    dispatch(removeFromFavourites(productId));
    toast.success(`${productName} removed from favourites!`);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    dispatch(openCart());
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddAllToCart = () => {
    favourites.forEach(product => {
      dispatch(addToCart(product));
    });
    dispatch(openCart());
    toast.success(`All ${favourites.length} items added to cart!`);
  };

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favourites</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't added any products to your favourites yet. Start exploring our collection and click the heart icon to save your favorite items!
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Heart className="h-8 w-8 text-pink-500 fill-current" />
                Your Favourites
              </h1>
              <p className="text-gray-600 mt-1">{favourites.length} items</p>
            </div>
          </div>
          
          <Button
            onClick={handleAddAllToCart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>

        {/* Favourites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favourites.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
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
                  className="absolute top-2 right-2 bg-pink-100 text-pink-600 hover:bg-pink-200"
                  onClick={() => handleRemoveFromFavourites(product.id, product.name)}
                >
                  <Trash2 className="h-4 w-4" />
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
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites; 