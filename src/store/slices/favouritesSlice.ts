import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
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

interface FavouritesState {
  items: Product[];
  isOpen: boolean;
}

const initialState: FavouritesState = {
  items: [],
  isOpen: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleFavourites: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    openFavourites: (state) => {
      state.isOpen = true;
    },
    closeFavourites: (state) => {
      state.isOpen = false;
    },
    clearFavourites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
  toggleFavourites,
  openFavourites,
  closeFavourites,
  clearFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer; 