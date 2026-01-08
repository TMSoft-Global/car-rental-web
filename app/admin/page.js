// app/admin/page.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminPage() {
    const [backupLoading, setBackupLoading] = useState(false);

    const handleBackup = async () => {
        try {
            setBackupLoading(true);
            const response = await fetch('/api/backup');
            
            if (!response.ok) throw new Error(`Backup failed: ${response.status}`);
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            alert('Backup downloaded successfully!');
        } catch (error) {
            alert(`Backup failed: ${error.message}`);
        } finally {
            setBackupLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        href="/admin/cars"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow group"
                    >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚗</div>
                        <h3 className="text-xl font-semibold mb-2">Manage Cars</h3>
                        <p className="text-gray-600">Add, edit, or delete cars in your inventory</p>
                        <div className="mt-4 text-blue-600 font-medium">Go to Cars →</div>
                    </Link>

                    <Link
                        href="/admin/users"
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow group"
                    >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">👥</div>
                        <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
                        <p className="text-gray-600">View and manage user accounts</p>
                        <div className="mt-4 text-blue-600 font-medium">Go to Users →</div>
                    </Link>

                    <div 
                        onClick={handleBackup}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer group"
                    >
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                            {backupLoading ? '⏳' : '💾'}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {backupLoading ? 'Creating Backup...' : 'Download Backup'}
                        </h3>
                        <p className="text-gray-600">
                            Download all data as a ZIP file backup
                        </p>
                        <div className="mt-4">
                            {backupLoading ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-600"></div>
                                    Processing backup...
                                </div>
                            ) : (
                                <span className="text-green-600 font-medium">Click to download →</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}