import { Container } from '@/components/ui/Container';

export const metadata = {
    title: 'Refund Policy - Luminelle Organics',
};

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-neutral-cream">
            <div className="bg-primary text-white py-16">
                <Container>
                    <h1 className="text-4xl text-white md:text-5xl font-heading font-bold">Refund Policy</h1>
                </Container>
            </div>

            <Container className="py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">30-Day Money-Back Guarantee</h2>
                    <p className="text-neutral-gray mb-8">
                        We stand behind the quality of our products. If you're not completely satisfied with your purchase, you may return it within 30 days of delivery for a full refund.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Return Conditions</h2>
                    <p className="text-neutral-gray mb-4">To be eligible for a return:</p>
                    <ul className="list-disc list-inside text-neutral-gray mb-8 space-y-2">
                        <li>Products must be returned within 30 days of delivery</li>
                        <li>Items must be in original packaging</li>
                        <li>Products should be at least 50% full</li>
                        <li>Proof of purchase is required</li>
                    </ul>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">How to Return</h2>
                    <p className="text-neutral-gray mb-4">To initiate a return:</p>
                    <ol className="list-decimal list-inside text-neutral-gray mb-8 space-y-2">
                        <li>Contact our customer service team at returns@luxebotanica.com</li>
                        <li>Provide your order number and reason for return</li>
                        <li>We'll send you a prepaid return label</li>
                        <li>Pack items securely and ship them back</li>
                    </ol>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Refund Processing</h2>
                    <p className="text-neutral-gray mb-8">
                        Once we receive your return, we'll inspect the items and process your refund within 5-7 business days. Refunds will be issued to the original payment method.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Exchanges</h2>
                    <p className="text-neutral-gray mb-8">
                        We currently don't offer direct exchanges. If you'd like a different product, please return your original item for a refund and place a new order.
                    </p>

                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">Questions?</h2>
                    <p className="text-neutral-gray">
                        If you have any questions about our refund policy, please contact us at support@luxebotanica.com
                    </p>
                </div>
            </Container>
        </div>
    );
}
