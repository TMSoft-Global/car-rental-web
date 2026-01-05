import { NextResponse } from 'next/server';
import { saveUser } from '@/lib/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password, confirmPassword } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Save user data
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password, // In production, hash this password!
      type: 'signup'
    };

    const user = saveUser(userData);

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}

