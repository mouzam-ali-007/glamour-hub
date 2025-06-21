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

interface HeaderProps {
  onMenuClick: () => void;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearch, onFilterChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [showFavMenu, setShowFavMenu] = useState(false);
  const favMenuRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section: Mobile menu button + Logo */}
          <div className="flex items-center gap-2"> {/* Use gap for spacing */}
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
          </div>


          {/* Enhanced Search bar - hidden on mobile, now takes available space */}
          {/* Added 'flex-grow' to make it expand and 'justify-center' to center its content if it's smaller than the available space */}
          <div className="hidden md:flex flex-grow justify-center mx-8">
            <SearchBar
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              placeholder="Search for products..."
            />
          </div>

          {/* Action buttons - Right section */}
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