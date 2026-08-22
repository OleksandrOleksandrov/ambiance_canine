import React from 'react';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-8 border-t border-neutral-800 text-center text-sm">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Ambiance Canine &amp; Paradise des Animaux. All rights reserved.</p>
        <p className="text-xs text-neutral-500 mt-1">16 Avenue de Verdun, Cagnes-sur-Mer, France</p>
      </div>
    </footer>
  );
}
