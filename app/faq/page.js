const faqs = [
  {
    q: 'How do I buy a car on BuyWheels?',
    a: 'Browse listings, filter by country and category, view details, and start your purchase by signing in. Our team will guide you through payment and paperwork.'
  },
  {
    q: 'Can I finance my purchase?',
    a: 'Yes. Financing depends on lender approval. We provide documentation to support your application; terms and rates are set by lending partners.'
  },
  {
    q: 'Are the vehicles inspected?',
    a: 'Listings are vetted and include history transparency when available. Always review inspection reports and ask for additional details before finalizing.'
  },
  {
    q: 'What fees should I expect?',
    a: 'Taxes, title, registration, and potential documentation fees may apply. We aim for clear pricing with no hidden add-ons.'
  },
  {
    q: 'Do you allow test drives?',
    a: 'Availability varies by seller. Request a viewing or test drive through the listing contact options or support channel.'
  },
  {
    q: 'How do I contact support?',
    a: 'Use the contact page, email info@buywheels.com, or call +1 (555) 123-4567. We respond as quickly as possible.'
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      <header className="text-center space-y-3">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Help</p>
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quick answers about buying cars on BuyWheels.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{item.q}</h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

