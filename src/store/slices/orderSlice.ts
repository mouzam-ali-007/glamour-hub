import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  timestamp: string;
  description: string;
  location?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: OrderStatus[];
  currentStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal' | 'apple_pay';
    last4?: string;
    brand?: string;
  };
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: OrderStatus }>) => {
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status.push(action.payload.status);
        order.currentStatus = action.payload.status.status;
      }
      if (state.currentOrder?.id === action.payload.orderId) {
        state.currentOrder.status.push(action.payload.status);
        state.currentOrder.currentStatus = action.payload.status.status;
      }
    },
    clearOrders: (state) => {
      state.orders = [];
      state.currentOrder = null;
    },
  },
});

export const {
  setLoading,
  setError,
  addOrder,
  setOrders,
  setCurrentOrder,
  updateOrderStatus,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer; 