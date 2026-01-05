export default function PendingPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Please Wait
        </h2>
        
        <p className="text-gray-600 mb-6">
          We're reviewing your information. You'll be notified once your account has been approved.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>What happens next?</strong>
          </p>
          <ul className="text-sm text-gray-600 mt-2 text-left space-y-1">
            <li>• We'll verify your information</li>
            <li>• You'll receive an email confirmation</li>
            <li>• Your account will be activated shortly</li>
          </ul>
        </div>
        
        <p className="text-sm text-gray-500">
          This usually takes just a few minutes. Thank you for your patience!
        </p>
      </div>
    </div>
  );
}

