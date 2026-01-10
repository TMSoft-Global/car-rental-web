// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { getUsers, saveLogin, findUserByEmail } from '@/data/users';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Simple validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }
    
    const user = await findUserByEmail(email);
    
    // For demo, accept any password if user exists
    const success = !!user;
    
    // Save login attempt
    await saveLogin({
      email,
      success,
      userAgent: request.headers.get('user-agent'),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
    });
    
    if (success) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}