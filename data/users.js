// data/users.js - Updated for Vercel Blob
import { put, del, list } from '@vercel/blob';

// Helper: Generate unique ID
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Save user to Blob
export async function saveUser(userData) {
  try {
    const userId = generateId();
    const filename = `users/${userId}.json`;
    
    const blob = await put(filename, JSON.stringify({
      ...userData,
      id: userId,
      createdAt: new Date().toISOString(),
      status: 'active'
    }), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json'
    });
    
    console.log('User saved to Blob:', blob.url);
    return { ...userData, id: userId, blobUrl: blob.url };
  } catch (error) {
    console.error('Error saving user to Blob:', error);
    throw new Error('Failed to save user');
  }
}

// Get all users from Blob
export async function getUsers() {
  try {
    const { blobs } = await list({ prefix: 'users/' });
    
    if (!blobs || blobs.length === 0) {
      return { users: [], logins: [] };
    }
    
    const users = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const response = await fetch(blob.url);
          if (!response.ok) throw new Error('Failed to fetch user');
          return await response.json();
        } catch (error) {
          console.error('Error fetching user from blob:', blob.url, error);
          return null;
        }
      })
    );
    
    // Filter out null responses
    const validUsers = users.filter(user => user !== null);
    const logins = users.filter(login => login !== null);
    
    return { 
      users: validUsers, 
      logins: logins,
    };
  } catch (error) {
    console.error('Error fetching users from Blob:', error);
    return { users: [], logins: [] };
  }
}

// Save login attempt
export async function saveLogin(loginData) {
  try {
    const loginId = generateId();
    const filename = `logins/${loginId}.json`;
    
    await put(filename, JSON.stringify({
      ...loginData,
      id: loginId,
      timestamp: new Date().toISOString()
    }), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json'
    });
    
    return { ...loginData, id: loginId };
  } catch (error) {
    console.error('Error saving login to Blob:', error);
    throw new Error('Failed to save login');
  }
}

// Find user by email
export async function findUserByEmail(email) {
  try {
    const { users } = await getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}