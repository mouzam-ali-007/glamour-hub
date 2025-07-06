import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setOrders, setCurrentOrder, setLoading, setError } from '@/store/slices/orderSlice';
import { OrderService } from '@/services/orderService';
import { Order } from '@/store/slices/orderSlice';

export const useOrderTracking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, currentOrder, loading, error } = useSelector((state: RootState) => state.orders);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');

  // Load user orders
  const loadUserOrders = async () => {
    if (!user?.id) return;
    
    try {
      dispatch(setLoading(true));
      const userOrders = await OrderService.getUserOrders(user.id);
      dispatch(setOrders(userOrders));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to load orders'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Search orders
  const searchOrders = async (query: string) => {
    try {
      dispatch(setLoading(true));
      const results = await OrderService.searchOrders(query, user?.id);
      dispatch(setOrders(results));
      setSearchQuery(query);
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to search orders'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get order by ID
  const getOrderById = async (orderId: string) => {
    try {
      dispatch(setLoading(true));
      const order = await OrderService.getOrderById(orderId);
      if (order) {
        dispatch(setCurrentOrder(order));
      } else {
        dispatch(setError('Order not found'));
      }
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to load order'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get order by tracking number
  const getOrderByTracking = async (trackingNumber: string) => {
    try {
      dispatch(setLoading(true));
      const order = await OrderService.getOrderByTracking(trackingNumber);
      if (order) {
        dispatch(setCurrentOrder(order));
      } else {
        dispatch(setError('Order not found'));
      }
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to load order'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Clear error
  const clearError = () => {
    dispatch(setError(null));
  };

  // Clear current order
  const clearCurrentOrder = () => {
    dispatch(setCurrentOrder(null));
  };

  return {
    orders,
    currentOrder,
    loading,
    error,
    searchQuery,
    loadUserOrders,
    searchOrders,
    getOrderById,
    getOrderByTracking,
    clearError,
    clearCurrentOrder,
  };
}; 