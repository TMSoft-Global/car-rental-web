import Link from 'next/link';
import Image from 'next/image';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image 
          src={car.image} 
          alt={car.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          ${car.price}/day
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-gray-600">{car.type} • {car.transmission}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Rating</div>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-medium">{car.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center text-gray-600">
            <span className="mr-2">👤</span>
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">⚡</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">📦</span>
            <span>{car.luggage} luggage</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="mr-2">🎵</span>
            <span>{car.features.includes('Bluetooth') ? 'Bluetooth' : 'Radio'}</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <Link 
            href={`/cars/${car.id}`}
            className="w-full btn-primary block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}