import React from 'react';
import { Crown, Check, X } from 'lucide-react';

export function PremiumUpgrade({ onUpgrade, onClose, className = '' }) {
  const features = [
    { name: 'State-specific rights info', free: true, premium: true },
    { name: 'Basic interaction scripts', free: true, premium: true },
    { name: 'AI-powered custom scripts', free: false, premium: true },
    { name: 'Video/audio recording', free: false, premium: true },
    { name: 'Emergency contact alerts', free: false, premium: true },
    { name: 'Location-based auto-sharing', free: false, premium: true },
    { name: 'Offline access', free: false, premium: true },
    { name: 'Priority support', free: false, premium: true },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-text-primary">Upgrade to Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-accent">$5/month or $50/year</p>
            <p className="text-sm text-text-secondary">
              Get full access to all safety and legal tools
            </p>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-sm text-text-primary">{feature.name}</span>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-text-secondary">Free</span>
                    {feature.free ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-text-secondary">Premium</span>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onUpgrade('annual')}
              className="w-full bg-accent text-white py-3 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors"
            >
              Get Annual Plan - $50/year (Save $10!)
            </button>
            <button
              onClick={() => onUpgrade('monthly')}
              className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Get Monthly Plan - $5/month
            </button>
            <button
              onClick={onClose}
              className="w-full text-text-secondary py-2 text-sm hover:text-text-primary transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}