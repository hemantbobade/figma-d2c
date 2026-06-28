import { PricingPlan } from "../types/pricing";

/**
 * Mock pricing service
 */
export const pricingService = {
  /**
   * Get pricing plans
   */
  async getPlans(): Promise<{ monthly: PricingPlan[]; annual: PricingPlan[] }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const monthlyPlans: PricingPlan[] = [
      {
        id: "basic-monthly",
        name: "Basic",
        description: "Everything you need to get started",
        price: 0,
        currency: "CHF",
        interval: "month",
        features: [
          "No monthly account fee",
          "Free Maestro / debit card",
          "Online & mobile banking",
          "Access to Swiss & EU ATMs",
          "Instant IBAN on sign-up",
        ],
        sku: "1-basic",
      },
      {
        id: "advantage-monthly",
        name: "Advantage",
        description: "More perks for everyday banking",
        price: 10,
        currency: "CHF",
        interval: "month",
        features: [
          "Everything in Basic",
          "1.0% interest on balance",
          "TWINT included",
          "Higher transfer limits",
          "Priority customer support",
        ],
        popular: true,
        sku: "2-advantage",
      },
      {
        id: "preferred-monthly",
        name: "Preferred",
        description: "Private banking, simplified",
        price: 25,
        currency: "CHF",
        interval: "month",
        features: [
          "Everything in Advantage",
          "Dedicated personal banker",
          "Preferred mortgage rates",
          "Premium travel insurance",
          "Higher daily payment limits",
        ],
        sku: "3-preferred",
      },
    ];

    const annualPlans: PricingPlan[] = [
      {
        id: "basic-annual",
        name: "Basic",
        description: "Everything you need to get started",
        price: 0,
        currency: "CHF",
        interval: "year",
        features: [
          "No monthly account fee",
          "Free Maestro / debit card",
          "Online & mobile banking",
          "Access to Swiss & EU ATMs",
          "Instant IBAN on sign-up",
        ],
        sku: "1-basic",
      },
      {
        id: "advantage-annual",
        name: "Advantage",
        description: "More perks for everyday banking",
        price: 100,
        currency: "CHF",
        interval: "year",
        features: [
          "Everything in Basic",
          "1.0% interest on balance",
          "TWINT included",
          "Higher transfer limits",
          "Priority customer support",
        ],
        popular: true,
        sku: "2-advantage",
      },
      {
        id: "preferred-annual",
        name: "Preferred",
        description: "Private banking, simplified",
        price: 250,
        currency: "CHF",
        interval: "year",
        features: [
          "Everything in Advantage",
          "Dedicated personal banker",
          "Preferred mortgage rates",
          "Premium travel insurance",
          "Higher daily payment limits",
        ],
        sku: "3-preferred",
      },
    ];

    return { monthly: monthlyPlans, annual: annualPlans };
  },

  /**
   * Calculate cart total
   */
  calculateTotal(plans: PricingPlan[]): number {
    return plans.reduce((total, plan) => total + plan.price, 0);
  },
};
