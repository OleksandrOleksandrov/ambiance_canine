import type { Metadata } from 'next';
import CertificatesDetailView from './CertificatesDetailView';

export const metadata: Metadata = {
  title: 'Gift Certificates | L\'Éden des Animaux',
  description:
    'Browse all gift certificates from Ambiance Canine — ozone spa sessions and 50€ credits, valid at our Cagnes-sur-Mer and Nice salons.',
};

export default function CertificatesPage() {
  return <CertificatesDetailView />;
}
