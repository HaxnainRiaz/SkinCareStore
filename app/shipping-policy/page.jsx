import { Container } from '@/components/ui/Container';

export const metadata = {
    title: 'Shipping Policy - Luxe Botanica',
};

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-neutral-cream">
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">Shipping Policy</h1>
                </Container>
            </div>

            <Container className="py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Shipping Methods & Costs</h2>
                    <p className="text-neutral-gray mb-6">
                        We offer several shipping options to meet your needs:
                    </p>
                    <ul className="list-disc list-inside text-neutral-gray mb-8 space-y-2">
                        <li><strong>Standard Shipping (5-7 business days):</strong> $10 - FREE on orders over $75</li>
                        <li><strong>Express Shipping (2-3 business days):</strong> $20</li>
                        <li><strong>Overnight Shipping (1 business day):</strong> $35</li>
                    </ul>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Processing Time</h2>
                    <p className="text-neutral-gray mb-8">
                        Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">International Shipping</h2>
                    <p className="text-neutral-gray mb-8">
                        We currently ship to the United States and Canada. International shipping rates and delivery times vary by location.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Order Tracking</h2>
                    <p className="text-neutral-gray mb-8">
                        Once your order ships, you'll receive a confirmation email with tracking information. You can track your package using the provided tracking number.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Delivery Issues</h2>
                    <p className="text-neutral-gray">
                        If your order hasn't arrived within the estimated delivery time, please contact us at support@luxebotanica.com and we'll help resolve the issue.
                    </p>
                </div>
            </Container>
        </div>
    );
}
