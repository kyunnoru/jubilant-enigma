import Link from 'next/link'

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            We couldn't process your payment. Don't worry, you haven't been charged.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Common Reasons:</h3>
          <ul className="text-sm text-red-700 text-left space-y-1">
            <li>• Insufficient funds</li>
            <li>• Card declined by bank</li>
            <li>• Incorrect payment details</li>
            <li>• Network connection issues</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link 
            href="/premium" 
            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Try Again
          </Link>
          
          <Link 
            href="/" 
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/support" 
            className="block w-full text-blue-600 hover:text-blue-800 underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}