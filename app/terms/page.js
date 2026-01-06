export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      <header className="text-center space-y-3">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Legal</p>
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review these terms carefully before using BuyWheels.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">1. Using BuyWheels</h2>
        <p className="text-gray-700 leading-relaxed">
          BuyWheels is a marketplace to browse and purchase vehicles. By using the site, you agree to provide
          accurate information and to use the platform only for lawful transactions.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">2. Vehicle Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We work to provide accurate listings, specs, and pricing. Vehicle availability and pricing can change
          without notice. Always verify details before completing a purchase.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">3. Payments & Financing</h2>
        <p className="text-gray-700 leading-relaxed">
          Payment terms may vary by seller or lender. Any financing offers are subject to credit approval and
          lender terms. Taxes, fees, and registration costs may apply.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">4. Cancellations & Returns</h2>
        <p className="text-gray-700 leading-relaxed">
          Cancellation and return policies depend on the seller and local regulations. Review the specific terms
          before committing to a purchase. Once a sale is finalized, returns may be limited or unavailable.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">5. Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          BuyWheels is provided “as is.” We are not liable for indirect, incidental, or consequential damages
          arising from use of the platform. Your sole remedy is to stop using the service.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">6. Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update these terms periodically. Continued use after updates constitutes acceptance of the revised terms.
        </p>
      </section>
    </div>
  );
}

