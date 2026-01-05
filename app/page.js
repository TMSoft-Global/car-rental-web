'use client';

import { useState } from 'react';
import CarCard from '@/components/CarCard';
import { cars } from './data/cars';

export default function Home() {
  const [activeTab, setActiveTab] = useState('All Cars');

  const filterCars = (tab) => {
    if (tab === 'All Cars') {
      return cars;
    }
    
    return cars.filter((car) => {
      const type = car.type.toLowerCase();
      const fuelType = car.fuelType.toLowerCase();
      
      switch (tab) {
        case 'Economy':
          return (type.includes('compact') || type.includes('hatchback') || 
                  (type.includes('sedan') && !type.includes('luxury'))) && 
                 !type.includes('luxury');
        case 'Luxury':
          return type.includes('luxury');
        case 'SUV':
          return type.includes('suv');
        case 'Electric':
          return fuelType === 'electric' || type.includes('electric');
        case 'Sports':
          return type.includes('sports');
        default:
          return true;
      }
    });
  };

  const filteredCars = filterCars(activeTab);

  const tabs = ['All Cars', 'Economy', 'Luxury', 'SUV', 'Electric', 'Sports'];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose from a wide range of premium vehicles at unbeatable prices
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg p-2 flex">
            <input
              type="text"
              placeholder="Search cars by brand, type, or feature..."
              className="flex-grow px-4 py-3 text-gray-900 rounded-l-lg focus:outline-none"
            />
            <button className="btn-secondary px-6 rounded-r-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Cars Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Available Cars {activeTab !== 'All Cars' && `(${filteredCars.length})`}
        </h2>
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cars found in this category.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentWheels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from economy to luxury vehicles</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates with no hidden fees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">Comprehensive insurance included</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}