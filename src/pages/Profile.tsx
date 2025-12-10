import React, { useState, useEffect } from 'react';
import { Camera, CreditCard as Edit3, MapPin, Calendar, Award, Upload, Video, Image as ImageIcon, Save, X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editData, setEditData] = useState({
    name: '',
    bio: '',
    location: '',
    skills: [] as string[],
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setIsLoading(true);
    setError('');

    const result = await updateProfile(editData);
    
    if (result.success) {
      setIsEditing(false);
    } else {
      setError(result.error || 'Failed to update profile');
    }
    
    setIsLoading(false);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !editData.skills.includes(skill)) {
      setEditData({
        ...editData,
        skills: [...editData.skills, skill]
      });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const availableSkills = [
    'Direction', 'Cinematography', 'Editing', 'Storytelling', 'Color Grading',
    'Sound Design', 'Music Composition', 'Acting', 'Producing', 'Writing',
    'Visual Effects', 'Animation', 'Photography', 'Lighting', 'Production Design'
  ];

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
          {error && (
            <div className="bg-red-600 bg-opacity-20 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <Camera className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors">
                <Upload className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="text-3xl font-bold text-white bg-black border border-gray-700 rounded px-3 py-1 mb-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                  )}
                  <p className="text-red-600 text-lg font-semibold">{profile.role}</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({...editData, location: e.target.value})}
                      placeholder="Add location"
                      className="bg-black border border-gray-700 rounded px-2 py-1 text-white text-sm"
                    />
                  ) : (
                    <span>{profile.location || 'Add location'}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                  className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-gray-300 resize-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300">{profile.bio || 'No bio added yet.'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Skills & Expertise</h2>
          
          {isEditing && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {availableSkills.filter(skill => !editData.skills.includes(skill)).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillAdd(skill)}
                    className="bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {editData.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => handleSkillRemove(skill)}
                    className="hover:bg-red-700 rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            ))}
            {editData.skills.length === 0 && (
              <span className="text-gray-400">No skills added yet.</span>
            )}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Portfolio</h2>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Upload Card */}
            <div className="aspect-video bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center hover:border-red-600 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">Upload New Work</span>
            </div>

            {/* Placeholder Portfolio Items */}
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Video className="h-8 w-8 text-gray-400" />
              <div className="absolute bottom-2 left-2 right-2">
                <h3 className="text-white text-sm font-semibold">Coming Soon</h3>
                <p className="text-gray-400 text-xs">Upload your work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;