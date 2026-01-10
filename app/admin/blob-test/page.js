// app/admin/blob-test/page.js
'use client';

import { useState } from 'react';

export default function BlobTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const testBlobWrite = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'test123'
        })
      });
      
      const data = await response.json();
      setResult({ success: true, data });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const testBlobRead = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      setResult({ success: true, data });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Vercel Blob Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={testBlobWrite}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Blob Write'}
          </button>
          
          <button
            onClick={testBlobRead}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Blob Read'}
          </button>
        </div>
        
        {result && (
          <div className={`p-6 rounded-xl ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <h3 className="font-semibold mb-2">
              {result.success ? '✅ Success' : '❌ Error'}
            </h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
          <h3 className="font-semibold mb-2">How Vercel Blob Works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Data is stored in Vercel's blob storage (not local files)</li>
            <li>Each user/car is stored as a separate JSON file in the blob</li>
            <li>Works on serverless functions (unlike local file system)</li>
            <li>Free tier: 1 GB storage, 100,000 operations/month</li>
          </ol>
        </div>
      </div>
    </div>
  );
}