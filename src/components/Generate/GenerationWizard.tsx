import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Wand2, Loader } from 'lucide-react';
import { AssetTypeSelector } from './AssetTypeSelector';
import { useAuthStore } from '../../store/authStore';
import { useContentStore } from '../../store/contentStore';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const steps = [
  { id: 'type', name: 'Asset Type', description: 'Choose what to generate' },
  { id: 'details', name: 'Details', description: 'Provide context' },
  { id: 'generate', name: 'Generate', description: 'AI creates your content' },
];

export const GenerationWizard: React.FC = () => {
  const { user, plan } = useAuthStore();
  const { addContent } = useContentStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    targetAudience: '',
    goals: '',
    tone: 'professional',
    additionalContext: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    if (!user || !selectedType || !plan) {
      toast.error('Missing required information');
      return;
    }

    setIsGenerating(true);

    try {
      // Check credits and deduct
      const { data: success, error: creditError } = await supabase
        .rpc('deduct_credits', {
          p_user_id: user.id,
          p_amount: getCreditsForType(selectedType),
          p_description: `Generated ${selectedType.replace('_', ' ')}`,
        });

      if (creditError || !success) {
        toast.error('Insufficient credits or error deducting credits');
        return;
      }

      // Simulate AI generation (replace with actual OpenAI API call)
      const generatedContent = await generateWithAI(selectedType, formData);

      // Save to database
      const { data: content, error: saveError } = await supabase
        .from('generated_content')
        .insert({
          user_id: user.id,
          type: selectedType,
          title: `${selectedType.replace('_', ' ')} - ${new Date().toLocaleDateString()}`,
          prompt: JSON.stringify(formData),
          content: generatedContent,
          metadata: { formData },
        })
        .select()
        .single();

      if (saveError) {
        toast.error('Error saving content');
        return;
      }

      addContent(content);
      toast.success('Content generated successfully!');
      
      // Reset form
      setCurrentStep(0);
      setSelectedType(null);
      setFormData({
        businessName: '',
        targetAudience: '',
        goals: '',
        tone: 'professional',
        additionalContext: '',
      });

    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Error generating content');
    } finally {
      setIsGenerating(false);
    }
  };

  const getCreditsForType = (type: string): number => {
    const creditMap: Record<string, number> = {
      email_sequence: 2,
      social_post: 1,
      landing_page: 3,
      ad_copy: 2,
      strategy_brief: 4,
      funnel: 5,
    };
    return creditMap[type] || 1;
  };

  const generateWithAI = async (type: string, data: any) => {
    // Simulate AI generation - replace with actual OpenAI API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockContent: Record<string, any> = {
      email_sequence: {
        subject: `Transform Your ${data.businessName} Results Today`,
        content: `Dear ${data.targetAudience},\n\nAre you ready to revolutionize your approach? Our proven system has helped thousands achieve their ${data.goals}.\n\nBest regards,\n${data.businessName}`,
        cta: 'Get Started Now',
      },
      social_post: {
        platforms: {
          linkedin: `🚀 Exciting news from ${data.businessName}! We're helping ${data.targetAudience} achieve ${data.goals}. Ready to transform your results?`,
          twitter: `🔥 ${data.businessName} is changing the game for ${data.targetAudience}! Ready to ${data.goals}? Let's connect!`,
        },
      },
      landing_page: {
        headline: `Transform Your ${data.businessName} Results in 30 Days`,
        subheadline: `Join thousands of ${data.targetAudience} who have achieved ${data.goals}`,
        sections: [
          { title: 'Problem', content: 'Traditional approaches are failing...' },
          { title: 'Solution', content: 'Our proven system delivers...' },
          { title: 'Results', content: 'See real transformations...' },
        ],
      },
    };

    return mockContent[type] || { content: 'Generated content placeholder' };
  };

  const canProceed = () => {
    if (currentStep === 0) return selectedType !== null;
    if (currentStep === 1) return formData.businessName && formData.targetAudience && formData.goals;
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium
                ${index <= currentStep
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-gray-300 bg-white text-gray-500'
                }
              `}>
                {index + 1}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  index <= currentStep ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4
                  ${index < currentStep ? 'bg-purple-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What would you like to generate?
            </h2>
            <AssetTypeSelector
              selectedType={selectedType}
              onSelectType={setSelectedType}
              userCredits={plan?.credits_remaining || 0}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tell us about your project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business/Product Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Small business owners, Tech startups"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Goals *
                </label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., Increase conversions, Build brand awareness"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone of Voice
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="playful">Playful</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context
                </label>
                <textarea
                  value={formData.additionalContext}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalContext: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Any additional information that would help generate better content..."
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ready to generate your content?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Generation Summary</h3>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <div><strong>Type:</strong> {selectedType?.replace('_', ' ')}</div>
                <div><strong>Business:</strong> {formData.businessName}</div>
                <div><strong>Audience:</strong> {formData.targetAudience}</div>
                <div><strong>Goals:</strong> {formData.goals}</div>
                <div><strong>Credits:</strong> {getCreditsForType(selectedType || '')} credits</div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          {currentStep < 2 && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};