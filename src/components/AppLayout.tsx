/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const itemsPerPage = 12;

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Additional filters
    if (filters.category && filters.category !== activeCategory) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Sort products
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, activeCategory, searchQuery, filters]);

  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setActiveCategory(categoryId);
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, category: categoryId }));
    setTimeout(() => setLoading(false), 500);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
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
      <Header 
        onMenuClick={toggleSidebar}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      
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
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            
            <ProductGrid 
              products={filteredProducts} 
              loading={loading}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;