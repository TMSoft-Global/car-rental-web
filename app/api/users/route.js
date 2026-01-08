import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(usersFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read users data' },
      { status: 500 }
    );
  }
}