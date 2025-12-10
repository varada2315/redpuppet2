import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Users, Award, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <img 
            src="/Red and White Simple Food Logo (1).png" 
            alt="RedPuppet" 
            className="h-32 w-auto mx-auto mb-8"
          />
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="text-red-600">Where Filmmakers</span>
            <br />
            <span className="text-white">Meet, Collaborate & Create.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Connect with directors, actors, editors, musicians, and producers. 
            Build your network, showcase your work, and find your next big project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors"
            >
              Start Your Journey
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Built for <span className="text-red-600">Filmmakers</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Showcase Portfolio</h3>
              <p className="text-gray-400">Display your best work with high-quality video and image uploads.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Find Collaborators</h3>
              <p className="text-gray-400">Connect with talented professionals across all film disciplines.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Build Reputation</h3>
              <p className="text-gray-400">Earn recognition for your work and build industry credibility.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fast Networking</h3>
              <p className="text-gray-400">Quick connections and instant collaboration opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Join the Community?
          </h2>
          <div className="flex justify-center mb-6">
            <img 
              src="/Red and White Simple Food Logo (1).png" 
              alt="RedPuppet" 
              className="h-24 w-auto"
            />
          </div>
          <p className="text-xl text-gray-300 mb-8">
            Your next great collaboration is just a click away.
          </p>
          <Link 
            to="/signup" 
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-xl font-bold transition-colors inline-block"
          >
            Join Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;