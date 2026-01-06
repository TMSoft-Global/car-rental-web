'use client';

import { useState } from 'react';
import CarCard from '@/components/CarCard';
import { cars } from './data/cars';

export default function Home() {
  const [activeTab, setActiveTab] = useState('All Cars');
  const [countryFilter, setCountryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filterCars = (tab, country, search) => {
    const normalizedSearch = search.trim().toLowerCase();

    const baseFiltered = cars.filter((car) => {
      const countryMatch = country === 'All' ? true : car.country === country;
      return countryMatch;
    });

    const typeFiltered = baseFiltered.filter((car) => {
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

    if (!normalizedSearch) {
      return typeFiltered;
    }

    return typeFiltered.filter((car) => {
      const haystack = [
        car.name,
        car.type,
        car.fuelType,
        car.transmission,
        car.features?.join(' ') || ''
      ].join(' ').toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  };

  const filteredCars = filterCars(activeTab, countryFilter, searchTerm);

  const tabs = ['All Cars', 'Economy', 'Luxury', 'SUV', 'Electric', 'Sports'];
  const countryTabs = [
    { label: 'All Countries', value: 'All', flag: '🌐' },
    { label: 'USA', value: 'USA', flag: '🇺🇸' },
    { label: 'UK', value: 'UK', flag: '🇬🇧' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Next Car
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Shop a curated selection of new and used vehicles with transparent pricing
          </p>
          <div className="max-w-md mx-auto bg-white rounded-lg p-2 flex">
            <input
              type="text"
              placeholder="Search cars by brand, model, or feature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-3 text-gray-900 rounded-l-lg focus:outline-none"
            />
            <button 
              type="button"
              onClick={() => setSearchTerm(searchTerm.trim())}
              className="btn-secondary px-6 rounded-r-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#13264C] text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {countryTabs.map((c) => (
            <button
              key={c.value}
              onClick={() => setCountryFilter(c.value)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                countryFilter === c.value
                  ? 'bg-[#13264C] text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy with BuyWheels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">From daily drivers to luxury models, all in one place</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Clear Pricing</h3>
              <p className="text-gray-600">Upfront totals, financing-friendly, no hidden fees</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Quality</h3>
              <p className="text-gray-600">Inspected vehicles with history transparency</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}