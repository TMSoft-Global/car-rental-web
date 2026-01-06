import Link from 'next/link';

export default function CarCard({ car }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100">
      {/* Image Container with Fixed Height */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ maxHeight: '256px' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800';
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-lg font-bold">${car.price.toLocaleString()}</div>
          <div className="text-xs opacity-90">USD</div>
        </div>
        
        {/* Country Flag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {car.country === 'UK' ? '🇬🇧' : car.country === 'USA' ? '🇺🇸' : '🌍'}
            </span>
            <span className="font-medium text-gray-800">{car.country}</span>
          </div>
        </div>
        
        {/* Rating Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-white font-medium">{car.rating}</span>
            <span className="text-gray-300 ml-1 text-sm">/5</span>
          </div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-6">
        {/* Car Name and Type */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{car.name}</h3>
          <div className="flex items-center mt-2">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {car.type}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-600 text-sm">{car.transmission}</span>
          </div>
        </div>
        
        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-blue-600">👤</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Seats</div>
                <div className="font-medium">{car.seats}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-green-600">⚡</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Fuel</div>
                <div className="font-medium">{car.fuelType}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-amber-600">📦</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Luggage</div>
                <div className="font-medium">{car.luggage} bags</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-1">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-purple-600">🎵</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Audio</div>
                <div className="font-medium text-sm truncate">
                  {car.features.find(f => f.includes('Bluetooth') || f.includes('Audio') || f.includes('Radio'))?.split(' ')[0] || 'Standard'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features List (Compact) */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Features</h4>
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {feature.length > 15 ? feature.substring(0, 15) + '...' : feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* View Details Button */}
        <Link 
          href={`/cars/${car.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}