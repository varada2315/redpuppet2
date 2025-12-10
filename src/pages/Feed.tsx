import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Users } from 'lucide-react';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Sharma',
      role: 'Producer',
      timeAgo: '2 hours ago',
      location: 'Mumbai',
      content: 'Looking for an experienced Editor in Mumbai for a paid commercial project. 3-day shoot, competitive rates. Must have experience with color grading and motion graphics.',
      type: 'job',
      paid: true,
      likes: 12,
      comments: 5,
      skills: ['Editing', 'Color Grading', 'Motion Graphics']
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      role: 'Director',
      timeAgo: '5 hours ago',
      location: 'Delhi',
      content: 'Excited to share that our short film "Midnight Express" has been selected for the Delhi Independent Film Festival! Looking for a Sound Designer to join our post-production team.',
      type: 'collaboration',
      paid: false,
      likes: 24,
      comments: 8,
      skills: ['Sound Design', 'Audio Mixing']
    },
    {
      id: 3,
      author: 'Meera Patel',
      role: 'Cinematographer',
      timeAgo: '1 day ago',
      location: 'Bangalore',
      content: 'Portfolio update! Just wrapped an amazing music video shoot. The lighting challenges pushed my creativity to new levels. Always looking for collaborative directors who value cinematography.',
      type: 'showcase',
      paid: null,
      likes: 31,
      comments: 12,
      skills: ['Cinematography', 'Lighting']
    },
    {
      id: 4,
      author: 'Arjun Singh',
      role: 'Actor',
      timeAgo: '2 days ago',
      location: 'Hyderabad',
      content: 'Seeking talented filmmakers for an upcoming web series project. We have funding secured and are looking for passionate storytellers. Drama/Thriller genre. Paid positions available.',
      type: 'job',
      paid: true,
      likes: 18,
      comments: 15,
      skills: ['Direction', 'Writing', 'Production']
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-green-600';
      case 'collaboration': return 'bg-blue-600';
      case 'showcase': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getPostTypeText = (type: string) => {
    switch (type) {
      case 'job': return 'Job Opportunity';
      case 'collaboration': return 'Collaboration';
      case 'showcase': return 'Showcase';
      default: return 'Post';
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Collaboration Feed</h1>
          <p className="text-gray-400">Discover opportunities and connect with filmmakers</p>
        </div>

        {/* Create Post Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <button className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 text-left text-gray-400 hover:border-red-600 transition-colors">
              Share an opportunity or showcase your work...
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
              Post Job
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Find Collaborators
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
              Share Work
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-red-900 transition-colors">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <p className="text-red-600 text-sm">{post.role}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="h-3 w-3" />
                      <span>{post.timeAgo}</span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${getPostTypeColor(post.type)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {getPostTypeText(post.type)}
                  </span>
                  {post.paid && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Paid
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-300 mb-4">{post.content}</p>

              {/* Skills Tags */}
              {post.skills && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.skills.map((skill, index) => (
                    <span key={index} className="bg-red-600 bg-opacity-20 text-red-400 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;