import type { Place, Groomer, PlacesData } from '../types/index';

export const places: Place[] = [
  {
    id: '1',
    title: 'Cagnes-sur-Mer',
    place: 'Cagnes-sur-Mer',
    phone_number: ['+33 4 93 20 71 94'],
    photos: [
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_1.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_2.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_3.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_4.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_5.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_6.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_7.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_8.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_9.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_10.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_11.jpg',
      'https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_12.jpg',
    ],
    groomers: [{ id: '1', name: 'Oleksandr', placesIds: ['1'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer-1.jpg' }, { id: '2', name: 'Natasha', placesIds: ['1'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer-1.jpg' }],
    address: '64 Bd Maréchal Juin, 06800 Cages-sur-Mer',
    addressLink: 'https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer',
  },
  {
    id: '2',
    title: 'Nice',
    place: 'Nice',
    phone_number: ['+33 9 81 98 37 34', '+33 7 68 22 46 54'],
    photos: [
      'https://ambiance-dev.s3.us-east-1.amazonaws.com/saloon/image_place_nice_1.jpg',
      'https://ambiance-dev.s3.us-east-1.amazonaws.com/saloon/image_place_nice_2.jpg',
    ],
    groomers: [{ id: '1', name: 'Oleksandr', placesIds: ['1'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer-1.jpg' }, { id: '2', name: 'Natasha', placesIds: ['1'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer-1.jpg' }],
    address: '5 Rue Vernier, 06000 Nice',
    addressLink: 'https://www.google.com/maps/search/?api=1&query=5+Rue+Vernier,+06000+Nice',
  },
];

// Groomers
export const groomers: Groomer[] = [
  { id: '1', name: 'Oleksandr', placesIds: ['1', '2'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer/image_groomer_oleksandr_1.jpeg' },
  { id: '2', name: 'Natasha', placesIds: ['1', '2'], photo: 'https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer/image_groomer_natasha_1.jpg' },
];

export const placesData: PlacesData = {
  places,
  groomers
};
