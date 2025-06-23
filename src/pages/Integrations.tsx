import React, { useState } from 'react';
import { Plug, Check, ExternalLink, Settings, Zap, Mail, Database, Workflow } from 'lucide-react';

const integrations = [
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sync your email campaigns and audience data',
    icon: Mail,
    category: 'Email Marketing',
    status: 'available',
    color: 'bg-yellow-100 text-yellow-600',
    connected: false,
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Automate email sequences and subscriber management',
    icon: Mail,
    category: 'Email Marketing',
    status: 'available',
    color: 'bg-pink-100 text-pink-600',
    connected: false,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps and automate workflows',
    icon: Zap,
    category: 'Automation',
    status: 'available',
    color: 'bg-orange-100 text-orange-600',
    connected: false,
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Organize and track your marketing data',
    icon: Database,
    category: 'Database',
    status: 'available',
    color: 'bg-blue-100 text-blue-600',
    connected: false,
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Self-hosted workflow automation platform',
    icon: Workflow,
    category: 'Automation',
    status: 'coming_soon',
    color: 'bg-purple-100 text-purple-600',
    connected: false,
  },
  {
    id: 'webflow',
    name: 'Webflow',
    description: 'Deploy landing pages directly to your site',
    icon: ExternalLink,
    category: 'Website',
    status: 'coming_soon',
    color: 'bg-indigo-100 text-indigo-600',
    connected: false,
  },
];

const categories = ['All', 'Email Marketing', 'Automation', 'Database', 'Website'];

export const Integrations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);

  const filteredIntegrations = integrations.filter(
    integration => selectedCategory === 'All' || integration.category === selectedCategory
  );

  const handleConnect = (integrationId: string) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
    } else {
      setConnectedIntegrations(prev => [...prev, integrationId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600">
          Connect AMAP with your favorite tools to streamline your marketing workflow.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Plug className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">
                Available Integrations
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {integrations.filter(i => i.status === 'available').length}
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">
                Connected
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {connectedIntegrations.length}
              </dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500">
                Coming Soon
              </dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {integrations.filter(i => i.status === 'coming_soon').length}
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredIntegrations.map((integration) => {
          const isConnected = connectedIntegrations.includes(integration.id);
          const isAvailable = integration.status === 'available';

          return (
            <div
              key={integration.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${integration.color}`}>
                    <integration.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {integration.category}
                    </span>
                  </div>
                </div>
                
                {isConnected && (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {integration.description}
              </p>

              <div className="flex items-center justify-between">
                {isAvailable ? (
                  <button
                    onClick={() => handleConnect(integration.id)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      isConnected
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
                
                <button className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Integration CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
        <Plug className="mx-auto h-12 w-12 mb-4 opacity-90" />
        <h3 className="text-2xl font-bold mb-2">Need a Custom Integration?</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Don't see the tool you need? We're constantly adding new integrations. 
          Let us know what you'd like to connect and we'll prioritize it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Request Integration
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
            View API Docs
          </button>
        </div>
      </div>
    </div>
  );
};