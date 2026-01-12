import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
// import ShopByConcern from '@/components/home/ShopByConcern';
// import Ingredients from '@/components/home/Ingredients';
import Benefits from '@/components/home/Benefits';
import Bestsellers from '@/components/home/Bestsellers';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import BrandStory from '@/components/home/BrandStory';
import LatestBlogs from '@/components/home/LatestBlogs';

export const metadata = {
    title: 'Luminelle - Heal. Glow. Naturally',
    description: 'Proven organic skincare for radiant, healthy skin. Crafted with Kalonji, Neem, and Kojic Acid.',
};

export default function HomePage() {
    return (
        <>
            <main>
                <Hero />
                <FeaturedProducts />
                {/* <ShopByConcern /> */}
                {/* <Ingredients /> */}
                <Bestsellers />
                <Benefits />
                <LatestBlogs />
                <BrandStory />
                {/* <Testimonials /> */}
                <Newsletter />
            </main>

        </>
    );
}
