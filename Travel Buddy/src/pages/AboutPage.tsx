import { Globe, Users, Heart, Camera } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Travel Buddy</h1>
          <p className="text-xl">Your companion for discovering the world through stories</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Travel Buddy was born from a passion for exploration and a desire to connect travelers
            from around the world. We believe that every journey has a story worth sharing, and
            every story has the power to inspire someone else's next adventure.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our platform brings together travel enthusiasts, adventurers, and storytellers to share
            their experiences, tips, and memories. Whether you're planning your next trip or simply
            dreaming of far-off places, Travel Buddy is here to inspire and guide you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Global Community</h3>
            </div>
            <p className="text-gray-700">
              Connect with travelers from every corner of the globe and discover diverse
              perspectives on destinations worldwide.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Share Stories</h3>
            </div>
            <p className="text-gray-700">
              Share your travel experiences, tips, and recommendations with a community that
              values authentic storytelling.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Heart className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Inspire Others</h3>
            </div>
            <p className="text-gray-700">
              Your adventures can inspire someone else's next journey. Every story matters and
              has the power to spark wanderlust.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Camera className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Capture Memories</h3>
            </div>
            <p className="text-gray-700">
              Preserve your travel memories with photos, videos, and detailed stories that you
              can revisit anytime.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-6">
            Ready to share your travel stories? Join thousands of travelers who are inspiring
            others and documenting their adventures.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
