// app/cars/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ActionButtons from './ActionButtons';

export default function CarDetailPage({ params }) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Unwrap the params promise
    const unwrapParams = async () => {
      try {
        const unwrappedParams = await params;
        setId(unwrappedParams.id);
      } catch (err) {
        console.error('Error unwrapping params:', err);
        setError('Failed to load page parameters');
        setLoading(false);
      }
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return; // Don't fetch until we have the ID

      try {
        setLoading(true);
        const response = await fetch('/api/cars');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const cars = await response.json();
        const foundCar = cars.find(c => c.id.toString() === id);
        
        if (foundCar) {
          setCar(foundCar);
        } else {
          throw new Error('Car not found');
        }
      } catch (err) {
        console.error('Error fetching car:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]); // Fetch when id changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl">Loading car details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {error === 'Car not found' ? 'Car Not Found' : 'Error Loading Car'}
        </h1>
        <p className="text-gray-600 mb-6">
          {error === 'Car not found' 
            ? "The car you're looking for doesn't exist or is no longer available."
            : `Error: ${error}`
          }
        </p>
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
        {/* Car Image - Using next/image for optimization */}
        <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            fill="true"
            className="object-cover"
            priority="true"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{car.type}</p>
          
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold text-blue-600">${car.price.toLocaleString()}</div>
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
            <h4 className="font-semibold mb-2">✅ What you get:</h4>
            <ul className="text-gray-700 space-y-1">
              <li>• Vehicle history transparency</li>
              <li>• Pre-purchase inspection checks</li>
              <li>• Financing-friendly documentation</li>
              <li>• Dedicated buyer support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}