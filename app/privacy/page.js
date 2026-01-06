export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      <header className="text-center space-y-3">
        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Privacy</p>
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          How we collect, use, and protect your information at BuyWheels.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">1. Data We Collect</h2>
        <p className="text-gray-700 leading-relaxed">
          We collect the information you provide (like name, email, phone), usage data from your interactions
          with the platform, and cookies to improve your experience.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Data</h2>
        <p className="text-gray-700 leading-relaxed">
          We use your data to process inquiries, improve our services, personalize content, and communicate
          important updates about your account or transactions.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">3. Sharing Information</h2>
        <p className="text-gray-700 leading-relaxed">
          We may share data with trusted partners (like payment or financing providers) to complete transactions.
          We do not sell your personal data.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">4. Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We use reasonable administrative, technical, and physical safeguards to protect your data. No system is
          100% secure; please use strong passwords and keep them confidential.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">5. Your Choices</h2>
        <p className="text-gray-700 leading-relaxed">
          You can request access, updates, or deletion of your data where applicable. You can also opt out of
          marketing communications at any time.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">6. Changes to this Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this policy periodically. We will post changes here and update the effective date as needed.
        </p>
      </section>
    </div>
  );
}

