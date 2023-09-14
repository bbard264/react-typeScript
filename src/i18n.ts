import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files and types
import translationEN from './locales/en.json';
import translationTH from './locales/th.json';

const resources: Resource = {
  en: translationEN,
  th: translationTH,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
