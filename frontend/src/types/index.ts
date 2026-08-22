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
