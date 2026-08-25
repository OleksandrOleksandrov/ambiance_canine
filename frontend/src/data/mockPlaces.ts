import type { Place, Groomer, PlacesData } from '../types/index';

export const places: Place[] = [
  {
    id: '1',
    title: 'Cagnes-sur-Mer',
    place: 'Cagnes-sur-Mer',
    phone_number: ['+33 4 93 00 00 00'],
    photos: [
      '/saloon/image_place_nice_1.jpg',
      '/saloon/image_place_nice_2.jpg',
    ],
    groomers: [{ id: '1', name: 'Luda', placesIds: ['1'], photo: '/groomer-1.jpg' }, { id: '2', name: 'Natasha', placesIds: ['1'], photo: '/groomer-1.jpg' }],
    address: '64 Bd Maréchal Juin, 06800 Cages-sur-Mer',
    addressLink: 'https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer',
  },
  {
    id: '2',
    title: 'Nice',
    place: 'Nice',
    phone_number: ['+33 9 81 98 37 34', '+33 7 68 22 46 54'],
    photos: [
      '/saloon/image_place_nice_1.jpg',
      '/saloon/image_place_nice_2.jpg',
    ],
    groomers: [{ id: '1', name: 'Luda', placesIds: ['1'], photo: '/groomer-1.jpg' }, { id: '2', name: 'Natasha', placesIds: ['1'], photo: '/groomer-1.jpg' }],
    address: '5 Rue Vernier, 06000 Nice',
    addressLink: 'https://www.google.com/maps/search/?api=1&query=5+Rue+Vernier,+06000+Nice',
  },
];

// Groomers
export const groomers: Groomer[] = [
  { id: '1', name: 'Luda', placesIds: ['1', '2'], photo: '/groomer/image_groomer_luda_1.png' },
  { id: '2', name: 'Natasha', placesIds: ['1', '2'], photo: '/groomer/image_groomer_natasha_1.jpg' },
];

export const placesData: PlacesData = {
  places,
  groomers
};
