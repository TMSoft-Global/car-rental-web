import { cars } from '@/data/cars';
import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id.toString(),
  }));
}

export default async function CarDetailPage({ params }) {
  const { id } = await params;
  const car = cars.find(c => c.id.toString() === id);
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Car Not Found</h1>
        <Link href="/" className="btn-primary inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Cars
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Car Image */}
        <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{car.type}</p>
          
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold text-blue-600">${car.price}<span className="text-lg text-gray-500">/day</span></div>
            <div className="ml-6 flex items-center">
              <span className="text-yellow-500 text-2xl">★</span>
              <span className="ml-2 text-xl font-medium">{car.rating}</span>
              <span className="ml-1 text-gray-500">(120 reviews)</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Seats</span>
                <span className="font-medium">{car.seats} people</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Fuel Type</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Transmission</span>
                <span className="font-medium">{car.transmission}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Luggage</span>
                <span className="font-medium">{car.luggage} bags</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <div className="flex flex-wrap gap-3">
              {car.features.map((feature, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
          </div>

          {/* Action Buttons */}
          <ActionButtons />

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl">
            <h4 className="font-semibold mb-2">✅ Included in price:</h4>
            <ul className="text-gray-700 space-y-1">
              <li>• Comprehensive insurance</li>
              <li>• 24/7 roadside assistance</li>
              <li>• Unlimited mileage</li>
              <li>• Free cancellation up to 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}