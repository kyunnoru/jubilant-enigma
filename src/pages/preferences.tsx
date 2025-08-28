// src/pages/preferences.tsx

import { useState } from 'react';
import AppNavbar from '../components/landing/Navbar';

const Preferences = () => {
  const { data: session } = {
    data: {
      user: {
        id: 'demo-user-id',
        email: 'demo@example.com',
        name: 'Demo User',
        isPremium: false
      }
    }
  };
  const [preferences, setPreferences] = useState({
    // Notification Preferences
    emailNotifications: true,
    careerUpdates: true,
    assessmentReminders: false,
    weeklyReports: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    shareProgress: false,
    allowDataAnalytics: true,
    
    // Career Guidance Settings
    preferredIndustries: ['Technology', 'Healthcare'],
    careerStage: 'student',
    experienceLevel: 'beginner',
    
    // Interface Preferences
    theme: 'light',
    language: 'english',
    dashboardLayout: 'grid'
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelect = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleIndustryChange = (industry: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredIndustries: prev.preferredIndustries.includes(industry)
        ? prev.preferredIndustries.filter(i => i !== industry)
        : [...prev.preferredIndustries, industry]
    }));
  };

  const savePreferences = () => {
    // Here you would save preferences to your backend
    console.log('Saving preferences:', preferences);
    // Add success notification here
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
    'Engineering', 'Design', 'Sales', 'Research', 'Consulting'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Preferences</h1>
          <p className="text-gray-600">Customize your Neurvia experience and notification settings.</p>
        </div>

        <div className="space-y-8">
          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                <p className="text-gray-600 text-sm">Choose what notifications you want to receive.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive general updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Career Updates</h3>
                  <p className="text-sm text-gray-500">Get notified about new career opportunities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.careerUpdates}
                    onChange={() => handleToggle('careerUpdates')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Assessment Reminders</h3>
                  <p className="text-sm text-gray-500">Reminders to complete pending assessments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.assessmentReminders}
                    onChange={() => handleToggle('assessmentReminders')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Weekly Reports</h3>
                  <p className="text-sm text-gray-500">Weekly progress and insights summary</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.weeklyReports}
                    onChange={() => handleToggle('weeklyReports')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
              <p className="text-gray-600 text-sm">Control your privacy and data sharing preferences.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={preferences.profileVisibility}
                  onChange={(e) => handleSelect('profileVisibility', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public - Visible to everyone</option>
                  <option value="private">Private - Only visible to you</option>
                  <option value="connections">Connections - Visible to your connections only</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Share Progress with Mentors</h3>
                  <p className="text-sm text-gray-500">Allow mentors to view your career progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.shareProgress}
                    onChange={() => handleToggle('shareProgress')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Allow Data Analytics</h3>
                  <p className="text-sm text-gray-500">Help improve Neurvia through usage analytics</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.allowDataAnalytics}
                    onChange={() => handleToggle('allowDataAnalytics')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Career Guidance Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Career Guidance Preferences</h2>
              <p className="text-gray-600 text-sm">Customize your career guidance experience.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Industries
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => (
                    <label key={industry} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.preferredIndustries.includes(industry)}
                        onChange={() => handleIndustryChange(industry)}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Stage
                  </label>
                  <select
                    value={preferences.careerStage}
                    onChange={(e) => handleSelect('careerStage', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="student">Student</option>
                    <option value="recent-graduate">Recent Graduate</option>
                    <option value="early-career">Early Career (1-3 years)</option>
                    <option value="mid-career">Mid Career (4-10 years)</option>
                    <option value="senior-career">Senior Career (10+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={preferences.experienceLevel}
                    onChange={(e) => handleSelect('experienceLevel', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Interface Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Interface Preferences</h2>
              <p className="text-gray-600 text-sm">Customize how Neurvia looks and feels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) => handleSelect('theme', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handleSelect('language', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="indonesia">Bahasa Indonesia</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dashboard Layout
                </label>
                <select
                  value={preferences.dashboardLayout}
                  onChange={(e) => handleSelect('dashboardLayout', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="grid">Grid View</option>
                  <option value="list">List View</option>
                  <option value="compact">Compact View</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Management</h2>
              <p className="text-gray-600 text-sm">Manage your account settings and data.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Download My Data</h3>
                  <p className="text-sm text-gray-500">Export all your account data</p>
                </div>
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Reset to Default
            </button>
            <button 
              onClick={savePreferences}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save All Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;