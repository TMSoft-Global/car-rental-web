// app/api/cars/[id]/route.js
import { NextResponse } from 'next/server';
import { getCarById, updateCar, deleteCar } from '@/data/cars-blob';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const car = await getCarById(id);
    
    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch car', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updatedData = await request.json();
    
    const updatedCar = await updateCar(id, updatedData);
    return NextResponse.json(updatedCar);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const result = await deleteCar(id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car', details: error.message },
      { status: 500 }
    );
  }
}