// app/api/backup/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    // Check if data directory exists
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json(
        { error: 'Data directory not found' },
        { status: 404 }
      );
    }
    
    // Create a zip file in memory
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    // Collect all JSON files
    const files = fs.readdirSync(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      return NextResponse.json(
        { error: 'No JSON files found in data directory' },
        { status: 404 }
      );
    }
    
    // Add each JSON file to the archive
    jsonFiles.forEach(file => {
      const filePath = path.join(dataDir, file);
      archive.file(filePath, { name: file });
    });
    
    // Set response headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', `attachment; filename="backup-${Date.now()}.zip"`);
    
    // Create a readable stream for the response
    const responseStream = new ReadableStream({
      start(controller) {
        archive.on('data', (chunk) => {
          controller.enqueue(chunk);
        });
        
        archive.on('end', () => {
          controller.close();
        });
        
        archive.on('error', (err) => {
          controller.error(err);
        });
        
        archive.finalize();
      }
    });
    
    return new Response(responseStream, { headers });
    
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup', details: error.message },
      { status: 500 }
    );
  }
}