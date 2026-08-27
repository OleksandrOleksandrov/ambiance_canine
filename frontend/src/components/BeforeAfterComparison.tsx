'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  fadeDuration?: number;
  style?: React.CSSProperties;
}

export default function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  autoPlay = false,
  autoPlayInterval = 6000,
  fadeDuration = 1500,
  style,
}: BeforeAfterComparisonProps): React.JSX.Element {
  const [opacity, setOpacity] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const updateOpacity = useCallback((now: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = now;
    }

    const elapsed = now - startTimeRef.current;
    const cycleProgress = (elapsed % autoPlayInterval) / autoPlayInterval;
    const fadeFraction = fadeDuration / autoPlayInterval;

    let opacityValue: number;
    if (cycleProgress < fadeFraction) {
      const progress = cycleProgress / fadeFraction;
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      opacityValue = eased;
    } else if (cycleProgress < 0.5) {
      opacityValue = 1;
    } else if (cycleProgress < 0.5 + fadeFraction) {
      const progress = (cycleProgress - 0.5) / fadeFraction;
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      opacityValue = 1 - eased;
    } else {
      opacityValue = 0;
    }

    setOpacity(opacityValue);
    animationRef.current = requestAnimationFrame(updateOpacity);
  }, [autoPlayInterval, fadeDuration]);

  useEffect(() => {
    if (!autoPlay) return;

    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(updateOpacity);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoPlay, updateOpacity]);

  return (
    <div
      className={`relative select-none overflow-hidden rounded-xl shadow-lg ${className}`}
      style={style}
    >
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity }}
        draggable={false}
      />
      <div className="absolute top-4 left-4 z-20 bg-white/90 text-neutral-900 text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 bg-white/90 text-neutral-900 text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
        {afterLabel}
      </div>
    </div>
  );
}
