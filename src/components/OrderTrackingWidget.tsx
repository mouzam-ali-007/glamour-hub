import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Search, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface OrderTrackingWidgetProps {
  className?: string;
}

const OrderTrackingWidget: React.FC<OrderTrackingWidgetProps> = ({ className = '' }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      // Navigate to order tracking page with the tracking number
      navigate(`/orders?tracking=${trackingNumber}`);
    } else {
      toast.error('Please enter a tracking number');
    }
  };

  const handleViewAllOrders = () => {
    navigate('/orders');
  };

  return (
    <Card className={`bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-pink-600" />
          Track Your Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Enter tracking number or order ID
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 1Z999AA1234567890 or ORD-2024-001"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
            />
            <Button
              onClick={handleTrackOrder}
              size="icon"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleViewAllOrders}
            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          >
            View All Orders
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Badge variant="outline" className="border-pink-200 text-pink-700">
            Free Shipping
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrackingWidget; 