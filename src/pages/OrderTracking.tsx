import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Search,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  Copy,
  ExternalLink
} from 'lucide-react';
import { RootState, AppDispatch } from '@/store/store';
import { setOrders, setCurrentOrder } from '@/store/slices/orderSlice';
import { mockOrders } from '@/data/orderData';
import { toast } from 'sonner';

const OrderTracking: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { orders, currentOrder } = useSelector((state: RootState) => state.orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    // Load mock orders on component mount.
    
    dispatch(setOrders(mockOrders));
    
    // Check for tracking number in URL params
    const trackingParam = searchParams.get('tracking');
    if (trackingParam) {
      const order = mockOrders.find(o => 
        o.id.toLowerCase().includes(trackingParam.toLowerCase()) ||
        o.trackingNumber?.toLowerCase().includes(trackingParam.toLowerCase())
      );
      if (order) {
        dispatch(setCurrentOrder(order));
        setSelectedOrder(order.id);
        setSearchQuery(trackingParam);
      } else {
        toast.error('Order not found. Please check your tracking number.');
      }
    }
  }, [dispatch, searchParams]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleOrderSelect = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      dispatch(setCurrentOrder(order));
      setSelectedOrder(orderId);
    }
  };

  const handleSearch = () => {
    const order = orders.find(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()));
    if (order) {
      dispatch(setCurrentOrder(order));
      setSelectedOrder(order.id);
      setSearchQuery('');
    } else {
      toast.error('Order not found. Please check your order number.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Order Tracking
            </h1>
            <p className="text-gray-600 mt-1">Track your orders and view order history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order List */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by order # or tracking #"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedOrder === order.id
                        ? 'border-pink-300 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-25'
                    }`}
                    onClick={() => handleOrderSelect(order.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{order.id}</span>
                      <Badge className={getStatusColor(order.currentStatus)}>
                        {order.currentStatus}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ${order.total}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {currentOrder ? (
              <div className="space-y-6">
                {/* Order Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(currentOrder.currentStatus)}
                          Order {currentOrder.id}
                        </CardTitle>
                        <p className="text-gray-600 mt-1">
                          Placed on {formatDate(currentOrder.orderDate)}
                        </p>
                      </div>
                      <Badge className={`text-sm ${getStatusColor(currentOrder.currentStatus)}`}>
                        {currentOrder.currentStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Est. Delivery: {currentOrder.estimatedDelivery}
                        </span>
                      </div>
                      {currentOrder.trackingNumber && (
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Tracking: {currentOrder.trackingNumber}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(currentOrder.trackingNumber!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {currentOrder.paymentMethod.type === 'credit_card' 
                            ? `${currentOrder.paymentMethod.brand} •••• ${currentOrder.paymentMethod.last4}`
                            : currentOrder.paymentMethod.type.replace('_', ' ').toUpperCase()
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">${item.price} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${currentOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${currentOrder.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${currentOrder.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-pink-600">${currentOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentOrder.status.map((status, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${
                              index === currentOrder.status.length - 1 
                                ? 'bg-pink-500' 
                                : 'bg-gray-300'
                            }`} />
                            {index < currentOrder.status.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={getStatusColor(status.status)}>
                                {status.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {formatDate(status.timestamp)}
                              </span>
                            </div>
                            <p className="text-gray-700">{status.description}</p>
                            {status.location && (
                              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {status.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}</p>
                          <p>{currentOrder.shippingAddress.address}</p>
                          <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}</p>
                          <p>{currentOrder.shippingAddress.country}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Phone className="h-3 w-3" />
                            <span>{currentOrder.shippingAddress.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Billing Address</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{currentOrder.billingAddress.firstName} {currentOrder.billingAddress.lastName}</p>
                          <p>{currentOrder.billingAddress.address}</p>
                          <p>{currentOrder.billingAddress.city}, {currentOrder.billingAddress.state} {currentOrder.billingAddress.zipCode}</p>
                          <p>{currentOrder.billingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Order Selected</h3>
                  <p className="text-gray-600">
                    Select an order from the list to view its details and tracking information.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 