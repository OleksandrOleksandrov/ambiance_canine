'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Service } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import BeforeAfterComparison from './BeforeAfterComparison';

interface ServiceBlock {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  services: Service[];
  image: string;
  afterImage?: string;
}

export default function Services(): React.JSX.Element {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [designImageIndex, setDesignImageIndex] = useState(1);
  const mobileMediaHeight = '100svh';
  const mediaWrapperClassName = 'w-screen relative left-1/2 -translate-x-1/2 h-[var(--mobile-height)] md:static md:w-full md:translate-x-0 md:h-[512px] mt-4';

  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDesignImageIndex(prev => prev >= 5 ? 1 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getImageForCategory = (subtitle: string): string => {
    const folderMapping: Record<string, string> = {
      'Hygiene, Health & Creative Design': 'design',
      'Dental Hygiene & Care': 'teeth_brush',
      'Deep Cleanse & Healing Bath': 'spa',
    };
    const folder = folderMapping[subtitle] || 'design';

    const getImagePath = (folder: string, index: number): string => {
      if (folder === 'spa') {
        return 'https://ambiance-dev.s3.us-east-1.amazonaws.com/spa/video_spa_1.mov';
      }
      return `https://ambiance-dev.s3.us-east-1.amazonaws.com/${folder}/photo_${folder}_${index}.jpg`;
    };

    return getImagePath(folder, 1);
  };

  const groupedServices = useMemo(() => {
    const groups: Record<string, Service[]> = {};
    services.forEach(service => {
      if (!groups[service.subtitle]) {
        groups[service.subtitle] = [];
      }
      groups[service.subtitle] = [...groups[service.subtitle], service];
    });
    return groups;
  }, [services]);

  const serviceBlocks: ServiceBlock[] = useMemo(() => {
    const categories: { key: string; title: string; image: string; afterImage?: string }[] = [
      { key: 'Hygiene, Health & Creative Design', title: 'Holiday, Design & Creativity', image: `https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_${designImageIndex}.jpg` },
      { key: 'Dental Hygiene & Care', title: 'Teeth Brushing', image: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/teeth_brush/photo_teeth_brush_1.jpg', afterImage: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/teeth_brush/photo_teeth_brush_2.jpg' },
      { key: 'Deep Cleanse & Healing Bath', title: 'Spa & Ozon Therapy', image: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/spa/video_spa_1.mov' },
    ];

    return categories.map(category => ({
      title: category.title,
      subtitle: category.key,
      description: 'Explore our personalized services tailored to your dog\'s needs.',
      icon: '🎨',
      services: groupedServices[category.key] || [],
      image: category.image,
      afterImage: category.afterImage,
    }));
  }, [groupedServices, designImageIndex]);

  return (
    <section id="services" className={`py-8 ${theme === 'dark' ? 'bg-gradient-to-b from-[#1f2937] to-[#111827]' : 'bg-gradient-to-b from-white to-neutral-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className={`text-4xl font-serif font-bold ${theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900'}`}>Our Services</h2>
          <p className={`${theme === 'dark' ? 'text-[#9ca3af]' : 'text-neutral-500'} mt-3 text-lg`}>Comprehensive care for your beloved dogs</p>
        </div>

        {/* Horizontal Row with Text and Image */}
        <div className="flex flex-col md:flex-row gap-4">
          {serviceBlocks.map((block, blockIndex) => (
            <div key={block.title} className="w-full md:flex-1">
              <h3 className={`text-xl font-serif font-bold ${theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900'}`}>
                {block.title}
              </h3>
              <div
                className={mediaWrapperClassName}
                style={{ '--mobile-height': mobileMediaHeight } as React.CSSProperties}
              >
                {block.image.endsWith('.mov') ? (
                  <video
                    src={block.image}
                    className="w-full h-full object-cover md:rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : block.afterImage ? (
                  <BeforeAfterComparison
                    beforeImage={block.image}
                    afterImage={block.afterImage}
                    beforeLabel="Before"
                    afterLabel="After"
                    className="w-full h-full !rounded-none md:!rounded-xl"
                    autoPlay
                    autoPlayInterval={6000}
                    fadeDuration={1500}
                  />
                ) : (
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover md:rounded-xl"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `http://via.placeholder.com/320x540?text=${block.title.replace(/ /g, '+')}`;
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
