/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';

const ShoppingBagDropdown = ({ items = [], onViewCart }: { items: any[]; onViewCart: () => void }) => {
    console.log("ITEMS", items);
  return (
    <div className="absolute top-12 right-12 w-64 bg-white border border-pink-100 shadow-md rounded-md z-50">
      <div className="p-3 text-sm text-gray-700 max-h-60 overflow-y-auto">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="py-1 border-b last:border-none text-gray-600">
            
              <span className="block font-medium">{item.product}</span>
              <span className="text-xs text-gray-500">{item.price}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Your cart is empty.</p>
        )}
      </div>
      <hr className="border-pink-100" />
      <Button
        variant="ghost"
        className="w-full justify-center px-3 py-2 text-pink-600 hover:bg-pink-50"
        onClick={onViewCart}
      >
        View Full Cart
      </Button>
    </div>
  );
};

export default ShoppingBagDropdown;
