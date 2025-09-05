import React, { useState } from 'react';
import { Crown, Check, X, Loader2 } from 'lucide-react';
import { stripeService, SUBSCRIPTION_PLANS } from '../services/stripe';
import { userService } from '../services/userService';

export function PremiumUpgrade({ onUpgrade, onClose, className = '' }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
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

  const handleUpgrade = async (planId) => {
    setIsProcessing(true);
    setSelectedPlan(planId);

    try {
      const userData = userService.getUserData();
      
      // For demo purposes, use mock subscription
      // In production, this would redirect to Stripe Checkout
      const result = await stripeService.mockSubscription(planId);
      
      if (result.success) {
        // Update user's premium status
        userService.updatePremiumStatus(true, result.subscription);
        
        // Call the parent component's onUpgrade function
        onUpgrade(planId, result.subscription);
        
        // Close the modal
        onClose();
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Upgrade failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

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
              onClick={() => handleUpgrade('annual')}
              disabled={isProcessing}
              className="w-full bg-accent text-white py-3 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing && selectedPlan === 'annual' ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Annual Plan - $50/year (Save $10!)'
              )}
            </button>
            <button
              onClick={() => handleUpgrade('monthly')}
              disabled={isProcessing}
              className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing && selectedPlan === 'monthly' ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Get Monthly Plan - $5/month'
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="w-full text-text-secondary py-2 text-sm hover:text-text-primary transition-colors disabled:opacity-50"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
