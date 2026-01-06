import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users.json if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify({ users: [], logins: [] }, null, 2));
}

export function getUsers() {
  try {
    const fileContents = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [], logins: [] };
  }
}

export function saveUser(userData) {
  try {
    const data = getUsers();
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    data.users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
    return newUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export function saveLogin(loginData) {
  try {
    const data = getUsers();
    const loginRecord = {
      ...loginData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    data.logins.push(loginRecord);
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
    return loginRecord;
  } catch (error) {
    console.error('Error saving login:', error);
    throw error;
  }
}

export function findUserByEmail(email) {
  const data = getUsers();
  return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

