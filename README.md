# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.




# npm install
# npm run dev



# Cart Functionality with Redux Toolkit

This document outlines the cart functionality implementation using Redux Toolkit for real-time state management.

## Features Implemented

### 1. Add to Cart
## 21.06..
- **Location**: `src/components/ProductCard.tsx`
- **Functionality**: Clicking "Add to Cart" button adds the product to the cart
- **Features**:
  - Automatically opens the cart sidebar
  - Shows success toast notification
  - Increments quantity if item already exists
  - Real-time state updates

### 2. Remove from Cart
- **Location**: `src/components/ShoppingBag.tsx`
- **Functionality**: Remove individual items from cart
- **Features**:
  - X button on each cart item
  - Immediate removal with toast notification
  - Real-time state updates

### 3. Update Quantity
- **Location**: `src/components/ShoppingBag.tsx`
- **Functionality**: Increase/decrease item quantities
- **Features**:
  - Plus/minus buttons for quantity control
  - Automatic removal when quantity reaches 0
  - Real-time price calculations

### 4. Clear Cart
- **Location**: `src/components/ShoppingBag.tsx`
- **Functionality**: Remove all items from cart
- **Features**:
  - "Clear Cart" button
  - Confirmation toast notification
  - Immediate state reset

## Redux Store Structure

### Cart Slice (`src/store/slices/cartSlice.ts`)
```typescript
interface CartState {
  items: CartItem[];  // Array of cart items with quantities
  isOpen: boolean;    // Cart sidebar open/close state
}

interface CartItem extends Product {
  quantity: number;   // Quantity of the item in cart
}


### Actions Available
- `addToCart(product)` - Add product to cart
- `removeFromCart(id)` - Remove item by ID
- `updateQuantity({id, quantity})` - Update item quantity
- `clearCart()` - Remove all items
- `toggleCart()` - Toggle cart sidebar
- `openCart()` - Open cart sidebar
- `closeCart()` - Close cart sidebar

### Selectors Available
- `selectCartItems` - Get all cart items
- `selectCartItemCount` - Get total number of items
- `selectCartTotal` - Get total price
- `selectCartIsOpen` - Get cart sidebar state

## Components

### 1. ShoppingBag Component
- **File**: `src/components/ShoppingBag.tsx`
- **Features**:
  - Cart sidebar with slide-out animation
  - Real-time item count badge
  - Item list with images, names, prices
  - Quantity controls
  - Remove buttons
  - Total calculation
  - Clear cart and checkout buttons

### 2. ProductCard Component
- **File**: `src/components/ProductCard.tsx`
- **Features**:
  - Add to cart button with Redux integration
  - Automatic cart opening
  - Success notifications

### 3. CartSummary Component
- **File**: `src/components/CartSummary.tsx`
- **Features**:
  - Reusable cart summary display
  - Item count and total price
  - Optional badge display

## Usage Examples





## Real-time Features

1. **Instant Updates**: All cart changes are immediately reflected across the app
2. **Persistent State**: Cart state persists during navigation
3. **Toast Notifications**: User feedback for all cart actions
4. **Badge Updates**: Cart item count updates in real-time
5. **Price Calculations**: Total updates automatically with quantity changes

## Integration Points

- **Header**: Shopping bag icon with item count badge
- **Product Grid**: Add to cart buttons on each product card
- **Cart Sidebar**: Full cart management interface
- **Toast System**: Success notifications for user actions

## Future Enhancements

1. **Cart Persistence**: Save cart to localStorage
2. **Guest Cart**: Allow cart functionality without login
3. **Wishlist Integration**: Move items between cart and wishlist
4. **Bulk Actions**: Select multiple items for removal
5. **Cart Sharing**: Share cart with others
6. **Inventory Check**: Prevent adding out-of-stock items 

1. Product Quick View
Allow users to preview product details in a modal without leaving the product grid.
Show images, price, description, and add-to-cart/favourite buttons.

2. Recently Viewed Products
Show a carousel of products the user recently viewed for easy navigation back.
