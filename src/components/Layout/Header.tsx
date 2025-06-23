import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut, CreditCard, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { auth } from '../../lib/auth';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const { user, profile, plan } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent double-clicks
    
    setIsSigningOut(true);
    setShowUserMenu(false); // Close menu immediately
    
    try {
      // Show loading toast
      toast.loading('Signing out...', { id: 'signout' });
      
      // Sign out from auth service
      const { error } = await auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out', { id: 'signout' });
        return;
      }
      
      // Clear any local storage or session storage if needed
      localStorage.clear();
      sessionStorage.clear();
      
      // Success toast
      toast.success('Signed out successfully', { id: 'signout' });
      
      // Force navigation to home page
      window.location.href = '/';
      
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast.error('Unexpected error during sign out', { id: 'signout' });
      
      // Still navigate to home page on error
      window.location.href = '/';
    } finally {
      setIsSigningOut(false);
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">AMAP</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/generate" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Generate
            </Link>
            <Link 
              to="/content" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Content
            </Link>
            <Link 
              to="/teams" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Teams
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Credits Display */}
            {plan && (
              <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {plan.credits_remaining} credits
                </span>
              </div>
            )}

            {/* User Avatar Menu */}
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                disabled={isSigningOut}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {profile?.full_name || user.email}
                </span>
              </button>

              {showUserMenu && !isSigningOut && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <Link
                    to="/billing"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Billing
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};