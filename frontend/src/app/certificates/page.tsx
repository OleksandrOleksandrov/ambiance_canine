import type { Metadata } from 'next';
import CertificatesDetailView from './CertificatesDetailView';

export const metadata: Metadata = {
  title: 'Cartes cadeaux | L\'Éden des Animaux',
  description:
    'Découvrez nos cartes cadeaux pour le spa à l’ozone et le toilettage, valables dans nos salons de Cagnes-sur-Mer et de Nice.',
};

export default function CertificatesPage() {
  return <CertificatesDetailView />;
}
