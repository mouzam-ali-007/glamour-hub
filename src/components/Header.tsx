/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserDropdownMenu from "./UserDropDownMenu";
import ShoppingBag from "./ShoppingBag";
import FavouriteDropdown from "./Favourite";
import SearchBar from "./SearchBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Switch } from './ui/switch';
import { useTheme } from './theme-provider';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearch, onFilterChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Inside Header component
  const [showFavMenu, setShowFavMenu] = useState(false);
  const favMenuRef = useRef<HTMLDivElement>(null);

  // Use Redux instead of AuthContext
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleSignOut = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/login');
    console.log("User signed out");
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    onSearch?.(query);
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filter change:', filters);
    onFilterChange?.(filters);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        favMenuRef.current &&
        !favMenuRef.current.contains(event.target as Node)
      ) {
        setShowFavMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm dark:bg-background dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-pink-600"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              GlamourHub
            </h1>
          </div>

          {/* Enhanced Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              placeholder="Search for products..."
            />
          </div>

          {/* Action buttons */}
          <div
            className="flex items-center space-x-2 relative"
            ref={userMenuRef}
          >
            {/* Dark mode toggle */}
            <div className="flex items-center mr-2">
              <Sun className={`h-5 w-5 mr-1 ${theme === 'light' ? 'text-yellow-400' : 'text-gray-400'}`} />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Toggle dark mode"
              />
              <Moon className={`h-5 w-5 ml-1 ${theme === 'dark' ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
            {/* Favourites Button with Badge */}
            <div className="relative" ref={favMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 relative"
                onClick={() => {
                  setShowFavMenu((prev) => {
                    setShowUserMenu(false);
                    return !prev;
                  });
                }}
              >
                <Heart className="h-5 w-5" />
                {favourites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center p-0">
                    {favourites.length > 9 ? '9+' : favourites.length}
                  </Badge>
                )}
              </Button>

              {showFavMenu && (
                <FavouriteDropdown
                  onViewFavourites={() => {
                    setShowFavMenu(false);
                    console.log("Navigating to Favourites page...");
                  }}
                />
              )}
            </div>
            {/* Shopping Bag with Redux integration */}
            <ShoppingBag />
            <Button
              variant="ghost"
              size="icon"
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              onClick={() => {
                setShowUserMenu((prev) => {
                  setShowFavMenu(false);
                  return !prev;
                });
              }}
            >
              <User className="h-5 w-5" />
            </Button>
            {/* User Dropdown */}
            {showUserMenu && (
              <UserDropdownMenu
                user={isLoggedIn ? user : undefined}
                onSignOut={handleSignOut}
                setShowUserMenu={setShowUserMenu}
                isLoggedIn={isLoggedIn}
              />
            )}
          </div>
        </div>
        {/* Mobile search bar */}
        <div className="md:hidden mt-3">
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            placeholder="Search for products..."
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
