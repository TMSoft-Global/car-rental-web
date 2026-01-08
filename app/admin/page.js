// app/admin/page.js
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/admin/cars" 
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">Manage Cars</h3>
            <p className="text-gray-600">Add, edit, or delete cars in your inventory</p>
          </Link>
          
          <Link 
            href="/admin/users" 
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
            <p className="text-gray-600">View and manage user accounts</p>
          </Link>
          
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">View sales and traffic statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
}