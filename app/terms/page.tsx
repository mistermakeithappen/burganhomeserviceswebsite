import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Terms of Service | Burgan Home Services',
  description: 'Terms of Service for Burgan Home Services - Our terms and conditions for using our services.',
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> January 1, 2024
            </p>
            <p className="text-gray-700 mb-6">
              These Terms of Service ("Terms") govern your use of Burgan Home Services' website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Services</h2>
            <p className="text-gray-700 mb-4">
              Burgan Home Services provides home improvement, repair, and maintenance services including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>General handyman services</li>
              <li>Interior and exterior painting</li>
              <li>Kitchen and bathroom remodeling</li>
              <li>Home repairs and maintenance</li>
              <li>Emergency repair services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. Service Agreements</h2>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Estimates and Quotes</h3>
            <p className="text-gray-700 mb-4">
              All estimates and quotes are valid for 30 days from the date of issue unless otherwise specified. Final pricing may vary based on actual work required and any changes to the scope of work.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-slate-800">Work Authorization</h3>
            <p className="text-gray-700 mb-4">
              Work will commence only after receiving written or verbal authorization from the customer. Any changes to the agreed scope of work must be approved before implementation and may result in additional charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Payment is due upon completion of work unless otherwise agreed</li>
              <li>We accept cash, check, and major credit cards</li>
              <li>For projects exceeding $1,000, a deposit of up to 50% may be required</li>
              <li>Late payments may incur a service charge of 1.5% per month</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Warranties and Guarantees</h2>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Workmanship Warranty</h3>
            <p className="text-gray-700 mb-4">
              We provide a one-year warranty on all labor and workmanship from the date of completion. This warranty covers defects in workmanship but does not cover normal wear and tear or damage caused by misuse.
            </p>

            <h3 className="text-xl font-semibold mb-2 text-slate-800">Material Warranties</h3>
            <p className="text-gray-700 mb-4">
              Materials are covered by their respective manufacturer warranties. We will assist in warranty claims but are not responsible for manufacturer defects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Liability and Insurance</h2>
            <p className="text-gray-700 mb-4">
              Burgan Home Services is fully insured with general liability coverage up to $2 million. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Pre-existing conditions or defects</li>
              <li>Damage caused by acts of nature or circumstances beyond our control</li>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Damage resulting from customer's failure to maintain completed work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Customer Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              Customers agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Provide safe and reasonable access to work areas</li>
              <li>Remove or protect valuable items from work areas</li>
              <li>Ensure pets are secured during service visits</li>
              <li>Disclose any known hazards or issues related to the work area</li>
              <li>Make timely payments as agreed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Service appointments may be cancelled or rescheduled with at least 24 hours notice. Cancellations with less than 24 hours notice may be subject to a service fee. Deposits are non-refundable for cancellations made after work has begun or materials have been ordered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">8. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms or our services will first be addressed through good faith negotiation. If resolution cannot be reached, disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">9. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on our website, including text, graphics, logos, and images, is the property of Burgan Home Services and is protected by copyright laws. You may not use, reproduce, or distribute our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">10. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the State of Washington. Any legal action must be brought in the courts of Spokane County, Washington.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-900">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-700">
                <strong>Burgan Home Services</strong><br />
                PO BOX 71<br />
                Greenacres, WA 99016<br />
                Email: infoburganhomeservices@gmail.com<br />
                Phone: (509) 955-2545
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}