import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Users, Plus, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase, type Post } from '../lib/supabase';

const Feed = () => {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    type: 'collaboration' as 'job' | 'collaboration' | 'showcase',
    is_paid: false,
    location: '',
    skills_required: [] as string[],
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            id,
            name,
            role,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      // Check which posts the current user has liked
      if (user && data) {
        const { data: likes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(likes?.map(like => like.post_id) || []);
        
        const postsWithLikes = data.map(post => ({
          ...post,
          user_has_liked: likedPostIds.has(post.id)
        }));

        setPosts(postsWithLikes);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.user_has_liked) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });
      }

      // Update local state
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              user_has_liked: !p.user_has_liked,
              likes_count: p.user_has_liked ? p.likes_count - 1 : p.likes_count + 1
            } 
          : p
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!user || !newPost.content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: newPost.content,
          type: newPost.type,
          is_paid: newPost.is_paid,
          location: newPost.location,
          skills_required: newPost.skills_required,
        })
        .select(`
          *,
          profiles (
            id,
            name,
            role,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        return;
      }

      setPosts([{ ...data, user_has_liked: false }, ...posts]);
      setNewPost({
        content: '',
        type: 'collaboration',
        is_paid: false,
        location: '',
        skills_required: [],
      });
      setShowCreatePost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Collaboration Feed</h1>
          <p className="text-gray-400">Discover opportunities and connect with filmmakers</p>
        </div>

        {/* Create Post Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          {!showCreatePost ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <Users className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <button 
                onClick={() => setShowCreatePost(true)}
                className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 text-left text-gray-400 hover:border-red-600 transition-colors"
              >
                Share an opportunity or showcase your work...
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <Users className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{profile?.name}</h3>
                  <p className="text-red-600 text-sm">{profile?.role}</p>
                </div>
              </div>

              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="What's on your mind?"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none resize-none"
                rows={4}
              />

              <div className="flex flex-wrap gap-4">
                <select
                  value={newPost.type}
                  onChange={(e) => setNewPost({...newPost, type: e.target.value as any})}
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-red-600 focus:outline-none"
                >
                  <option value="collaboration">Collaboration</option>
                  <option value="job">Job Opportunity</option>
                  <option value="showcase">Showcase</option>
                </select>

                <input
                  type="text"
                  value={newPost.location}
                  onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                  placeholder="Location (optional)"
                  className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
                />

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={newPost.is_paid}
                    onChange={(e) => setNewPost({...newPost, is_paid: e.target.checked})}
                    className="rounded"
                  />
                  Paid opportunity
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-gray-400">Be the first to share something with the community!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-red-900 transition-colors">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      {post.profiles?.avatar_url ? (
                        <img 
                          src={post.profiles.avatar_url} 
                          alt={post.profiles.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{post.profiles?.name}</h3>
                      <p className="text-red-600 text-sm">{post.profiles?.role}</p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        {post.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${getPostTypeColor(post.type)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {getPostTypeText(post.type)}
                    </span>
                    {post.is_paid && (
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
                {post.skills_required && post.skills_required.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.skills_required.map((skill, index) => (
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
                      className={`flex items-center gap-2 transition-colors ${
                        post.user_has_liked 
                          ? 'text-red-600' 
                          : 'text-gray-400 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${post.user_has_liked ? 'fill-current' : ''}`} />
                      <span>{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments_count}</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;