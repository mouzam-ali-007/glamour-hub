import { Order, OrderStatus } from '@/store/slices/orderSlice';
import { mockOrders } from '@/data/orderData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class OrderService {
  // Get all orders for a user
  static async getUserOrders(userId: string): Promise<Order[]> {
    await delay(500); // Simulate API call
    return mockOrders.filter(order => order.userId === userId);
  }

  // Get a specific order by ID
  static async getOrderById(orderId: string): Promise<Order | null> {
    await delay(300);
    return mockOrders.find(order => order.id === orderId) || null;
  }

  // Get order by tracking number
  static async getOrderByTracking(trackingNumber: string): Promise<Order | null> {
    await delay(300);
    return mockOrders.find(order => order.trackingNumber === trackingNumber) || null;
  }

  // Create a new order
  static async createOrder(orderData: Omit<Order, 'id' | 'orderDate' | 'status'>): Promise<Order> {
    await delay(1000);
    
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString(),
      status: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          description: 'Order placed successfully',
        }
      ],
      currentStatus: 'pending',
    };

    // In a real app, this would be saved to the database
    mockOrders.unshift(newOrder);
    
    return newOrder;
  }

  // Update order status
  static async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    await delay(500);
    
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status.push(status);
      order.currentStatus = status.status;
      return order;
    }
    
    return null;
  }

  // Get order status updates
  static async getOrderStatusUpdates(orderId: string): Promise<OrderStatus[]> {
    await delay(300);
    
    const order = mockOrders.find(o => o.id === orderId);
    return order ? order.status : [];
  }

  // Cancel an order
  static async cancelOrder(orderId: string): Promise<boolean> {
    await delay(500);
    
    const order = mockOrders.find(o => o.id === orderId);
    if (order && order.currentStatus === 'pending') {
      order.status.push({
        status: 'cancelled',
        timestamp: new Date().toISOString(),
        description: 'Order cancelled by customer',
      });
      order.currentStatus = 'cancelled';
      return true;
    }
    
    return false;
  }

  // Get order analytics
  static async getOrderAnalytics(userId: string) {
    await delay(800);
    
    const userOrders = mockOrders.filter(order => order.userId === userId);
    
    return {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: userOrders.length > 0 
        ? userOrders.reduce((sum, order) => sum + order.total, 0) / userOrders.length 
        : 0,
      ordersByStatus: {
        pending: userOrders.filter(o => o.currentStatus === 'pending').length,
        confirmed: userOrders.filter(o => o.currentStatus === 'confirmed').length,
        processing: userOrders.filter(o => o.currentStatus === 'processing').length,
        shipped: userOrders.filter(o => o.currentStatus === 'shipped').length,
        delivered: userOrders.filter(o => o.currentStatus === 'delivered').length,
        cancelled: userOrders.filter(o => o.currentStatus === 'cancelled').length,
      }
    };
  }

  // Search orders
  static async searchOrders(query: string, userId?: string): Promise<Order[]> {
    await delay(400);
    
    let filteredOrders = mockOrders;
    
    if (userId) {
      filteredOrders = filteredOrders.filter(order => order.userId === userId);
    }
    
    return filteredOrders.filter(order =>
      order.id.toLowerCase().includes(query.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(query.toLowerCase()) ||
      order.items.some(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
} 