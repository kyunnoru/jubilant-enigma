// src/pages/profile.tsx

import { useState } from 'react';
import AppNavbar from '../components/landing/Navbar';

const ProfileSettings = () => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(' ')[0] || '',
    lastName: session?.user?.name?.split(' ')[1] || '',
    email: session?.user?.email || '',
    phone: '',
    bio: '',
    location: '',
    university: '',
    major: '',
    graduationYear: '',
    linkedin: '',
    github: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // Add success notification here
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and personal information.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {session?.user?.name ? getInitials(session.user.name) : 'U'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {session?.user?.name || 'User Name'}
                </h3>
                <p className="text-gray-500 mb-4">{session?.user?.email}</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50 text-gray-900'
                    } transition-colors duration-200`}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-gray-200 bg-gray-50 text-gray-900'
                  } transition-colors duration-200 resize-none`}
                />
              </div>

              {/* Academic Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Major/Field of Study
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isEditing 
                          ? 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'border-gray-200 bg-gray-50 text-gray-900'
                      } transition-colors duration-200`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="2025"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isEditing 
                          ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'border-gray-200 bg-gray-50 text-gray-900'
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isEditing 
                          ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'border-gray-200 bg-gray-50 text-gray-900'
                      } transition-colors duration-200`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="https://github.com/yourusername"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isEditing 
                          ? 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'border-gray-200 bg-gray-50 text-gray-900'
                      } transition-colors duration-200`}
                    />
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

export default ProfileSettings;