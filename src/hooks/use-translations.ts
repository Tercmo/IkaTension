"use client";

import { useParams } from 'next/navigation';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

// Define a type for the translations structure (optional but recommended)
type Translations = typeof en; // Assuming 'en' has all keys

const translations: { [key: string]: Translations } = { en, es };

export function useTranslations() {
  const params = useParams();
  // Ensure params.lang is a string, default to 'en' if not or if unsupported
  const lang = typeof params.lang === 'string' && translations[params.lang] ? params.lang : 'en';

  return translations[lang];
}
