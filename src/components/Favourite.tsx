import React from 'react';
import { Button } from '@/components/ui/button';

interface FavouriteDropdownProps {
  items: { product: string; price: string }[];
  onViewFavourites: () => void;
}

const FavouriteDropdown: React.FC<FavouriteDropdownProps> = ({
  items,
  onViewFavourites,
}) => {
  return (
    <div className="absolute top-12 right-20 w-64 bg-white border border-pink-100 shadow-md rounded-md z-50">
      <div className="p-3">
        <h2 className="text-sm font-semibold mb-2 text-pink-600">Favourites</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">No favourite items yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="block font-medium">{item.product}</span>
                <span className="text-xs text-gray-500">{item.price}</span>
              </li>
            ))}
          </ul>
        )}
        <Button
          variant="ghost"
          className="mt-3 w-full justify-start text-pink-600 hover:bg-pink-50"
          onClick={onViewFavourites}
        >
          View All Favourites
        </Button>
      </div>
    </div>
  );
};

export default FavouriteDropdown;
