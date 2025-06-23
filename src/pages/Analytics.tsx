import React from 'react';
import { BarChart3, TrendingUp, Eye, MousePointer, Calendar, Download, Filter } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">
              Track the performance of your marketing content and campaigns.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>Custom range</option>
              </select>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Content Generated
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  24
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                  <span className="sr-only">Increased by</span>
                  12%
                </div>
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Views
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  1,247
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                  <span className="sr-only">Increased by</span>
                  8%
                </div>
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MousePointer className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Click-through Rate
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  3.2%
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                  <span className="sr-only">Increased by</span>
                  5%
                </div>
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Conversion Rate
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  2.1%
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 self-center transform rotate-180" />
                  <span className="sr-only">Decreased by</span>
                  2%
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select className="appearance-none pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white">
                <option>All Content</option>
                <option>Email Campaigns</option>
                <option>Social Posts</option>
                <option>Landing Pages</option>
              </select>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <p className="text-gray-600">Performance chart visualization</p>
              <p className="text-sm text-gray-500 mt-1">Coming soon with advanced analytics</p>
            </div>
          </div>
        </div>

        {/* Content Type Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Type Performance</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Email Campaigns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm text-gray-600">75%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Social Posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm text-gray-600">60%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Landing Pages</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm text-gray-600">45%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">Ad Copy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm text-gray-600">30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
        <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-90" />
        <h3 className="text-2xl font-bold mb-2">Advanced Analytics Coming Soon</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Get detailed insights into your content performance, audience engagement, 
          and conversion metrics. Track ROI and optimize your marketing strategy with data-driven decisions.
        </p>
        <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Get Notified When Available
        </button>
      </div>
    </div>
  );
};