import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { removeFromFavourites } from '@/store/slices/favouritesSlice';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { toast } from 'sonner';

interface FavouriteDropdownProps {
  onViewFavourites: () => void;
}

const FavouriteDropdown: React.FC<FavouriteDropdownProps> = ({
  onViewFavourites,
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  return (
    <div className="absolute top-12 right-20 w-80 bg-white border border-pink-100 shadow-lg rounded-xl z-50 max-h-96 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-pink-600 flex items-center gap-2">
            <Heart className="h-5 w-5 fill-current" />
            Favourites ({favourites.length})
          </h2>
        </div>
        
        {favourites.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No favourite items yet.</p>
            <p className="text-gray-400 text-xs mt-1">Click the heart icon on products to add them here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favourites.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-xs text-gray-600">{item.brand}</p>
                  <p className="text-sm font-bold text-pink-600">${item.price}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveFromFavourites(item.id, item.name)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {favourites.length > 0 && (
          <Button
            variant="outline"
            className="mt-4 w-full justify-center text-pink-600 hover:bg-pink-50 border-pink-200"
            onClick={onViewFavourites}
          >
            View All Favourites
          </Button>
        )}
      </div>
    </div>
  );
};

export default FavouriteDropdown;
