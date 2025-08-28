import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface PaymentFormData {
  fullName: string
  email: string
  phone: string
  paymentMethod: 'bank_transfer' | 'ewallet' | 'credit_card'
  bankName?: string
  bankAccount?: string
  ewalletType?: string
  ewalletAccount?: string
}

export default function PaymentForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    paymentMethod: 'bank_transfer'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (formData.paymentMethod === 'bank_transfer') {
      if (!formData.bankName) {
        newErrors.bankName = 'Please select a bank'
      }
      if (!formData.bankAccount?.trim()) {
        newErrors.bankAccount = 'Bank account number is required'
      }
    }

    if (formData.paymentMethod === 'ewallet') {
      if (!formData.ewalletType) {
        newErrors.ewalletType = 'Please select an e-wallet'
      }
      if (!formData.ewalletAccount?.trim()) {
        newErrors.ewalletAccount = 'E-wallet account number is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Payment form submitted:', formData)
      
      router.push('/payment/success')
      
    } catch (error) {
      console.error('Payment submission error:', error)
      alert('Payment submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to access the payment form.</p>
          <Link href="/api/auth/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Premium Subscription Payment</h1>
          <p className="mt-2 text-gray-600">Complete your upgrade to Premium</p>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Premium Subscription (Monthly)</span>
            <span className="text-gray-600">Rp 200.000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-600">Rp 0</span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">Rp 200.000</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                {/* Bank Transfer */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-900">Bank Transfer</span>
                </label>

                {formData.paymentMethod === 'bank_transfer' && (
                  <div className="ml-8 space-y-3">
                    <select
                      value={formData.bankName || ''}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                        errors.bankName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Bank</option>
                      <option value="bca">BCA</option>
                      <option value="mandiri">Mandiri</option>
                      <option value="bni">BNI</option>
                      <option value="bri">BRI</option>
                      <option value="cimb">CIMB Niaga</option>
                    </select>
                    {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}

                    <input
                      type="text"
                      placeholder="Enter Bank Account Number"
                      value={formData.bankAccount || ''}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                        errors.bankAccount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.bankAccount && <p className="mt-1 text-sm text-red-600">{errors.bankAccount}</p>}
                  </div>
                )}

                {/* E-Wallet */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ewallet"
                    checked={formData.paymentMethod === 'ewallet'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-900">E-Wallet</span>
                </label>

                {formData.paymentMethod === 'ewallet' && (
                  <div className="ml-8 space-y-3">
                    <select
                      value={formData.ewalletType || ''}
                      onChange={(e) => handleInputChange('ewalletType', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                        errors.ewalletType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select E-Wallet</option>
                      <option value="gopay">GoPay</option>
                      <option value="ovo">OVO</option>
                      <option value="dana">DANA</option>
                      <option value="linkaja">LinkAja</option>
                    </select>
                    {errors.ewalletType && <p className="mt-1 text-sm text-red-600">{errors.ewalletType}</p>}

                    <input
                      type="text"
                      placeholder="Enter E-Wallet Account Number"
                      value={formData.ewalletAccount || ''}
                      onChange={(e) => handleInputChange('ewalletAccount', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white ${
                        errors.ewalletAccount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.ewalletAccount && <p className="mt-1 text-sm text-red-600">{errors.ewalletAccount}</p>}
                  </div>
                )}

                {/* Credit/Debit Card */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-900">Credit/Debit Card</span>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-900">
                  I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. 
                  By subscribing, I understand that my subscription will automatically renew monthly.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Link
                href="/premium"
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-blue-50 transition-colors text-center bg-white"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 font-medium rounded-lg transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Complete Payment'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  )
}
