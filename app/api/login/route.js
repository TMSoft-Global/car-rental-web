import { NextResponse } from 'next/server';
import { saveLogin } from '@/lib/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Save login attempt
    const loginData = {
      email,
      password, // In production, verify against hashed password!
      rememberMe: rememberMe || false,
      type: 'login'
    };

    const login = saveLogin(loginData);

    return NextResponse.json(
      { success: true, loginId: login.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    );
  }
}

