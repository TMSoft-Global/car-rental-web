// app/api/cars/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const carsFilePath = path.join(process.cwd(), 'data', 'cars.json');

// Helper function to read cars data
function readCarsData() {
  try {
    const fileContents = fs.readFileSync(carsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to write cars data
function writeCarsData(data) {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(carsFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing cars data:', error);
    return false;
  }
}

// GET - Get all cars
export async function GET(request) {
  try {
    const cars = readCarsData();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read cars data' },
      { status: 500 }
    );
  }
}

// POST - Create new car
export async function POST(request) {
  try {
    const carData = await request.json();
    const cars = readCarsData();
    
    // Generate new ID (highest ID + 1)
    const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    
    const newCar = {
      id: newId,
      ...carData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    cars.push(newCar);
    
    if (writeCarsData(cars)) {
      return NextResponse.json(newCar, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save car' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create car', details: error.message },
      { status: 500 }
    );
  }
}