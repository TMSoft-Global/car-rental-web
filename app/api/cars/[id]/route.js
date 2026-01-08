// app/api/cars/[id]/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const carsFilePath = path.join(process.cwd(), 'data', 'cars.json');

// Helper functions (same as above)
function readCarsData() {
  try {
    const fileContents = fs.readFileSync(carsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

function writeCarsData(data) {
  try {
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

// GET - Get single car by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const cars = readCarsData();
    const car = cars.find(c => c.id.toString() === id);
    
    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    );
  }
}

// PUT - Update car by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updatedData = await request.json();
    const cars = readCarsData();
    
    const carIndex = cars.findIndex(c => c.id.toString() === id);
    
    if (carIndex === -1) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    // Preserve original createdAt, add updatedAt
    const updatedCar = {
      ...cars[carIndex],
      ...updatedData,
      id: parseInt(id), // Ensure ID remains a number
      updatedAt: new Date().toISOString()
    };
    
    cars[carIndex] = updatedCar;
    
    if (writeCarsData(cars)) {
      return NextResponse.json(updatedCar);
    } else {
      return NextResponse.json(
        { error: 'Failed to update car' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete car by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const cars = readCarsData();
    
    const carIndex = cars.findIndex(c => c.id.toString() === id);
    
    if (carIndex === -1) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    // Remove the car
    const deletedCar = cars[carIndex];
    cars.splice(carIndex, 1);
    
    if (writeCarsData(cars)) {
      return NextResponse.json({ 
        message: 'Car deleted successfully',
        car: deletedCar 
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete car' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car', details: error.message },
      { status: 500 }
    );
  }
}