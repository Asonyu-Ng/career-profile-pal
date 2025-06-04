
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Download, Edit, Users } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Show auth form by navigating to a route that will show the auth
      navigate('/dashboard'); // This will be handled by ProtectedRoute
    }
  };

  // Don't render anything if user is logged in (will redirect)
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl">
                <FileText className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Your Perfect
              <span className="block text-blue-600">Professional CV</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build stunning, professional CVs in minutes. Our modern CV generator helps you create, edit, and download beautiful resumes that get you noticed by employers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="text-lg px-8 py-3"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-3"
              >
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Professional CVs
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you stand out from the competition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Edit className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Editing</h3>
              <p className="text-gray-600">
                Intuitive drag-and-drop interface makes creating and editing your CV simple and fast
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Download</h3>
              <p className="text-gray-600">
                Download your finished CV as a high-quality PDF ready for any application
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Dashboard</h3>
              <p className="text-gray-600">
                Manage multiple CVs, track your applications, and keep everything organized
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Professional CV?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have landed their dream jobs
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleGetStarted}
            className="text-lg px-8 py-3"
          >
            Start Creating Your CV
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">CV Generator</span>
          </div>
          <p className="text-gray-400">
            Create professional CVs that get you hired. Built with ❤️ for job seekers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
