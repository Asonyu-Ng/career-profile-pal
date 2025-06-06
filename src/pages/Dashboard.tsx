
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserCVs, deleteCVFromStorage } from '../utils/cvStorage';
import { CV } from '../types/cv';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Download, Trash2, FileText, Search, Filter, User, Clock, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCvs, setFilteredCvs] = useState<CV[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userCVs = getUserCVs(user.id);
      setCvs(userCVs);
      setFilteredCvs(userCVs);
    }
  }, [user]);

  useEffect(() => {
    const filtered = cvs.filter(cv => 
      cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCvs(filtered);
  }, [searchTerm, cvs]);

  const handleDeleteCV = (cvId: string) => {
    deleteCVFromStorage(cvId);
    const updatedCvs = cvs.filter(cv => cv.id !== cvId);
    setCvs(updatedCvs);
    setFilteredCvs(updatedCvs);
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

  const getCompletionPercentage = (cv: CV) => {
    let completed = 0;
    const total = 4;
    
    if (cv.personalInfo.fullName && cv.personalInfo.email) completed++;
    if (cv.personalInfo.summary) completed++;
    if (cv.experience.length > 0) completed++;
    if (cv.education.length > 0 || cv.skills.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">CV Generator</h1>
                  <p className="text-sm text-muted-foreground">Professional CV Builder</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-muted/50 rounded-full px-4 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Welcome, {user?.name}</span>
              </div>
              <Button variant="outline" onClick={logout} className="rounded-full">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Professional CVs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create, manage, and download stunning CVs that land you interviews
          </p>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your CVs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-200 focus:border-primary"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={handleCreateNew} 
              className="gradient-primary rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New CV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <Card className="hover-lift gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total CVs</p>
                  <p className="text-3xl font-bold text-primary">{cvs.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {cvs.filter(cv => getCompletionPercentage(cv) === 100).length}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {cvs.length > 0 ? new Date(Math.max(...cvs.map(cv => new Date(cv.updatedAt).getTime()))).toLocaleDateString() : 'Never'}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredCvs.length === 0 ? (
          <div className="text-center py-16 animate-scale-in">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {searchTerm ? 'No CVs found' : 'No CVs yet'}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or create a new CV'
                : 'Get started by creating your first professional CV with our easy-to-use builder'
              }
            </p>
            {!searchTerm && (
              <Button onClick={handleCreateNew} size="lg" className="gradient-primary rounded-full">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Your First CV
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-scale-in">
            {filteredCvs.map((cv, index) => {
              const completion = getCompletionPercentage(cv);
              return (
                <Card 
                  key={cv.id} 
                  className="hover-lift gradient-card border-0 overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {cv.title}
                      </CardTitle>
                      <Badge 
                        variant="secondary" 
                        className={`${completion === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'} rounded-full`}
                      >
                        {completion}% Complete
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-medium text-gray-700">{cv.personalInfo.fullName || 'Unnamed CV'}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated {new Date(cv.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${completion}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(cv.id)}
                        className="flex-1 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(cv.id)}
                        className="flex-1 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteCV(cv.id)}
                        className="text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
