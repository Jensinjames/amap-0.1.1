import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wand2, 
  FileText, 
  Users, 
  Settings, 
  CreditCard,
  Plug,
  BarChart3,
  Zap
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate', href: '/generate', icon: Wand2 },
  { name: 'Content', href: '/content', icon: FileText },
  { name: 'Teams', href: '/teams', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Billing', href: '/billing', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-16">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Prompt */}
        <div className="flex-shrink-0 px-4 py-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Zap className="w-6 h-6" />
              <div className="ml-3">
                <p className="text-sm font-medium">Upgrade to Pro</p>
                <p className="text-xs opacity-90">Get unlimited credits</p>
              </div>
            </div>
            <button className="mt-3 w-full bg-white text-purple-600 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};