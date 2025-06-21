# Cart Functionality with Redux Toolkit

This document outlines the cart functionality implementation using Redux Toolkit for real-time state management.

## Features Implemented

### 1. Add to Cart
- **Location**: `src/components/ProductCard.tsx`
- **Functionality**: Clicking "Add to Cart" button adds the product to the cart
- **Features**:
  - Automatically opens the cart sidebar
  - Shows success toast notification
  - Increments quantity if item already exists
  - Real-time state updates
