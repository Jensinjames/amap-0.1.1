import React from 'react';
import { Users, Plus, Settings, Crown, UserPlus, Search, Filter } from 'lucide-react';

export const Teams: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teams</h1>
            <p className="text-gray-600">
              Collaborate with your team members and manage access to your marketing content.
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </button>
        </div>
      </div>

      {/* Current Plan Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <Crown className="w-6 h-6 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Upgrade to Growth or Elite for Team Features
            </h3>
            <p className="text-blue-700 mb-4">
              Team collaboration is available on Growth and Elite plans. Invite team members, 
              assign roles, and collaborate on marketing content together.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Team Management Interface (Preview) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
                  disabled
                >
                  <option>All Roles</option>
                  <option>Owner</option>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </button>
            </div>
          </div>
        </div>

        {/* Team Members List (Preview) */}
        <div className="p-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Team Collaboration Coming Soon
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Invite team members, assign roles, and collaborate on marketing content. 
              Available on Growth and Elite plans.
            </p>
            
            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Role-Based Access</h4>
                <p className="text-sm text-gray-600">
                  Control who can view, edit, or manage your marketing content
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Team Workspaces</h4>
                <p className="text-sm text-gray-600">
                  Organize content by teams and projects for better collaboration
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Easy Invitations</h4>
                <p className="text-sm text-gray-600">
                  Send email invitations and onboard team members quickly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};