import React from 'react';
import { GenerationWizard } from '../components/Generate/GenerationWizard';
import { Wand2 } from 'lucide-react';

export const Generate: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
          <Wand2 className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Generate Marketing Content
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create professional marketing assets in minutes with our AI-powered generation wizard.
          Choose from emails, social posts, landing pages, and more.
        </p>
      </div>

      {/* Generation Wizard */}
      <GenerationWizard />
    </div>
  );
};