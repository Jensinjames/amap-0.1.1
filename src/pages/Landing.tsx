import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Wand2, 
  FileText, 
  Globe, 
  BarChart3, 
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Mail,
  Megaphone,
  Layers,
  Clock,
  Shield,
  Lock,
  Rocket,
  Settings,
  Play,
  Phone,
  Plus,
  Minus
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const features = [
  {
    icon: Mail,
    title: 'Email Sequences',
    description: 'Generate sales, onboarding, or nurture emails in seconds—just add your product.',
  },
  {
    icon: Megaphone,
    title: 'Ad Copy for All Platforms',
    description: 'Facebook, Instagram, Google—ready to test and optimized for clicks.',
  },
  {
    icon: Globe,
    title: 'High-Converting Landing Pages',
    description: 'Instant headlines, CTAs, and benefit-driven layouts.',
  },
  {
    icon: Layers,
    title: '1-Click Funnels',
    description: 'Go from zero to launch-ready campaigns—no tech skills required.',
  },
];

const painPoints = [
  {
    pain: "Don't have time for copywriting?",
    solution: "AI Copilot writes it for you.",
  },
  {
    pain: "Need to test offers, fast?",
    solution: "Validate ideas and iterate instantly.",
  },
  {
    pain: "Want pro marketing but not the price?",
    solution: "Get agency-quality assets, minus the agency.",
  },
  {
    pain: "Ready to scale but not to hire?",
    solution: "Automate, optimize, grow—without extra hires.",
  },
];

