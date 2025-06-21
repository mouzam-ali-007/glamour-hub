import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import { categories, products } from '@/data/mockData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setActiveCategory(categoryId);
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  };

  const sidebarContent = (
    <div className="p-4">
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header onMenuClick={toggleSidebar} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="w-64 flex-shrink-0">
              {sidebarContent}
            </div>
          )}

          {/* Mobile Sidebar */}
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
              <SheetContent side="left" className="w-80">
                {sidebarContent}
              </SheetContent>
            </Sheet>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;