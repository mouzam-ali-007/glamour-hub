import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemCount, selectCartTotal } from '@/store/slices/cartSlice';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  showBadge?: boolean;
  className?: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ showBadge = true, className = '' }) => {
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <ShoppingBag className="h-5 w-5 text-pink-600" />
        {showBadge && itemCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500"
          >
            {itemCount}
          </Badge>
        )}
      </div>
      <div className="text-sm">
        <div className="font-medium text-gray-900">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </div>
        <div className="text-pink-600 font-semibold">
          ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartSummary; 