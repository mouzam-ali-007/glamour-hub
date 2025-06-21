import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserDropdownMenu from "./UserDropDownMenu";
import ShoppingBag from "./ShoppingBag";
import FavouriteDropdown from "./Favourite";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Inside Header component
  const [showFavMenu, setShowFavMenu] = useState(false);
  const favMenuRef = useRef<HTMLDivElement>(null);

  // Use Redux instead of AuthContext
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const favourites = [
    { product: "Blush Palette", price: "4 USD" },
    { product: "Mascara Waterproof", price: "5 USD" },
  ];

  const handleSignOut = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/login');
    console.log("User signed out");
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
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

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products, brands..."
                className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex items-center space-x-2 relative"
            ref={userMenuRef}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
              onClick={() => {
                setShowFavMenu((prev) => {
                  setShowUserMenu(false);
                  return !prev;
                });
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>

            {showFavMenu && (
              <FavouriteDropdown
                items={favourites}
                onViewFavourites={() => {
                  setShowFavMenu(false);
                  console.log("Navigating to Favourites page...");
                }}
              />
            )}

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for products, brands..."
              className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
