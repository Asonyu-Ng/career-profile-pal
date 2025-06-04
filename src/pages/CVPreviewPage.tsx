
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCVById } from '../utils/cvStorage';
import { CV } from '../types/cv';
import CVPreview from '../components/CVPreview';

const CVPreviewPage = () => {
  const { cvId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cvId) {
      navigate('/dashboard');
      return;
    }

    const foundCV = getCVById(cvId);
    if (!foundCV || foundCV.userId !== user?.id) {
      navigate('/dashboard');
      return;
    }

    setCv(foundCV);
    setLoading(false);
  }, [cvId, user?.id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading CV...</p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">CV Not Found</h2>
          <p className="text-gray-600 mb-4">The CV you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <CVPreview cv={cv} />;
};

export default CVPreviewPage;
