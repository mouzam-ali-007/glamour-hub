import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-between text-left ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                : 'hover:bg-pink-50 text-gray-700'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="flex items-center space-x-2">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </div>
            <Badge
              variant="secondary"
              className={`${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-pink-100 text-pink-700'
              }`}
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;