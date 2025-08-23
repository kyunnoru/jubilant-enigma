// src/components/landing/Features.tsx

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Why <span className="text-shimmer">Neurvia</span>?
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
            Experience the future of career guidance with our revolutionary AI platform
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              AI-Powered Intelligence
            </h3>
            <p className="text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Advanced machine learning algorithms analyze your unique profile to deliver personalized career insights with unprecedented accuracy.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Research-Backed
            </h3>
            <p className="text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Built on extensive research from leading universities and validated by career development experts worldwide.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Personalized Journey
            </h3>
            <p className="text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Receive detailed reports and actionable recommendations tailored specifically to your aspirations and potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
