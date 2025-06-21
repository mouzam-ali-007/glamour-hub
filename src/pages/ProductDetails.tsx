import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';
import { products } from '@/data/mockData';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { AppDispatch } from '@/store/store';
import { toast } from 'sonner';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    dispatch(openCart());
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Mock additional images for the product
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different images
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-pink-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Name */}
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                    NEW
                  </Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    SALE
                  </Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-pink-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-100 text-red-600">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="h-4 w-4 text-green-500" />
                <span>Easy returns and exchanges</span>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Rating:</strong> {product.rating}/5 stars</p>
                {product.isNew && <p><strong>Status:</strong> New Arrival</p>}
                {product.isSale && <p><strong>Status:</strong> On Sale</p>}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the perfect blend of luxury and performance with this premium {product.category.toLowerCase()}. 
                Crafted with the finest ingredients and innovative technology, this product delivers exceptional results 
                that will enhance your beauty routine. Whether you're a makeup enthusiast or a professional artist, 
                this versatile product is designed to meet your needs and exceed your expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card 
                  key={relatedProduct.id} 
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-purple-50 cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.isNew && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                        NEW
                      </Badge>
                    )}
                    {relatedProduct.isSale && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        SALE
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 font-medium">{relatedProduct.brand}</p>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-pink-600">${relatedProduct.price}</span>
                        {relatedProduct.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${relatedProduct.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 