// app/api/users/route.js - Updated for Blob
import { NextResponse } from 'next/server';
import { getUsers, saveUser, saveLogin } from '@/data/users';

export async function GET() {
  try {
    const data = await getUsers();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const newUser = await saveUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}