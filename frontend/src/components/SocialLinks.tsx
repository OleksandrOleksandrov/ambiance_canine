'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FacebookIcon, InstagramIcon, EmailIcon } from './icons/SocialIcons';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function SocialLinks(): React.JSX.Element {
  const { theme } = useTheme();

  const iconClass = 'w-7 h-7';

  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1FtLPVTP3L/?mibextid=wwXIfr',
      icon: <FacebookIcon className={iconClass} />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/toilettage.des.animaux',
      icon: <InstagramIcon className={iconClass} />,
    },
    {
      name: 'Email',
      href: 'mailto:grooming.fr.nat@gmail.com',
      icon: <EmailIcon className={iconClass} />,
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={`Follow us on ${link.name}`}
          className={`transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-[#9ca3af] hover:text-[#fbbf24]'
              : 'text-neutral-400 hover:text-amber-600'
          }`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
