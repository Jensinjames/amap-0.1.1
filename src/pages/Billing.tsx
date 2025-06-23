import React, { useState } from 'react';
import { CreditCard, Download, Calendar, Zap, Crown, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'Free',
    credits: 50,
    features: [
      'Basic content generation',
      'Email support',
      'Export to PDF/DOCX',
      'Basic templates',
    ],
    current: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: '/month',
    credits: 500,
    features: [
      'Advanced content generation',
      'Priority support',
      'All export formats',
      'Premium templates',
      'Analytics dashboard',
    ],
    current: false,
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 99,
    period: '/month',
    credits: 2000,
    features: [
      'Everything in Pro',
      'Team collaboration (3 seats)',
      'Advanced integrations',
      'Custom templates',
      'Priority support',
    ],
    current: false,
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199,
    period: '/month',
    credits: 5000,
    features: [
      'Everything in Growth',
      'Team collaboration (5 seats)',
      'White-label options',
      'API access',
      'Dedicated support',
    ],
    current: false,
    popular: false,
  },
];

const invoices = [
  {
    id: 'inv_001',
    date: '2024-01-15',
    amount: 29.00,
    status: 'paid',
    plan: 'Pro Plan',
  },
  {
    id: 'inv_002',
    date: '2023-12-15',
    amount: 29.00,
    status: 'paid',
    plan: 'Pro Plan',
  },
  {
    id: 'inv_003',
    date: '2023-11-15',
    amount: 29.00,
    status: 'paid',
    plan: 'Pro Plan',
  },
];

export const Billing: React.FC = () => {
  const { plan } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">
          Manage your subscription, view usage, and download invoices.
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-purple-600" />
            <span className="text-lg font-semibold text-purple-600 capitalize">
              {plan?.plan_type || 'Starter'} Plan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-700">Credits Used</span>
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {plan?.credits_used || 0} / {plan?.credits_total || 50}
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
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

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Next Billing</span>
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {plan?.current_period_end 
                ? formatDate(plan.current_period_end)
                : 'N/A'
              }
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-700">Status</span>
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-900 capitalize">
              {plan?.status || 'Active'}
            </div>
          </div>
        </div>

        {plan?.plan_type === 'starter' && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-yellow-800">Upgrade for More Features</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Get more credits, team collaboration, and advanced features with a paid plan.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Plans */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((planOption) => (
            <div
              key={planOption.id}
              className={`
                relative bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all duration-200
                ${planOption.popular ? 'border-purple-600 transform scale-105' : 'border-gray-200'}
                ${planOption.current ? 'ring-2 ring-green-500' : ''}
              `}
            >
              {planOption.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {planOption.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{planOption.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-900">
                    ${billingCycle === 'yearly' && planOption.price > 0 
                      ? Math.round(planOption.price * 0.8 * 12) 
                      : planOption.price
                    }
                  </span>
                  <span className="text-gray-600 ml-1">
                    {planOption.price === 0 
                      ? planOption.period 
                      : billingCycle === 'yearly' ? '/year' : planOption.period
                    }
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {planOption.credits.toLocaleString()} credits/month
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {planOption.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={planOption.current}
                className={`
                  w-full py-2 px-4 rounded-lg font-medium transition-colors
                  ${planOption.current
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : planOption.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {planOption.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center mr-4">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/25</p>
            </div>
          </div>
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
          <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{invoice.plan}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};