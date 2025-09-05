import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Crown, Settings as SettingsIcon, Info } from 'lucide-react';
import { StateSelector } from './components/StateSelector';
import { RightsCard } from './components/RightsCard';
import { ActionButtons } from './components/ActionButtons';
import { AIGenerator } from './components/AIGenerator';
import { PremiumUpgrade } from './components/PremiumUpgrade';
import { Settings } from './components/Settings';
import { stateLaws } from './data/stateLaws';
import { useGeolocation } from './hooks/useGeolocation';
import { userService } from './services/userService';

function App() {
  const [userData, setUserData] = useState(userService.getUserData());
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('rights');

  const { location } = useGeolocation();
  const stateLaw = stateLaws[userData.state] || stateLaws['CA'];

  useEffect(() => {
    // Auto-detect state based on location (simplified)
    if (location) {
      // In a real app, you'd use reverse geocoding to determine the state
      console.log('User location:', location);
    }
  }, [location]);

  const handleUpgrade = (plan, subscription) => {
    console.log('Upgrading to:', plan, subscription);
    const updatedUserData = userService.getUserData();
    setUserData(updatedUserData);
    setShowUpgrade(false);
    alert(`Welcome to Premium! You've selected the ${plan} plan.`);
  };

  const handleStateChange = (newState) => {
    userService.updateUserState(newState);
    setUserData(userService.getUserData());
  };

  const handleLanguageChange = (newLanguage) => {
    userService.updateLanguagePreference(newLanguage);
    setUserData(userService.getUserData());
  };

  const tabs = [
    { id: 'rights', label: 'My Rights', icon: Shield },
    { id: 'tools', label: 'Safety Tools', icon: Shield },
    { id: 'ai', label: 'AI Generator', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-accent p-2 rounded-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Bailiwick AI</h1>
                <p className="text-sm text-text-secondary">Know Your Rights. Stay Safe.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {userData.premiumStatus ? (
                <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-accent text-white rounded-full text-sm hover:bg-accent/90 transition-colors"
                >
                  <Crown className="h-4 w-4" />
                  <span>Upgrade</span>
                </button>
              )}

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {showMenu && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
              <nav className="space-y-2">
                <button 
                  onClick={() => {
                    setShowSettings(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* State Selector */}
        <div className="mb-6">
          <StateSelector
            selectedState={userData.state}
            onStateChange={handleStateChange}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'rights' && (
            <RightsCard
              stateLaw={stateLaw}
              language={userData.languagePreference}
              onLanguageChange={handleLanguageChange}
              expanded={true}
            />
          )}

          {activeTab === 'tools' && (
            <ActionButtons isPremium={userData.premiumStatus} />
          )}

          {activeTab === 'ai' && (
            <AIGenerator
              selectedState={userData.state}
              isPremium={userData.premiumStatus}
            />
          )}
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-red-800 mb-1">Emergency Disclaimer</h3>
              <p className="text-sm text-red-700 leading-relaxed">
                This app provides general legal information and should not replace professional legal advice. 
                In emergencies, prioritize your safety. Call 911 if you're in immediate danger. 
                Laws vary by jurisdiction and situation.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Premium Upgrade Modal */}
      {showUpgrade && (
        <PremiumUpgrade
          onUpgrade={handleUpgrade}
          onClose={() => setShowUpgrade(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => {
            setShowSettings(false);
            // Refresh user data in case settings changed
            setUserData(userService.getUserData());
          }}
        />
      )}
    </div>
  );
}

export default App;
