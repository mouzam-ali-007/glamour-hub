import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading, 
  currentPage = 1, 
  itemsPerPage = 12,
  onPageChange 
}) => {
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-pink-200 rounded w-3/4"></div>
                <div className="h-4 bg-pink-200 rounded w-1/2"></div>
                <div className="h-6 bg-pink-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">💄</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ProductGrid;