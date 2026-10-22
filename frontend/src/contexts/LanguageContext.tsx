'use client';

import React, { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'fr' | 'uk' | 'ru' | 'en';

const translations = {
  en: {
    'language.label': 'Language',
    'social.follow': 'Follow us on',
    'navbar.services': 'Services',
    'navbar.gallery': 'Gallery',
    'navbar.bookVisit': 'Book a visit',
    'navbar.lightMode': 'Switch to light mode',
    'navbar.darkMode': 'Switch to dark mode',
    'navbar.paradise': 'PARADIS DES ANIMAUX',
    'hero.badge': 'Personal Stylist for Dogs',
    'hero.description': 'Professional grooming, specialized dental care, and relaxing ozone spa therapy for your companion in Cagnes-sur-Mer.',
    'hero.book': 'Book a visit',
    'certificates.title': 'Gift cards',
    'certificates.subtitle': 'Give the gift of care and relaxation.',
    'certificates.viewAll': 'View all gift cards',
    'certificates.slides': 'Gift card slides',
    'services.title': 'Our services',
    'services.subtitle': 'Complete care for your beloved dogs',
    'services.before': 'Before',
    'services.after': 'After',
    'gallery.title': 'Salon gallery',
    'gallery.subtitle': 'Moments of care, grooming, and beauty',
    'locations.title': 'Our salons',
    'locations.subtitle': 'Find the salon that suits you',
    'locations.team': 'Team:',
    'locations.view': 'View salon',
    'footer.copyright': 'Ambiance Canine and Paradise des Animaux. All rights reserved.',
    'common.back': 'Back',
    'common.address': 'Address',
    'common.viewMaps': 'View on Google Maps',
    'common.contact': 'Contact',
    'common.knownFor': 'Known for',
    'common.groomers': 'Available groomers',
    'common.worksAt': 'Works at',
    'common.location_one': 'salon',
    'common.location_many': 'salons',
    'common.noGroomers': 'No groomers are currently assigned to this salon.',
    'common.loadingServices': 'Unable to load services.',
    'common.loadingGallery': 'Unable to load the gallery.',
    'common.loadingLocations': 'Unable to load salons.',
    'common.loadingCertificates': 'Unable to load gift cards.',
    'common.lightboxGallery': 'Gallery',
    'certificateDetail.subtitle': 'Give the gift of care and relaxation.',
    'service.creative.title': 'Creative grooming',
    'service.creative.subtitle': 'Hygiene, wellbeing, and creativity',
    'service.creative.description': 'Discover our personalized services, tailored to your dog’s needs.',
    'service.teeth.title': 'Teeth brushing',
    'service.teeth.subtitle': 'Dental hygiene and care',
    'service.teeth.description': 'Gentle dental care to help maintain your dog’s healthy teeth and gums.',
    'service.spa.title': 'Ozone spa therapy',
    'service.spa.subtitle': 'Deep cleansing and a soothing bath',
    'service.spa.description': 'A soothing ozone therapy session to cleanse and comfort sensitive skin.',
    'certificate.spa.title': 'Ozone spa gift card',
    'certificate.spa.description': 'Give your dog a revitalizing ozone spa session. This oxygenating, purifying treatment nourishes the coat and provides deep relaxation, making it ideal for sensitive skin.',
    'certificate.credit.title': '€50 gift card',
    'certificate.credit.description': 'A €50 credit valid for any grooming or spa service. Give the gift of personalized care at our salons in Cagnes-sur-Mer and Nice.',
  },
  fr: {
    'language.label': 'Langue',
    'social.follow': 'Suivez-nous sur',
    'navbar.services': 'Services',
    'navbar.gallery': 'Galerie',
    'navbar.bookVisit': 'Prendre rendez-vous',
    'navbar.lightMode': 'Passer en mode clair',
    'navbar.darkMode': 'Passer en mode sombre',
    'navbar.paradise': 'PARADIS DES ANIMAUX',
    'hero.badge': 'Personal Stylist for Dogs',
    'hero.description': 'Toilettage professionnel, soins dentaires spécialisés et thérapie relaxante au spa à l’ozone, conçus pour votre compagnon à Cagnes-sur-Mer.',
    'hero.book': 'Réserver une visite',
    'certificates.title': 'Cartes cadeaux',
    'certificates.subtitle': 'Offrez un moment de soin et de détente.',
    'certificates.viewAll': 'Voir toutes les cartes cadeaux',
    'certificates.slides': 'Diapositives des cartes cadeaux',
    'services.title': 'Nos services',
    'services.subtitle': 'Des soins complets pour vos chiens bien-aimés',
    'services.before': 'Avant',
    'services.after': 'Après',
    'gallery.title': 'Galerie du salon',
    'gallery.subtitle': 'Des moments de soin, de toilettage et de beauté',
    'locations.title': 'Nos salons',
    'locations.subtitle': 'Trouvez le salon qui vous convient',
    'locations.team': 'Équipe :',
    'locations.view': 'Voir le salon',
    'footer.copyright': 'Ambiance Canine et Paradise des Animaux. Tous droits réservés.',
    'common.back': 'Retour',
    'common.address': 'Adresse',
    'common.viewMaps': 'Voir sur Google Maps',
    'common.contact': 'Contact',
    'common.knownFor': 'Réputé pour',
    'common.groomers': 'Toiletteurs disponibles',
    'common.worksAt': 'Travaille dans',
    'common.location_one': 'salon',
    'common.location_many': 'salons',
    'common.noGroomers': 'Aucun toiletteur n’est actuellement affecté à ce salon.',
    'common.loadingServices': 'Impossible de charger les services.',
    'common.loadingGallery': 'Impossible de charger la galerie.',
    'common.loadingLocations': 'Impossible de charger les salons.',
    'common.loadingCertificates': 'Impossible de charger les cartes cadeaux.',
    'common.lightboxGallery': 'Galerie',
    'certificateDetail.subtitle': 'Offrez un moment de soin et de détente.',
    'service.creative.title': 'Toilettage créatif',
    'service.creative.subtitle': 'Hygiène, bien-être et créativité',
    'service.creative.description': 'Découvrez nos services personnalisés, adaptés aux besoins de votre chien.',
    'service.teeth.title': 'Brossage des dents',
    'service.teeth.subtitle': 'Hygiène et soins dentaires',
    'service.teeth.description': 'Des soins dentaires doux pour préserver la santé des dents et des gencives de votre chien.',
    'service.spa.title': 'Spa et thérapie à l’ozone',
    'service.spa.subtitle': 'Nettoyage en profondeur et bain apaisant',
    'service.spa.description': 'Une séance apaisante de thérapie à l’ozone pour nettoyer et réconforter les peaux sensibles.',
    'certificate.spa.title': 'Bon cadeau spa à l’ozone',
    'certificate.spa.description': 'Offrez à votre chien une séance de spa à l’ozone revitalisante. Ce soin oxygénant et purifiant nourrit le poil et procure une détente profonde, idéal pour les peaux sensibles.',
    'certificate.credit.title': 'Bon cadeau de 50 euros',
    'certificate.credit.description': 'Un crédit de 50 € valable pour tout service de toilettage ou de spa. Offrez un moment de soin personnalisé dans nos salons de Cagnes-sur-Mer et de Nice.',
  },
  uk: {
    'language.label': 'Мова',
    'social.follow': 'Стежте за нами у',
    'navbar.services': 'Послуги',
    'navbar.gallery': 'Галерея',
    'navbar.bookVisit': 'Записатися',
    'navbar.lightMode': 'Увімкнути світлу тему',
    'navbar.darkMode': 'Увімкнути темну тему',
    'navbar.paradise': 'PARADIS DES ANIMAUX',
    'hero.badge': 'Personal Stylist for Dogs',
    'hero.description': 'Професійний грумінг, спеціалізоване чищення зубів і розслаблювальна озонова спа-терапія для вашого улюбленця в Cagnes-sur-Mer.',
    'hero.book': 'Записатися на візит',
    'certificates.title': 'Подарункові сертифікати',
    'certificates.subtitle': 'Подаруйте турботу та відпочинок.',
    'certificates.viewAll': 'Переглянути всі сертифікати',
    'certificates.slides': 'Слайди сертифікатів',
    'services.title': 'Наші послуги',
    'services.subtitle': 'Комплексний догляд за вашими улюбленими собаками',
    'services.before': 'До',
    'services.after': 'Після',
    'gallery.title': 'Галерея салону',
    'gallery.subtitle': 'Моменти турботи, грумінгу та краси',
    'locations.title': 'Наші салони',
    'locations.subtitle': 'Оберіть зручний для вас салон',
    'locations.team': 'Команда:',
    'locations.view': 'Переглянути салон',
    'footer.copyright': 'Ambiance Canine та Paradise des Animaux. Усі права захищено.',
    'common.back': 'Назад',
    'common.address': 'Адреса',
    'common.viewMaps': 'Переглянути на Google Maps',
    'common.contact': 'Контакти',
    'common.knownFor': 'Відомий завдяки',
    'common.groomers': 'Доступні грумери',
    'common.worksAt': 'Працює у',
    'common.location_one': 'салоні',
    'common.location_many': 'салонах',
    'common.noGroomers': 'До цього салону наразі не призначено грумерів.',
    'common.loadingServices': 'Не вдалося завантажити послуги.',
    'common.loadingGallery': 'Не вдалося завантажити галерею.',
    'common.loadingLocations': 'Не вдалося завантажити салони.',
    'common.loadingCertificates': 'Не вдалося завантажити сертифікати.',
    'common.lightboxGallery': 'Галерея',
    'certificateDetail.subtitle': 'Подаруйте турботу та відпочинок.',
    'service.creative.title': 'Креативний грумінг',
    'service.creative.subtitle': 'Гігієна, здоров’я та креативний дизайн',
    'service.creative.description': 'Ознайомтеся з індивідуальними послугами відповідно до потреб вашого собаки.',
    'service.teeth.title': 'Чищення зубів',
    'service.teeth.subtitle': 'Гігієна та догляд за зубами',
    'service.teeth.description': 'Делікатний догляд допомагає підтримувати здоров’я зубів і ясен вашого собаки.',
    'service.spa.title': 'Спа та озонова терапія',
    'service.spa.subtitle': 'Глибоке очищення та оздоровча ванна',
    'service.spa.description': 'Заспокійливий сеанс озонової терапії очищує та заспокоює чутливу шкіру.',
    'certificate.spa.title': 'Подарунковий сертифікат на озонове спа',
    'certificate.spa.description': 'Подаруйте собаці відновлювальний сеанс озонового спа. Очищувальний догляд насичує шкіру киснем і глибоко розслабляє, що особливо корисно для чутливої шкіри.',
    'certificate.credit.title': 'Подарунковий сертифікат на 50 євро',
    'certificate.credit.description': 'Сертифікат на 50 €, який можна використати для грумінгу чи спа-послуг. Подаруйте індивідуальний догляд у наших салонах у Кань-сюр-Мер і Ніцці.',
  },
  ru: {
    'language.label': 'Язык',
    'social.follow': 'Следите за нами в',
    'navbar.services': 'Услуги',
    'navbar.gallery': 'Галерея',
    'navbar.bookVisit': 'Записаться',
    'navbar.lightMode': 'Включить светлую тему',
    'navbar.darkMode': 'Включить тёмную тему',
    'navbar.paradise': 'PARADIS DES ANIMAUX',
    'hero.badge': 'Personal Stylist for Dogs',
    'hero.description': 'Профессиональный груминг, специализированная чистка зубов и расслабляющая озоновая спа-терапия для вашего питомца в Cagnes-sur-Mer.',
    'hero.book': 'Записаться на визит',
    'certificates.title': 'Подарочные сертификаты',
    'certificates.subtitle': 'Подарите заботу и отдых.',
    'certificates.viewAll': 'Посмотреть все сертификаты',
    'certificates.slides': 'Слайды подарочных сертификатов',
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексный уход за вашими любимыми собаками',
    'services.before': 'До',
    'services.after': 'После',
    'gallery.title': 'Галерея салона',
    'gallery.subtitle': 'Моменты заботы, груминга и красоты',
    'locations.title': 'Наши салоны',
    'locations.subtitle': 'Выберите удобный для вас салон',
    'locations.team': 'Команда:',
    'locations.view': 'Посмотреть салон',
    'footer.copyright': 'Ambiance Canine и Paradise des Animaux. Все права защищены.',
    'common.back': 'Назад',
    'common.address': 'Адрес',
    'common.viewMaps': 'Открыть в Google Maps',
    'common.contact': 'Контакты',
    'common.knownFor': 'Известен благодаря',
    'common.groomers': 'Доступные грумеры',
    'common.worksAt': 'Работает в',
    'common.location_one': 'салоне',
    'common.location_many': 'салонах',
    'common.noGroomers': 'К этому салону пока не прикреплены грумеры.',
    'common.loadingServices': 'Не удалось загрузить услуги.',
    'common.loadingGallery': 'Не удалось загрузить галерею.',
    'common.loadingLocations': 'Не удалось загрузить салоны.',
    'common.loadingCertificates': 'Не удалось загрузить сертификаты.',
    'common.lightboxGallery': 'Галерея',
    'certificateDetail.subtitle': 'Подарите заботу и отдых.',
    'service.creative.title': 'Креативный груминг',
    'service.creative.subtitle': 'Гигиена, здоровье и креативный дизайн',
    'service.creative.description': 'Ознакомьтесь с индивидуальными услугами с учётом потребностей вашей собаки.',
    'service.teeth.title': 'Чистка зубов',
    'service.teeth.subtitle': 'Гигиена и уход за зубами',
    'service.teeth.description': 'Бережный уход помогает сохранить здоровье зубов и дёсен вашей собаки.',
    'service.spa.title': 'Спа и озоновая терапия',
    'service.spa.subtitle': 'Глубокое очищение и оздоровительная ванна',
    'service.spa.description': 'Успокаивающий сеанс озонотерапии очищает и успокаивает чувствительную кожу.',
    'certificate.spa.title': 'Подарочный сертификат на озоновое спа',
    'certificate.spa.description': 'Подарите собаке восстанавливающий сеанс озонового спа. Очищающий уход насыщает кожу кислородом и дарит глубокое расслабление, особенно полезное для чувствительной кожи.',
    'certificate.credit.title': 'Подарочный сертификат на 50 евро',
    'certificate.credit.description': 'Сертификат на 50 €, который можно использовать для груминга или спа-процедур. Подарите индивидуальный уход в наших салонах в Кань-сюр-Мер и Ницце.',
  },
} as const;

type TranslationKey = keyof typeof translations.fr;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'fr' || savedLanguage === 'uk' || savedLanguage === 'ru' || savedLanguage === 'en') {
      startTransition(() => setLanguageState(savedLanguage));
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem('language', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey) => translations[language][key], [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function translateCertificateText(
  key: string,
  field: 'title' | 'description',
  fallback: string,
  language: Language,
): string {
  const certificateKey = key.startsWith('spa-ozon')
    ? 'spa'
    : key.startsWith('gift-50')
      ? 'credit'
      : null;
  if (!certificateKey) return fallback;
  const translationKey = `certificate.${certificateKey}.${field}` as TranslationKey;
  return translations[language][translationKey] || fallback;
}

export function translateServiceText(
  key: string,
  field: 'title' | 'subtitle' | 'description',
  fallback: string,
  language: Language,
): string {
  const serviceKey = key === 'creative-design'
    ? 'creative'
    : key === 'teeth-brushing'
      ? 'teeth'
      : key === 'ozone-spa'
        ? 'spa'
        : null;
  if (!serviceKey) return fallback;
  const translationKey = `service.${serviceKey}.${field}` as TranslationKey;
  return translations[language][translationKey] || fallback;
}
