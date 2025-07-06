import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

interface User {
  name: string;
  email: string;
}

interface UserDropdownMenuProps {
  user?: User;
  onSignOut?: () => void;
  setShowUserMenu: (show: boolean) => void;
  isLoggedIn?: boolean;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ 
  user, 
  onSignOut, 
  setShowUserMenu, 
  isLoggedIn = false 
}) => {
  return (
    <div className="absolute top-12 right-0 w-48 bg-white border border-pink-100 shadow-md rounded-md z-50">
      {isLoggedIn && user ? (
        <>
          <div className="p-3 text-sm text-gray-700">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <hr className="border-pink-100" />
          <Link
            to="/orders"
            className="flex items-center w-full text-left px-3 py-2 text-pink-600 hover:bg-pink-50 text-sm"
            onClick={() => setShowUserMenu(false)}
          >
            <Package className="h-4 w-4 mr-2" />
            Order Tracking
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-pink-600 hover:bg-pink-50"
            onClick={() => {
              onSignOut?.();
              setShowUserMenu(false);
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <div className="p-3 text-sm text-gray-700">
            <p className="font-semibold">Welcome!</p>
            <p className="text-xs text-gray-500">Sign in to your account</p>
          </div>
          <hr className="border-pink-100" />
          <Link
            to="/login"
            className="block w-full text-left px-3 py-2 text-pink-600 hover:bg-pink-50 text-sm"
            onClick={() => setShowUserMenu(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block w-full text-left px-3 py-2 text-pink-600 hover:bg-pink-50 text-sm"
            onClick={() => setShowUserMenu(false)}
          >
            Create Account
          </Link>
        </>
      )}
    </div>
  );
};

export default UserDropdownMenu;
