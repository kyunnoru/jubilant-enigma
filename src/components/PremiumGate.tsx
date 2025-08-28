// src/components/PremiumGate.tsx - Supabase Version
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  email: string;
  name?: string;
  isPremium: boolean;
}

interface PremiumGateProps {
  children: React.ReactNode;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await fetchUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserSession = async () => {
    try {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.log('Session error:', error.message);
        // If JWT expired, try to refresh
        if (error.message.includes('jwt expired') || error.message.includes('JWT expired')) {
          await handleExpiredSession();
          return;
        }
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (!session) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Fetch user profile including premium status
      await fetchUserProfile(session.user.id);

    } catch (error) {
      console.error('Error checking user session:', error);
      // Handle any JWT errors
      if (error instanceof Error && error.message.includes('jwt')) {
        await handleExpiredSession();
        return;
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpiredSession = async () => {
    try {
      // Try to refresh the session
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error || !session) {
        console.log('Session refresh failed, redirecting to login');
        setUser(null);
        setIsLoading(false);
        return;
      }

      console.log('Session refreshed successfully');
      // Fetch user profile with refreshed session
      await fetchUserProfile(session.user.id);

    } catch (error) {
      console.error('Error refreshing session:', error);
      setUser(null);
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user data from Supabase auth
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.log('Auth error:', authError.message);
        // If JWT expired, try to refresh and retry
        if (authError.message.includes('jwt expired') || authError.message.includes('JWT expired')) {
          await handleExpiredSession();
          return;
        }
        setUser(null);
        return;
      }

      if (!authUser) {
        setUser(null);
        return;
      }

      // Get additional profile data (including isPremium)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.log('Profile fetch error:', profileError.message);
        // If profile doesn't exist, create a default user object
        setUser({
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || null,
          isPremium: false // Default to false if no profile
        });
        return;
      }

      setUser({
        id: authUser.id,
        email: authUser.email!,
        name: profile.name || authUser.user_metadata?.name || null,
        isPremium: profile.is_premium || false
      });

    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      // Handle JWT errors in catch block too
      if (error?.message?.includes('jwt')) {
        await handleExpiredSession();
        return;
      }
      setUser(null);
    }
  };

  // Show loading state while session is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/signin');
    return null;
  }

  // Check if user has premium access
  const isPremium = user.isPremium || false;

  // If user has premium access, show the content
  if (isPremium) {
    return <>{children}</>;
  }

  // Show premium paywall for non-premium users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Premium Feature</h1>
              <p className="text-indigo-100">
                Halo {user.name || user.email}! Upgrade ke Premium untuk mengakses fitur panduan karier
              </p>
            </div>

            <div className="p-8">
              {/* Feature Overview */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Yang Anda Dapatkan dengan Premium
                </h2>
                <p className="text-gray-600 text-lg">
                  Dapatkan akses ke alat panduan karier profesional senilai jutaan rupiah
                </p>
              </div>

              {/* Premium Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h6v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 01-1-1V8a1 1 0 10-2 0v4a1 1 0 01-1 1H6a1 1 0 100 2h2a1 1 0 001-1v-1h2v1a1 1 0 001 1h2a1 1 0 100-2h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Asesmen Kepribadian Komprehensif</h3>
                  <p className="text-gray-700 text-sm">Analisis mendalam tentang tipe kepribadian, minat, keterampilan, dan nilai-nilai Anda</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Rekomendasi Karier Personal</h3>
                  <p className="text-gray-700 text-sm">Daftar karier spesifik yang cocok dengan profil kepribadian dan keahlian Anda</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Rencana Pengembangan Karier</h3>
                  <p className="text-gray-700 text-sm">Panduan langkah demi langkah untuk mencapai karier impian Anda</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Analisis Kekuatan & Kelemahan</h3>
                  <p className="text-gray-700 text-sm">Identifikasi area yang perlu diperkuat dan potensi yang dapat dikembangkan</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200 mb-8">
                <div className="text-center">
                  <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    🔥 Limited Time Offer
                  </div>
                  <div className="mb-4">
                    <span className="text-gray-500 line-through text-xl">Rp 299.000</span>
                    <span className="text-4xl font-bold text-indigo-600 ml-3">Rp 199.000</span>
                    <span className="text-gray-600">/bulan</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Hemat Rp 100.000! Akses unlimited ke semua fitur premium
                  </p>
                  
                  {/* Benefits */}
                  <div className="text-left space-y-3 mb-6">
                    {[
                      'Asesmen karier komprehensif',
                      'Rekomendasi karier personal',
                      'Analisis kepribadian mendalam',
                      'Rencana pengembangan skill',
                      'Akses ke semua template CV premium',
                      'Konsultasi karier 1-on-1 (30 menit/bulan)',
                      'Update konten dan fitur terbaru'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => router.push('/pricing')}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Upgrade ke Premium
                </button>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full sm:w-auto px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Kembali ke Dashboard
                </button>
              </div>

              {/* Guarantee */}
              <div className="text-center mt-8">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Garansi uang kembali 30 hari</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-4">Dipercaya oleh 10,000+ profesional Indonesia</p>
                  <div className="flex justify-center items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-2">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumGate;