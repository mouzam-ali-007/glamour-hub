import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  Sparkles,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

export interface SearchFilters {
  category?: string;
  priceRange?: string;
  rating?: number;
  brand?: string;
  sortBy?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterChange, 
  placeholder = "Search for products...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState([
    'Lipstick', 'Foundation', 'Eyeshadow Palette', 'Mascara', 'Blush'
  ]);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
        return newSearches;
      });
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setIsExpanded(false);
    onSearch('');
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value) {
                setIsExpanded(true);
              } else {
                setIsExpanded(false);
              }
            }}
            onFocus={() => setIsExpanded(true)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pl-12 pr-32 h-14 text-base border-2 border-pink-200 focus:border-pink-400 focus:ring-pink-400 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg placeholder:text-gray-400 placeholder:font-medium"
          />
          
          {/* Clear and Filter buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-8 px-3 text-xs font-medium rounded-full transition-all duration-200 ${
                showFilters 
                  ? 'bg-pink-100 text-pink-600 border border-pink-200' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>

        {/* Enhanced Search Button */}
        <Button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Search className="h-4 w-4 ml-2" />
          Search
        </Button>
      </div>

      {/* Expanded Search Results */}
      {isExpanded && (
        <Card className="absolute top-full left-0 right-0 mt-3 z-50 shadow-2xl border-pink-200 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-pink-100 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
                      onClick={() => {
                        setQuery(search);
                        handleSearch(search);
                      }}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-pink-500" />
                <span className="text-sm font-semibold text-gray-700">Trending</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-pink-50 border-pink-200 text-pink-700 px-3 py-1 rounded-full transition-colors duration-200"
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Categories */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-gray-700">Popular Categories</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Lipstick', 'Foundation', 'Eyeshadow', 'Mascara', 'Blush', 'Concealer'].map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left hover:bg-pink-50 text-gray-700 rounded-xl h-10 transition-colors duration-200"
                    onClick={() => {
                      setQuery(category);
                      handleSearch(category);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="absolute top-full left-0 right-0 mt-3 z-50 shadow-2xl border-pink-200 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:border-pink-400 focus:ring-pink-400 transition-colors duration-200"
                  onChange={(e) => handleFilterChange({ category: e.target.value })}
                  value={filters.category || ''}
                >
                  <option value="">All Categories</option>
                  <option value="lipstick">Lipstick</option>
                  <option value="foundation">Foundation</option>
                  <option value="eyeshadow">Eyeshadow</option>
                  <option value="mascara">Mascara</option>
                  <option value="blush">Blush</option>
                  <option value="concealer">Concealer</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Price Range</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:border-pink-400 focus:ring-pink-400 transition-colors duration-200"
                  onChange={(e) => handleFilterChange({ priceRange: e.target.value })}
                  value={filters.priceRange || ''}
                >
                  <option value="">All Prices</option>
                  <option value="0-20">Under $20</option>
                  <option value="20-40">$20 - $40</option>
                  <option value="40-60">$40 - $60</option>
                  <option value="60+">Over $60</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Rating</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:border-pink-400 focus:ring-pink-400 transition-colors duration-200"
                  onChange={(e) => handleFilterChange({ rating: Number(e.target.value) })}
                  value={filters.rating || ''}
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:border-pink-400 focus:ring-pink-400 transition-colors duration-200"
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  value={filters.sortBy || ''}
                >
                  <option value="">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilters({});
                  onFilterChange?.({});
                }}
                className="text-gray-600 hover:text-gray-800 rounded-xl px-4 py-2"
              >
                Clear All
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-gray-600 hover:text-gray-800 rounded-xl px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar; 