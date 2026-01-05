'use client';

import { useRouter } from 'next/navigation';

export default function ActionButtons() {
  const router = useRouter();

  const handleRentNow = () => {
    router.push('/login');
  };

  const handleSaveForLater = () => {
    router.push('/login');
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={handleRentNow}
        className="flex-grow btn-primary py-4 text-lg"
      >
        Rent Now
      </button>
      <button 
        onClick={handleSaveForLater}
        className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-lg font-medium"
      >
        Save for Later
      </button>
    </div>
  );
}