const pricingPlans = [
  {
    name: 'Pro',
    description: 'Solopreneurs, Lean Teams',
    price: '$29',
    period: '/mo',
    features: [
      'Core tools',
      'Monthly credits',
      'Basic integrations',
      'Email support',
    ],
    buttonText: 'Start Free',
    buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    popular: false,
  },
  {
    name: 'Growth',
    description: 'Coaches, Startups, SMBs',
    price: '$99',
    period: '/mo',
    features: [
      'More credits',
      'Advanced integrations',
      '3 team seats',
      'Priority support',
    ],
    buttonText: 'Start Free',
    buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
    popular: true,
  },
  {
    name: 'Elite',
    description: 'Agencies, Scaleups',
    price: '$199',
    period: '/mo',
    features: [
      'All features',
      'Automations',
      '5 team seats',
      'Priority support',
    ],
    buttonText: 'Start Free',
    buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    popular: false,
  },
  {
    name: 'Custom',
    description: 'Enterprise/Big Teams',
    price: 'Contact',
    period: '',
    features: [
      'Bespoke features',
      'VIP onboarding',
      'Unlimited seats',
      'Dedicated support',
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    popular: false,
  },
];

const testimonials = [
  {
    content: "AI Marketing Copilot replaced 90% of my agency spend—and I launched campaigns in hours.",
    author: "Jessica, SaaS Founder",
    rating: 5,
  },
  {
    content: "We went from idea to live funnel in a single weekend. Game changer.",
    author: "Ray, Creator & Consultant",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Do I need marketing experience?",
    answer: "No—just describe your offer and Copilot does the rest.",
  },
  {
    question: "What can I integrate?",
    answer: "Zapier, n8n, Mailchimp, ConvertKit, Webflow, and more.",
  },
  {
    question: "Do I own what I create?",
    answer: "Yes—100% yours to use or resell.",
  },
  {
    question: "What's in the free plan?",
    answer: "All core features, limited by monthly credits.",
  },
  {
    question: "Is it fast?",
    answer: "Yes—most campaigns launch in under 10 minutes.",
  },
  {
    question: "Agency/multi-brand ready?",
    answer: "Elite & Custom plans include team and client support.",
  },
];

const integrationLogos = [
  { name: 'Zapier', color: 'text-orange-500' },
  { name: 'Mailchimp', color: 'text-yellow-500' },
  { name: 'ConvertKit', color: 'text-pink-500' },
  { name: 'Stripe', color: 'text-blue-500' },
  { name: 'Supabase', color: 'text-green-500' },
  { name: 'GPT-4', color: 'text-purple-500' },
];

export const Landing: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [email, setEmail] = React.useState('');

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">AMAP</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900">Use Cases</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Try Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              AI Marketing Copilot
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
              Your All-in-One Marketing Engine — On Autopilot
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              You didn't launch a business to become a full-time marketer. But growth depends on the right message, 
              the right funnel, at the right time. AI Marketing Copilot takes your idea — and instantly turns it into 
              emails, ads, landing pages, and full funnels tailored to your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try Free
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-300 hover:text-purple-600 transition-all duration-200 text-lg">
                <Play className="w-5 h-5 mr-2" />
                See Live Demo
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-200 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Book Strategy Call
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 mb-12">
              <div className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-600" />
                <span>Powered by GPT-4</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>End-to-End Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-gray-600" />
                <span>Built on Supabase</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Automated with n8n</span>
              </div>
            </div>

            {/* Preview Image Placeholder */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-600">AI Marketing Copilot Dashboard</div>
                  </div>
                  
                  <div className="text-left space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="text-sm text-gray-600 mb-2">Campaign Type: Email Sequence</div>
                      <div className="text-purple-600 font-medium">✨ Generated in 12 seconds</div>
                    </div>
                    
                    <div className="text-center py-2">
                      <div className="text-sm text-gray-500">Launch your full marketing funnel in under 10 minutes.</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-4 text-center">
                      <div className="font-medium">Ready to Deploy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Automate Your Marketing—From Idea to Campaign
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Launch your full marketing funnel in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl mb-6 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-200">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Play className="w-5 h-5 mr-2" />
              See Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Founders, Solopreneurs & Small Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {painPoints.map((point, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">?</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium mb-2">{point.pain}</p>
                      <div className="flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4 text-purple-600" />
                        <p className="text-purple-600 font-semibold">{point.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                <BarChart3 className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join 1,200+ Founders
              </h3>
              <p className="text-gray-600 mb-8">
                Who've automated their marketing and focus on what they do best—building great products.
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Try Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Integrate. Automate. Trust.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrations</h3>
              <p className="text-gray-600">
                Zapier, n8n, Mailchimp, ConvertKit, Webflow, and more. Export your assets or use built-in funnel templates.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automation</h3>
              <p className="text-gray-600">
                Automate tasks, email flows, and campaign triggers. No-code workflow builder for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security</h3>
              <p className="text-gray-600">
                End-to-end encrypted, GDPR compliant. Built on Supabase and Stripe—trusted infrastructure.
              </p>
            </div>
          </div>

          {/* Integration Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 py-8 border-t border-gray-200">
            {integrationLogos.map((logo, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${logo.color}`}>
                  <Settings className="w-5 h-5" />
                </div>
                <span className="font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Plans That Scale With You
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              ✨ Try it free—no credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  relative bg-white rounded-xl shadow-lg border-2 p-8 hover:shadow-xl transition-all duration-200
                  ${plan.popular ? 'border-purple-600 transform scale-105' : 'border-gray-200'}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-x-4">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Start Free
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Compare Plans
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              Book Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted By Founders Like You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="text-gray-900 font-semibold">— {testimonial.author}</div>
              </div>
            ))}
          </div>

          {/* Case Study */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Case Study</h3>
            <p className="text-xl mb-4">"43% more leads, 12 hours saved every week"</p>
            <p className="text-purple-100">— Acme Startup</p>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 text-lg">1,200+ founders onboard</p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Try Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get AI Marketing Tips & Free Templates Weekly
          </h2>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to 10x Your Marketing Results?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of founders who are scaling their businesses with AI-powered marketing.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">AMAP</span>
              </div>
              <p className="text-gray-400">
                AI Marketing Copilot for founders who want to focus on building, not marketing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">GDPR</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Stripe</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Supabase</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">OpenAI</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AMAP. All rights reserved. Built for founders, by founders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};