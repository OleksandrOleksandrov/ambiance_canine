export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  imageFolder: 'design' | 'teeth_brush' | 'spa';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  image_folder?: string;
  place_id?: string;
  groomer_id?: string;
}

export interface StatusState {
  type: 'success' | 'error';
  msg: string;
}

export interface GalleryImage {
  id: number;
  name: string;
  alt: string;
  url: string;
}

export interface Place {
  id: string;
  title: string;
  place: string;
  phone_number: string[];
  photos: string[];
  groomers: Groomer[];
  address: string;
  addressLink: string;
}

export interface Groomer {
  id: string;
  name: string;
  placesIds: string[];
  photo: string;
}

export interface PlacesData {
  places: Place[];
  groomers: Groomer[];
}
