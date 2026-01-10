// data/cars-blob.js - PURE BLOB VERSION
import { put, del, list } from '@vercel/blob';

let carsCache = null;
let lastCacheUpdate = 1;

const CACHE_VERSION = 1;

// Get all cars from Blob
export async function getCars() {
  const now = Date.now();
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Disable cache in development
  if (process.env.NODE_ENV === 'development') {
    carsCache = null;
  }


  if (carsCache && carsCache._version === CACHE_VERSION && (now - lastCacheUpdate) < CACHE_TTL) {
    return carsCache.data;
  }

  try {
    const { blobs } = await list({ prefix: 'cars/' });

    if (!blobs || blobs.length === 0) {
      // No cars in Blob yet - return empty array
      carsCache = [];
    } else {
      // Fetch all cars from Blob
      carsCache = await Promise.all(
        blobs.map(async (blob) => {
          try {
            const response = await fetch(blob.url);
            return await response.json();
          } catch (error) {
            console.error(`Error fetching car ${blob.pathname}:`, error);
            return null;
          }
        })
      );

      // Filter out any failed fetches
      carsCache = carsCache.filter(car => car !== null);
    }

    lastCacheUpdate = now;
    return carsCache;

  } catch (error) {
    console.error('Error fetching cars from Blob:', error);
    // No fallback - return empty array
    return [];
  }
}

// Add new car
export async function addCar(carData) {
  try {
    // Get current cars to determine next ID
    const cars = await getCars();
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;

    const newCar = {
      ...carData,
      id: parseInt(newId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Blob
    const filename = `cars/${newId}.json`;
    await put(filename, JSON.stringify(newCar, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true
    });

    // Invalidate cache
    carsCache = null;

    return newCar;
  } catch (error) {
    console.error('Error adding car to Blob:', error);
    throw new Error('Failed to add car: ' + error.message);
  }
}

// Get single car by ID
export async function getCarById(id) {
  try {
    const cars = await getCars();
    return cars.find(c => c.id.toString() === id.toString()) || null;
  } catch (error) {
    console.error('Error getting car by ID:', error);
    return null;
  }
}

// Update existing car
export async function updateCar(id, carData) {
  try {
    // Get existing car
    const existingCar = await getCarById(id);

    if (!existingCar) {
      throw new Error('Car not found');
    }

    const updatedCar = {
      ...existingCar,
      ...carData,
      id: parseInt(id), // Ensure ID is number
      updatedAt: new Date().toISOString(),
      allowOverwrite: true
    };

    // Save to Blob
    const filename = `cars/${id}.json`;
    await put(filename, JSON.stringify(updatedCar, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true
    });

    // Invalidate cache
    carsCache = null;

    return updatedCar;
  } catch (error) {
    console.error('Error updating car in Blob:', error);
    throw new Error('Failed to update car: ' + error.message);
  }
}

// Delete car
export async function deleteCar(id) {
  try {
    // First check if car exists
    const existingCar = await getCarById(id);

    if (!existingCar) {
      throw new Error('Car not found');
    }

    // Delete from Blob
    const filename = `cars/${id}.json`;
    await del(filename);

    // Invalidate cache
    carsCache = null;

    return {
      success: true,
      message: 'Car deleted successfully',
      car: existingCar
    };
  } catch (error) {
    console.error('Error deleting car from Blob:', error);
    throw new Error('Failed to delete car: ' + error.message);
  }
}

// Optional: Seed initial cars (call this once manually if needed)
export async function seedInitialCars(initialCars) {
  try {
    for (const car of initialCars) {
      const filename = `cars/${car.id}.json`;
      await put(filename, JSON.stringify(car, null, 2), {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json'
      });
    }
    console.log(`Seeded ${initialCars.length} cars to Blob`);

    // Invalidate cache
    carsCache = null;

    return { success: true, count: initialCars.length };
  } catch (error) {
    console.error('Error seeding cars:', error);
    throw new Error('Failed to seed cars: ' + error.message);
  }
}