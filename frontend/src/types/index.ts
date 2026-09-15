export interface Place {
  id: string;
  slug?: string;
  title: string;
  place: string;
  phone_number: string[];
  photos: string[];
  groomers: Groomer[];
  address: string | null;
  addressLink: string | null;
  placesCalled?: string | null;
}

export interface Groomer {
  id: string;
  slug?: string;
  name: string;
  placesIds: string[];
  photo: string | null;
  specialty?: string | null;
}

export interface PlacesData {
  places: Place[];
  groomers: Groomer[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: string | null;
  image?: string | null;
  imageFolder?: string | null;
}

export interface ServiceMedia {
  url: string;
  mediaType: "image" | "video";
  role: "primary" | "before" | "after";
  alt?: string | null;
}

export interface ServiceCategory extends Service {
  slug: string;
  media: ServiceMedia[];
  afterImage?: string | null;
  mediaType?: "image" | "video";
}

export interface GalleryImage {
  id: number;
  name: string;
  alt: string;
  url: string;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface Certificate {
  id: string;
  src: string;
  alt: string;
  description: string;
  locale: string;
}

export interface CertificatesData {
  certificates: Certificate[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  date?: string;
  image_folder?: string;
  place_id?: number;
  groomer_id?: number;
}
