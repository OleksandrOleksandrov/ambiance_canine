export interface Certificate {
  id: string;
  src: string;
  alt: string;
  description: string;
}

export const certificates: Certificate[] = [
  {
    id: 'spa-ozon-fr',
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon_rf.jpg',
    alt: 'Bon cadeau spa à l’ozone',
    description:
      'Offrez à votre chien une séance de spa à l’ozone revitalisante. Ce soin oxygénant et purifiant nourrit le poil et procure une détente profonde — idéal pour les peaux sensibles et les pattes fatiguées.',
  },
  {
    id: 'gift-50-fr',
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift_fr.jpg',
    alt: 'Bon cadeau de 50 euros',
    description:
      'Un crédit de 50 € valable pour tout service de toilettage ou de spa. Offrez un moment de soin personnalisé, disponible dans nos salons de Cagnes-sur-Mer et de Nice.',
  },
  {
    id: 'spa-ozon',
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon.jpg',
    alt: 'Подарочный сертификат на озоновый спа',
    description:
      'Нежная озоновая спа-процедура насыщает кожу кислородом, очищает и увлажняет шерсть вашего питомца — прекрасный способ подарить ему заслуженный отдых после насыщенного дня.',
  },
  {
    id: 'gift-50',
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift.jpg',
    alt: 'Подарочный сертификат на 50 евро',
    description:
      'Универсальный подарочный сертификат на 50 €, который можно использовать для груминга, чистки зубов или фирменных спа-процедур — выбор за вами, удовольствие получит ваша собака.',
  },
];
