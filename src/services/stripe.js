import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    id: 'monthly',
    name: 'Monthly Premium',
    price: 5,
    interval: 'month',
    priceId: 'price_monthly_premium', // This would be your actual Stripe price ID
    features: [
      'AI-powered script generation',
      'Real-time recording',
      'Emergency contact alerts',
      'Advanced sharing features',
      'Priority support'
    ]
  },
  ANNUAL: {
    id: 'annual',
    name: 'Annual Premium',
    price: 50,
    interval: 'year',
    priceId: 'price_annual_premium', // This would be your actual Stripe price ID
    features: [
      'All monthly features',
      '2 months free',
      'Priority customer support',
      'Early access to new features',
      'Legal resource library'
    ]
  }
};

export class StripeService {
  constructor() {
    this.stripe = null;
    this.init();
  }

  async init() {
    this.stripe = await stripePromise;
  }

  async createCheckoutSession(planId, userId) {
    try {
      const plan = SUBSCRIPTION_PLANS[planId.toUpperCase()];
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      // In a real implementation, this would call your backend API
      // which would create a Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: userId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await this.stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  async createPortalSession(customerId) {
    try {
      // In a real implementation, this would call your backend API
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          returnUrl: window.location.origin,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Customer Portal
      window.location.href = session.url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }

  // Mock function for demo purposes
  async mockSubscription(planId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          subscription: {
            id: `sub_${Date.now()}`,
            plan: SUBSCRIPTION_PLANS[planId.toUpperCase()],
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          }
        });
      }, 2000); // Simulate API delay
    });
  }
}

export const stripeService = new StripeService();
