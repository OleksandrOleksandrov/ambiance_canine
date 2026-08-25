import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PlaceSelect from '../components/PlaceSelect';
import Gallery from '../components/Gallery';
import ContactBooking from '../components/ContactBooking';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <PlaceSelect />
      <Gallery />
      <ContactBooking />
      <Footer />
    </main>
  );
}
