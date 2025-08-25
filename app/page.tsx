import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReviewsSlider from '@/components/ReviewsSlider';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/TrustBadges';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import WhyChooseUs from '@/components/WhyChooseUs';
import TransparentPricing from '@/components/TransparentPricing';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ReviewsSlider />
      <TrustBadges />
      <TransparentPricing />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <ContactForm />
    </main>
  );
}