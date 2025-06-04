
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserCVs, deleteCVFromStorage } from '../utils/cvStorage';
import { CV } from '../types/cv';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Download, Trash2, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userCVs = getUserCVs(user.id);
      setCvs(userCVs);
    }
  }, [user]);

  const handleDeleteCV = (cvId: string) => {
    deleteCVFromStorage(cvId);
    setCvs(cvs.filter(cv => cv.id !== cvId));
    toast({
      title: "CV Deleted",
      description: "Your CV has been successfully deleted"
    });
  };

  const handleCreateNew = () => {
    navigate('/cv/new');
  };

  const handleEdit = (cvId: string) => {
    navigate(`/cv/${cvId}/edit`);
  };

  const handleDownload = (cvId: string) => {
    navigate(`/cv/${cvId}/preview`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">CV Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your CVs</h2>
            <p className="text-gray-600 mt-1">Manage and create your professional CVs</p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Create New CV</span>
          </Button>
        </div>

        {cvs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No CVs yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first professional CV</p>
            <Button onClick={handleCreateNew}>Create Your First CV</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{cv.title}</CardTitle>
                    <Badge variant="secondary">
                      {new Date(cv.updatedAt).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{cv.personalInfo.fullName}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cv.id)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(cv.id)}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCV(cv.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
