import { Container } from '@/components/ui/Container';

export default function Benefits() {
    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: 'Vegan & Cruelty-Free',
            description: 'Never tested on animals, always kind to all beings',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: 'Sustainable Packaging',
            description: 'Recyclable materials and eco-conscious design',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Science-Backed',
            description: 'Clinically tested formulas with proven results',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />
                </svg>
            ),
            title: 'Ethically Sourced',
            description: 'Fair trade ingredients from trusted suppliers',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
            ),
            title: 'Luxury Experience',
            description: 'Premium textures and elegant packaging',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Clean Beauty',
            description: 'Free from parabens, sulfates, and harmful chemicals',
        },
    ];

    return (
        <section className="py-3 md:py-6 lg:py-8 bg-[#0a4019] text-white overflow-hidden relative">
            {/* Ambient Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#d3d3d3] rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
            </div>

            <Container className="relative z-10">
                <div className="space-y-3 md:space-y-6 lg:space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-white [font-size:clamp(1.875rem,1.5rem+2vw,3.5rem)] leading-tight">
                            The Luminelle Difference
                        </h2>
                        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                            More than skincare—a commitment to your skin, our planet, and ethical beauty.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-6 lg:gap-x-8 gap-y-3 md:gap-y-6 lg:gap-y-8">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="flex flex-col items-center text-center group space-y-6">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#0a4019] transition-all duration-500 shadow-xl border border-white/10 group-hover:border-white">
                                    {benefit.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-heading font-semibold text-white tracking-wide">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed font-light text-sm md:text-base">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>

    );
}
