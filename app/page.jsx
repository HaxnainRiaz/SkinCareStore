import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
// import ShopByConcern from '@/components/home/ShopByConcern';
import Ingredients from '@/components/home/Ingredients';
import Benefits from '@/components/home/Benefits';
import Bestsellers from '@/components/home/Bestsellers';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import BrandStory from '@/components/home/BrandStory';

export const metadata = {
    title: 'Luminelle Organics - Premium Luxury Skincare',
    description: 'Discover our collection of premium, botanical-infused skincare products. Luxury formulations for radiant, healthy skin.',
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            {/* <ShopByConcern /> */}
            {/* <Ingredients /> */}
            <Bestsellers />
            <Benefits />
            <Testimonials />
            <BrandStory />
            <Newsletter />
        </>
    );
}
