import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const recentlyViewed = useSelector((state: RootState) => state.recentlyViewed.items);
  const navigate = useNavigate();
  return (
    <AppProvider>
      <AppLayout />
      {/* Recently Viewed Carousel */}
      {recentlyViewed.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-4 text-pink-600">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50">
            {recentlyViewed.map(product => (
              <div
                key={product.id}
                className="min-w-[180px] max-w-[180px] bg-white dark:bg-background rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-pink-100 flex-shrink-0"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <div className="text-xs text-gray-500 truncate">{product.brand}</div>
                  <div className="font-semibold text-gray-900 dark:text-white truncate">{product.name}</div>
                  <div className="text-pink-600 font-bold">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppProvider>
  );
};

export default Index;
