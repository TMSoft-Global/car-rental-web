import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BuyWheels</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted partner for premium car buying
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                BuyWheels was founded with a simple mission: to make buying a car accessible, 
                transparent, and hassle-free for everyone. Since our inception, we've been 
                committed to providing exceptional service and a wide selection of vehicles 
                to meet every need and budget.
              </p>
              <p>
                What started as a small local business has grown into a trusted name in car sales. 
                We've built our reputation on transparency, reliability, and putting our customers first. 
                Every vehicle we list is carefully vetted and inspected to ensure quality and peace of mind.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide exceptional car-buying experiences by offering a diverse catalog of 
              vetted vehicles, clear pricing, and outstanding customer service. 
              We believe everyone deserves access to a reliable car purchase journey, 
              whether it's your first car, an upgrade, or a dream ride.
            </p>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-gray-600">
                  We ensure every vehicle is in perfect condition and ready for your journey.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  No hidden fees, no surprises. What you see is what you get.
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We're here to help 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose BuyWheels?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                  <p className="text-gray-600">
                    From economy cars to luxury vehicles, we have something for everyone. 
                    Browse our extensive fleet and find the perfect ride for your needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                  <p className="text-gray-600">
                    We offer competitive rates with no hidden fees. Our transparent pricing 
                    ensures you know exactly what you're paying for.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
                  <p className="text-gray-600">
                    All our vehicles come with comprehensive insurance coverage, giving you 
                    peace of mind on every journey.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Our customer support team is available around the clock to assist you 
                    with any questions or concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6">
              Browse our selection of premium vehicles and find your perfect ride today.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Browse Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

