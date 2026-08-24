'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Service } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ServiceBlock {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  services: Service[];
  image: string;
}

export default function Services(): React.JSX.Element {
  const { theme } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/services')
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  const getImageForCategory = (subtitle: string): string => {
    const folderMapping: Record<string, string> = {
      'Holiday, design and creativity': 'design',
      'Teeth brushing': 'teeth_brush',
      'Spa, ozon therapy': 'spa',
    };
    const folder = folderMapping[subtitle] || 'design';

    const getImagePath = (folder: string, index: number): string => {
      return `/${folder}/photo_${folder}_${index}.jpg`;
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
    const categories: { key: string; title: string; image: string }[] = [
      { key: 'Holiday, design and creativity', title: 'Holiday, Design & Creativity', image: '/design/photo_design_1.jpg' },
      { key: 'Teeth brushing', title: 'Teeth Brushing', image: '/teeth_brush/photo_teeth_brush_1.jpg' },
      { key: 'Spa, ozon therapy', title: 'Spa & Ozon Therapy', image: '/spa/photo_spa_1.jpg' },
    ];

    return categories.map(category => ({
      title: category.title,
      subtitle: category.key,
      description: 'Explore our personalized services tailored to your dog\'s needs.',
      icon: '🎨',
      services: groupedServices[category.key] || [],
      image: category.image,
    }));
  }, [groupedServices]);

  return (
    <section id="services" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-[#1f2937] to-[#111827]' : 'bg-gradient-to-b from-white to-neutral-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-serif font-bold ${theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900'}`}>Our Services</h2>
          <p className={`${theme === 'dark' ? 'text-[#9ca3af]' : 'text-neutral-500'} mt-3 text-lg`}>Comprehensive care for your beloved dogs</p>
        </div>

        {/* Horizontal Row with Text and Image */}
        <div className="flex flex-row gap-8 w-[3200px]">
          {serviceBlocks.map((block, blockIndex) => (
            <div key={block.title} className="p-8 flex-shrink-0">
              <h3 className={`text-xl font-serif font-bold ${
                theme === 'dark' 
                  ? blockIndex === 0 ? 'text-purple-300' : blockIndex === 1 ? 'text-teal-300' : 'text-pink-300'
                  : blockIndex === 0 ? 'text-purple-900' : blockIndex === 1 ? 'text-teal-900' : 'text-pink-900'
              }`}>
                {block.title}
              </h3>
              <img
                src={block.image}
                alt={block.title}
                className={`w-80 h-128 mt-4 object-cover rounded-xl border ${theme === 'dark' ? 'border-[#374151]' : 'border-neutral-200'} ${
                  blockIndex === 0 ? 'rounded-t-lg rounded-b-none' : ''
                } ${blockIndex === 2 ? 'rounded-t-none rounded-b-lg' : ''}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `http://via.placeholder.com/320x540?text=${block.title.replace(/ /g, '+')}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
