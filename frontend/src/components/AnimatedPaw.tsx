import React from 'react';

export function AnimatedPaw() {
  return (
    <span className="inline-flex items-center justify-center">
      <span className="text-2xl" style={{ animation: 'wiggle 1s linear infinite' }}>
        🐾
      </span>
    </span>
  );
}

// Add this keyframes style to your global CSS or styled-components
/*
@keyframes wiggle {
  0%, 100% { transform: rotate(-5deg) translateY(0px); }
  50% { transform: rotate(5deg) translateY(-5px); }
}
*/