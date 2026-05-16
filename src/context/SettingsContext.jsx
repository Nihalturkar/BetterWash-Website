import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

import { API_URL } from '../config';

const defaultSettings = {
  logo: '/betterwashLogo.jpeg',
  siteName: 'BetterWash',
  offers: [
    '5% Extra Off on Prepaid Orders | Free Delivery on ₹299+',
    'Flat 30% Off on All Shampoos — Use Code: WASH30',
    'Buy 2 Get 1 Free on Body Wash Range',
    'New Launch: Herbal Face Pack — Introductory Price ₹199'
  ],
  heroBanners: [
    { id: 1, title: 'Herbal Hair Care', subtitle: 'Nourish Your Hair Naturally', description: 'Premium shampoos & conditioners with pure herbal extracts for silky, healthy hair.', cta: 'Shop Hair Care', link: '/category/Shampoo', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80', bgColor: '#e8f5f5' },
    { id: 2, title: 'Glow Up Your Skin', subtitle: 'Face Care Essentials', description: 'Vitamin C cleansers, neem face packs & more for a radiant, clear complexion.', cta: 'Shop Face Care', link: '/category/Face Cleanser', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80', bgColor: '#fef5f0' },
    { id: 3, title: 'Body Care Collection', subtitle: 'Refresh & Rejuvenate', description: 'Luxurious body washes, scrubs & lotions for soft, moisturized skin all day.', cta: 'Shop Body Care', link: '/category/Body Wash', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee0c8d?w=600&q=80', bgColor: '#f0f7f4' },
    { id: 4, title: 'Deep Moisturization', subtitle: '24-Hour Hydration', description: 'Hyaluronic acid & shea butter formulas that keep your skin plump and hydrated.', cta: 'Shop Moisturizers', link: '/category/Moisturizer', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80', bgColor: '#f5f0fe' }
  ],
  aboutUs: {
    badge: 'Our Story',
    title: 'About BetterWash',
    paragraphs: [
      'BetterWash was born from a simple belief — everyone deserves access to premium, natural skincare products. Founded in 2023, we set out to create a brand that combines the best of nature and science.',
      'Our products are crafted with carefully selected natural ingredients, free from harmful chemicals, and designed to deliver real results.'
    ],
    features: ['Paraben & Sulphate Free', 'Dermatologically Tested', 'Suitable for All Skin Types', 'Made in India'],
    stats: [
      { icon: '🌿', value: '100%', label: 'Natural Ingredients' },
      { icon: '🔬', value: 'Lab Tested', label: 'Dermatologist Approved' },
      { icon: '🐰', value: 'Cruelty Free', label: 'No Animal Testing' },
      { icon: '♻️', value: 'Eco-Friendly', label: 'Sustainable Packaging' }
    ]
  },
  socialLinks: {
    instagram: '',
    facebook: '',
    twitter: '',
    youtube: '',
  },
  whatsappNumber: '',
  videoAds: [],
  reviews: [
    { id: 1, name: 'Priya Sharma', rating: 5, text: 'BetterWash shampoo has completely transformed my hair! Absolutely love it!', product: 'Herbal Shampoo', avatar: 'PS' },
    { id: 2, name: 'Rahul Verma', rating: 5, text: 'The body wash smells amazing and leaves my skin feeling fresh all day.', product: 'Refresh Body Wash', avatar: 'RV' },
    { id: 3, name: 'Anita Patel', rating: 4, text: 'BetterWash moisturizer is gentle yet effective. My skin has never felt better!', product: 'Hydra Moisturizer', avatar: 'AP' },
    { id: 4, name: 'Vikash Kumar', rating: 5, text: 'The face cleanser cleared my acne in just a month. Premium quality!', product: 'Glow Face Cleanser', avatar: 'VK' },
    { id: 5, name: 'Neha Gupta', rating: 5, text: 'Love the neem face pack! It controls my oily skin perfectly.', product: 'Neem Face Pack', avatar: 'NG' },
    { id: 6, name: 'Arjun Singh', rating: 4, text: 'The rose body lotion is incredibly luxurious. Worth every rupee!', product: 'Rose Body Lotion', avatar: 'AS' }
  ]
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  const refreshSettings = () => {
    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
  };

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
