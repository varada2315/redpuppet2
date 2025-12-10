import React, { useState } from 'react';
import { Camera, Edit3, MapPin, Calendar, Award, Upload, Video, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: user?.name || 'Alex Rodriguez',
    role: user?.role || 'Director',
    location: 'Mumbai, India',
    joinDate: 'March 2024',
    bio: 'Passionate filmmaker with 5+ years of experience in directing music videos and short films. Currently working on my first feature film project.',
    skills: ['Direction', 'Cinematography', 'Editing', 'Storytelling', 'Color Grading'],
    awards: [
      'Best Short Film - Mumbai Film Festival 2023',
      'Audience Choice - Indie Film Awards 2022'
    ]
  };

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>
              <button className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors">
                <Upload className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                  <p className="text-red-600 text-lg font-semibold">{profileData.role}</p>
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors mt-4 md:mt-0"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
              
              <p className="text-gray-300">{profileData.bio}</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-bold text-white">Awards & Recognition</h2>
          </div>
          <div className="space-y-2">
            {profileData.awards.map((award, index) => (
              <div key={index} className="text-gray-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                {award}
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Portfolio</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'portfolio' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                All Work
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'videos' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'images' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                Images
              </button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Upload Card */}
            <div className="aspect-video bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center hover:border-red-600 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">Upload New Work</span>
            </div>

            {/* Sample Portfolio Items */}
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Video className="h-8 w-8 text-gray-400" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-semibold">Short Film - "Monsoon"</h3>
                <p className="text-gray-400 text-xs">Drama • 2023</p>
              </div>
            </div>

            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <ImageIcon className="h-8 w-8 text-gray-400" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-semibold">Behind the Scenes</h3>
                <p className="text-gray-400 text-xs">Photography • 2023</p>
              </div>
            </div>

            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Video className="h-8 w-8 text-gray-400" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-semibold">Music Video - "Rising"</h3>
                <p className="text-gray-400 text-xs">Music • 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;