import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wand2, 
  FileText, 
  TrendingUp, 
  Zap, 
  Plus,
  Calendar,
  Users,
  BarChart3,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import { supabase } from '../lib/supabase';

const quickActions = [
  {
    title: 'Generate Email Campaign',
    description: 'Create compelling email content with AI',
    icon: Wand2,
    href: '/generate?type=email',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Social Media Posts',
    description: 'Generate posts for all platforms',
    icon: FileText,
    href: '/generate?type=social_post',
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Landing Page Copy',
    description: 'High-converting page content',
    icon: TrendingUp,
    href: '/generate?type=landing_page',
    color: 'from-purple-500 to-purple-600',
  },
];

const stats = [
  { name: 'Total Content Generated', value: '0', icon: FileText, change: '+0%' },
  { name: 'Credits Used This Month', value: '0', icon: Zap, change: '+0%' },
  { name: 'Team Members', value: '1', icon: Users, change: '+0%' },
  { name: 'Avg. Generation Time', value: '< 30s', icon: Clock, change: '-20%' },
];

export const Dashboard: React.FC = () => {
  const { user, profile, plan } = useAuthStore();
  const { contents, setContents } = useContentStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentContent();
  }, [user]);

  const fetchRecentContent = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      setContents(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {profile?.full_name || user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Ready to create some amazing marketing content today?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center" />
                    <span className="sr-only">Increased by</span>
                    {stat.change}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <Link
            to="/generate"
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            View all options
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-200
                `}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {action.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Content & Credits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
            <Link
              to="/content"
              className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              View all
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <p className="text-gray-500 mt-2">Loading content...</p>
              </div>
            ) : contents.length === 0 ? (
              <div className="p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No content yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first piece of content.
                </p>
                <div className="mt-6">
                  <Link
                    to="/generate"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Content
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {contents.map((content) => (
                  <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {content.title}
                        </h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="capitalize">{content.type.replace('_', ' ')}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(content.created_at)}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Zap className="w-4 h-4 mr-1" />
                        {content.credits_cost || 1} credits
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Credits & Plan Info */}
        <div className="space-y-6">
          {/* Credits Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Credits</h3>
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Used this month</span>
                  <span>{plan?.credits_used || 0} / {plan?.credits_total || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: plan?.credits_total
                        ? `${Math.min((plan.credits_used / plan.credits_total) * 100, 100)}%`
                        : '0%',
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {plan?.credits_remaining || 0}
                </div>
                <div className="text-sm text-gray-500">Credits remaining</div>
              </div>

              {plan?.plan_type === 'starter' && (
                <Link
                  to="/billing"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-center block"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Content Generated</span>
                <span className="text-sm font-medium text-gray-900">{contents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Credits Used</span>
                <span className="text-sm font-medium text-gray-900">{plan?.credits_used || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Plan Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {plan?.plan_type || 'Starter'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};