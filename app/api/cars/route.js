// app/api/cars/route.js
import { NextResponse } from 'next/server';
import { getCars, addCar } from '@/data/cars-blob';

export async function GET() {
  try {
    const cars = await getCars();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cars', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const carData = await request.json();
    const newCar = await addCar(carData);
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create car', details: error.message },
      { status: 500 }
    );
  }
}