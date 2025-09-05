# Bailiwick AI - Know Your Rights. Stay Safe. Instantly.

A mobile web application providing instant, location-specific legal guidance and safety tools for interactions with law enforcement.

## 🚀 Features

### Core Features Implemented

#### 1. State-Specific Rights & Scripts
- ✅ Comprehensive legal information for all US states
- ✅ "What to say" and "What NOT to say" scripts
- ✅ Bilingual support (English/Spanish)
- ✅ Mobile-optimized one-page guides
- ✅ State-specific legal nuances

#### 2. Real-time Interaction Tools
- ✅ One-tap audio/video recording
- ✅ Emergency contact alerts with location
- ✅ Quick-access safety buttons
- ✅ Recording management and sharing
- ✅ Interaction logging

#### 3. AI-Powered Content Generation
- ✅ Context-aware rights card generation
- ✅ Custom script creation based on situation
- ✅ Location-specific legal advice
- ✅ Shareable content creation
- ✅ Premium AI features

### Additional Features

#### User Management
- ✅ Persistent user preferences
- ✅ State and language settings
- ✅ Premium subscription tracking
- ✅ Data export/import functionality

#### Contact Management
- ✅ Emergency contact database
- ✅ Contact categorization
- ✅ Primary contact designation
- ✅ Contact editing and management

#### Subscription System
- ✅ Freemium model implementation
- ✅ Stripe integration ready
- ✅ Monthly ($5) and Annual ($50) plans
- ✅ Feature gating for premium users

## 🛠 Technical Implementation

### Architecture
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with localStorage persistence
- **Payment Processing**: Stripe integration
- **AI Integration**: OpenAI API for content generation

### Design System
Following the PRD specifications:
- **Colors**: Custom HSL color palette
- **Typography**: Responsive text scaling
- **Spacing**: Consistent 8px grid system
- **Components**: Modular, reusable UI components
- **Animations**: Smooth transitions and micro-interactions

### Data Model
Implemented as specified in PRD:

#### User Entity
```javascript
{
  userId: string,
  state: string,
  languagePreference: 'english' | 'spanish',
  premiumStatus: boolean,
  subscription: object,
  settings: {
    autoLocation: boolean,
    notifications: boolean,
    recordingQuality: 'low' | 'medium' | 'high'
  }
}
```

#### Contact Entity
```javascript
{
  id: string,
  name: string,
  phone: string,
  email: string,
  relationship: string,
  isPrimary: boolean
}
```

#### InteractionLog Entity
```javascript
{
  logId: string,
  userId: string,
  timestamp: string,
  type: string,
  recordingUrl: string,
  sharedWith: array,
  sharedStatus: string
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-8134.git
   cd this-is-a-8134
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
   VITE_API_BASE_URL=https://your-api-server.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 User Flows

### Onboarding Flow
1. User lands on welcome screen
2. State selection (auto-detect or manual)
3. Feature overview presentation
4. Optional premium upgrade prompt

### Rights Access Flow
1. Navigate to "My Rights" tab
2. View state-specific legal information
3. Switch between English/Spanish
4. Access quick reference scripts

### Safety Tools Flow
1. Navigate to "Safety Tools" tab
2. One-tap recording start/stop
3. Emergency alert to contacts
4. Recording management and sharing

### AI Generation Flow (Premium)
1. Navigate to "AI Generator" tab
2. Describe current situation
3. Select language preference
4. Generate custom rights card
5. Share or save generated content

## 🔧 Configuration

### Tailwind CSS Custom Theme
The app uses a custom design system matching PRD specifications:

```javascript
// tailwind.config.js
colors: {
  'bg': 'hsl(225 10% 95%)',
  'accent': 'hsl(150 60% 45%)',
  'primary': 'hsl(220 40% 30%)',
  'surface': 'hsl(0 0% 100%)',
  'text-primary': 'hsl(220 20% 20%)',
  'text-secondary': 'hsl(220 10% 40%)',
}
```

### Component Structure
```
src/
├── components/
│   ├── StateSelector.jsx      # State selection component
│   ├── RightsCard.jsx         # Legal rights display
│   ├── ActionButtons.jsx      # Safety tools interface
│   ├── AIGenerator.jsx        # AI content generation
│   ├── ContactPicker.jsx      # Contact selection modal
│   ├── PremiumUpgrade.jsx     # Subscription upgrade
│   └── Settings.jsx           # User settings management
├── data/
│   └── stateLaws.js          # Legal information database
├── hooks/
│   ├── useGeolocation.js     # Location detection
│   ├── useRecording.js       # Media recording
│   └── useAI.js              # AI integration
├── services/
│   ├── userService.js        # User data management
│   └── stripe.js             # Payment processing
└── App.jsx                   # Main application component
```

## 🔐 Security & Privacy

### Data Storage
- All user data stored locally using localStorage
- No sensitive data transmitted without encryption
- User can export/import data for backup
- Complete data deletion available

### Recording Privacy
- Recordings stored locally on device
- User controls all sharing and deletion
- No automatic cloud uploads
- Secure sharing with selected contacts only

### Legal Compliance
- General legal information only
- Not a substitute for professional legal advice
- Clear disclaimers throughout the app
- Emergency safety prioritized

## 🎯 Business Model Implementation

### Freemium Structure
- **Free Tier**: Basic rights information, simple scripts
- **Premium Tier ($5/month or $50/year)**:
  - AI-powered custom scripts
  - Real-time recording capabilities
  - Emergency contact alerts
  - Advanced sharing features
  - Priority support

### Subscription Features
- Stripe integration for secure payments
- Subscription management portal
- Feature gating implementation
- Usage analytics and tracking

## 🚀 Deployment

### Docker Support
```bash
# Build Docker image
docker build -t bailiwick-ai .

# Run container
docker run -p 3000:3000 bailiwick-ai
```

### Environment Variables for Production
```env
VITE_OPENAI_API_KEY=prod_openai_key
VITE_STRIPE_PUBLIC_KEY=pk_live_stripe_key
VITE_API_BASE_URL=https://api.bailiwick-ai.com
VITE_APP_VERSION=1.0.0
```

## 📊 Analytics & Monitoring

### Key Metrics Tracked
- User engagement with rights information
- Recording usage patterns
- Premium conversion rates
- State-specific usage analytics
- Emergency feature utilization

### Error Handling
- Comprehensive error boundaries
- Graceful degradation for offline use
- User-friendly error messages
- Automatic error reporting

## 🤝 Contributing

### Development Guidelines
1. Follow React best practices
2. Use TypeScript for new features
3. Maintain responsive design
4. Test on mobile devices
5. Follow accessibility guidelines

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Consistent naming conventions
- Component documentation required

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Emergency Disclaimer
⚠️ **IMPORTANT**: This app provides general legal information and should not replace professional legal advice. In emergencies, prioritize your safety. Call 911 if you're in immediate danger.

### Contact Support
- Email: support@bailiwick-ai.com
- Documentation: [docs.bailiwick-ai.com](https://docs.bailiwick-ai.com)
- Issues: [GitHub Issues](https://github.com/vistara-apps/this-is-a-8134/issues)

---

**Bailiwick AI** - Empowering citizens with knowledge and tools for safer police interactions.
