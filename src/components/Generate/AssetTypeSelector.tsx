import React from 'react';
import { Mail, MessageSquare, Globe, Megaphone, TrendingUp, Layers } from 'lucide-react';

const assetTypes = [
  {
    id: 'email_sequence',
    name: 'Email Campaign',
    description: 'Generate compelling email campaigns with subject lines, content, and CTAs',
    icon: Mail,
    credits: 2,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'social_post',
    name: 'Social Media Posts',
    description: 'Create engaging posts for LinkedIn, Twitter, Facebook, and Instagram',
    icon: MessageSquare,
    credits: 1,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'landing_page',
    name: 'Landing Page Copy',
    description: 'Generate high-converting landing page headlines, copy, and sections',
    icon: Globe,
    credits: 3,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'ad_copy',
    name: 'Ad Copy',
    description: 'Create persuasive ad copy for Google Ads, Facebook Ads, and more',
    icon: Megaphone,
    credits: 2,
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'strategy_brief',
    name: 'Marketing Strategy',
    description: 'Generate comprehensive marketing strategies and action plans',
    icon: TrendingUp,
    credits: 4,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'funnel',
    name: 'Sales Funnel',
    description: 'Design complete sales funnels with multiple touchpoints',
    icon: Layers,
    credits: 5,
    color: 'from-indigo-500 to-indigo-600',
  },
];

interface AssetTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (type: string) => void;
  userCredits: number;
}

export const AssetTypeSelector: React.FC<AssetTypeSelectorProps> = ({
  selectedType,
  onSelectType,
  userCredits,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assetTypes.map((type) => {
        const canAfford = userCredits >= type.credits;
        const isSelected = selectedType === type.id;

        return (
          <button
            key={type.id}
            onClick={() => canAfford && onSelectType(type.id)}
            disabled={!canAfford}
            className={`
              p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-105
              ${isSelected
                ? 'border-purple-600 bg-purple-50 shadow-lg'
                : canAfford
                ? 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
              }
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`
                p-3 rounded-lg bg-gradient-to-r ${type.color}
              `}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <span className={`
                  text-sm font-medium px-2 py-1 rounded-full
                  ${canAfford ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}
                `}>
                  {type.credits} credits
                </span>
              </div>
            </div>
            
            <h3 className={`
              font-semibold text-lg mb-2
              ${isSelected ? 'text-purple-900' : canAfford ? 'text-gray-900' : 'text-gray-500'}
            `}>
              {type.name}
            </h3>
            
            <p className={`
              text-sm leading-relaxed
              ${isSelected ? 'text-purple-700' : canAfford ? 'text-gray-600' : 'text-gray-400'}
            `}>
              {type.description}
            </p>

            {!canAfford && (
              <div className="mt-3 text-xs text-red-600 font-medium">
                Insufficient credits
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};