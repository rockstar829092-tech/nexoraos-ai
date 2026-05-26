/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ErpModule {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  category: "admin" | "academic" | "finance" | "communication";
  features: string[];
  specs: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  avatarSeed: string;
  rating: number;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  tagline: string;
  studentCapacity: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
  supportType: string;
  bestFor: string;
  badge?: string;
}

export interface TelemetryMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: string;
  isPositive: boolean;
  history: number[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
