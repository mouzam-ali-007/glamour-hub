/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  ShoppingBag as ShoppingBagIcon, 
  X, 
  Plus, 
  Minus, 
  Trash2,
  ShoppingCart
} from 'lucide-react';
import { 
  selectCartItems, 
  selectCartItemCount, 
  selectCartTotal,
  selectCartIsOpen,
  removeFromCart,
  updateQuantity,
  clearCart,
  openCart,
  closeCart
} from '@/store/slices/cartSlice';
import { AppDispatch } from '@/store/store';
import { toast } from 'sonner';
import OrderTrackingWidget from './OrderTrackingWidget';

const ShoppingBag: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectCartIsOpen);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? dispatch(openCart()) : dispatch(closeCart())}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBagIcon className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-pink-500"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0 h-full">
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 min-h-0">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-6 space-y-6">
              <div>
                <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some products to get started!</p>
              </div>
              <OrderTrackingWidget className="w-full max-w-sm" />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-0">
                {cartItems.map((item) => (
                  <Card key={item.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                              <p className="text-sm text-gray-500">{item.brand}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-red-500"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {item.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border-t px-6 py-4 space-y-4 bg-white flex-shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-pink-600">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleClearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingBag;
