# AMAP - AI Marketing Asset Platform

A comprehensive SaaS platform that helps founders and marketers generate professional marketing content using AI. Built with React, TypeScript, Supabase, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **AI Content Generation**: Generate emails, social posts, landing pages, ad copy, strategies, and funnels
- **Credit System**: Flexible credit-based usage tracking
- **Team Collaboration**: Role-based access control and team management
- **Export Options**: PDF, DOCX, and clipboard export functionality
- **Real-time Dashboard**: Performance metrics and content management

### Authentication & Security
- Email/password authentication with Supabase Auth
- Row Level Security (RLS) for data protection
- Secure password reset flow
- User profile management

### Database Architecture
- **Users & Profiles**: Extended user management
- **Plans & Credits**: Subscription and usage tracking
- **Teams**: Collaborative workspace management
- **Content**: Generated asset storage and management
- **Integrations**: External service connections
- **Transactions**: Credit usage ledger

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amap-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_APP_URL=http://localhost:5173
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file in the Supabase SQL editor:
     ```sql
     -- Copy and paste the contents of supabase/migrations/create_initial_schema.sql
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Core Tables
- `user_profiles` - Extended user information
- `user_plans` - Subscription and credit management
- `teams` - Team workspace management
- `team_members` - Team membership with roles
- `generated_content` - AI-generated marketing assets
- `integration_tokens` - External service connections
- `credit_transactions` - Usage tracking ledger

### Key Features
- **Row Level Security**: All tables protected with RLS policies
- **Credit Management**: Automated credit deduction and tracking
- **Team Collaboration**: Role-based access (owner, admin, editor, member, viewer)
- **Audit Trail**: Complete transaction history

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#6366F1 to #8B5CF6)
- **Secondary**: Blue accent (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Scale**: Tailwind's default type scale

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover states
- **Forms**: Clean inputs with focus states
- **Navigation**: Sidebar with active states

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Generate/       # Content generation wizard
│   └── Layout/         # Layout components
├── lib/                # Utility libraries
│   ├── auth.ts         # Authentication helpers
│   └── supabase.ts     # Supabase client and types
├── pages/              # Page components
├── store/              # Zustand state management
└── App.tsx             # Main application component
```

## 🚀 Deployment

### Supabase Setup
1. Create a new Supabase project
2. Run the database migration
3. Configure authentication settings
4. Set up Row Level Security policies

### Frontend Deployment
The app can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Environment Variables
Ensure all environment variables are set in your deployment platform.

## 🔐 Security

### Authentication
- Supabase Auth with email/password
- Secure session management
- Password reset functionality

### Authorization
- Row Level Security (RLS) on all tables
- Role-based access control for teams
- User data isolation

### Data Protection
- All sensitive data encrypted at rest
- HTTPS enforced
- Input validation and sanitization

## 📈 Monitoring & Analytics

### Built-in Analytics
- Credit usage tracking
- Content generation metrics
- User engagement data
- Performance dashboards

### External Integrations
- Stripe for payments
- OpenAI for content generation
- Email service providers
- Marketing automation tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@amap.com or join our Discord community.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core content generation
- ✅ User authentication
- ✅ Credit system
- ✅ Basic dashboard

### Phase 2 (Next)
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Integration marketplace
- [ ] Mobile app

### Phase 3 (Future)
- [ ] White-label solution
- [ ] API access
- [ ] Advanced AI models
- [ ] Enterprise features

---

Built with ❤️ for founders who want to focus on building, not marketing.