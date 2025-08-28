import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PaymentSuccess() {
  const router = useRouter()

  useEffect(() => {
    // You can add logic here to update user's premium status in your database
    // For now, we'll just log the successful payment
    console.log('Payment successful!')
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for upgrading to Premium. Your payment has been processed successfully.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
          <ul className="text-sm text-green-700 text-left space-y-1">
            <li>• All premium features are now unlocked</li>
            <li>• You'll receive a confirmation email shortly</li>
            <li>• Your subscription will auto-renew monthly</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            Continue to Dashboard
          </Link>
          
          <Link 
            href="/account" 
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
          >
            View Account Settings
          </Link>
        </div>
      </div>
    </div>
  )
}