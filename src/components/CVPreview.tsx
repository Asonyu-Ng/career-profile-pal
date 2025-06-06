
import React, { useRef, useState, useEffect } from 'react';
import { CV } from '../types/cv';
import { CVTemplate, CV_TEMPLATES } from '../types/template';
import { Button } from '@/components/ui/button';
import { Download, Edit, ArrowLeft, Palette, ZoomIn, ZoomOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import EnhancedCVPreview from './EnhancedCVPreview';

interface CVPreviewProps {
  cv: CV;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cv }) => {
  const navigate = useNavigate();
  const cvRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>(CV_TEMPLATES[0]);
  const [customColors, setCustomColors] = useState({ 
    primary: CV_TEMPLATES[0].colors.primary, 
    secondary: CV_TEMPLATES[0].colors.secondary 
  });
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${cv.personalInfo.fullName || 'CV'}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="hover:bg-primary/10 rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-muted/50 rounded-full p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium px-2">{Math.round(zoom * 100)}%</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => navigate(`/cv/${cv.id}/edit`)}
                className="rounded-full hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit CV
              </Button>
              
              <Button 
                onClick={downloadPDF}
                disabled={isDownloading}
                className="gradient-primary rounded-full hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* CV Preview Container */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{transform: `scale(${zoom})`}}>
          <div 
            ref={cvRef}
            className="min-h-[297mm] bg-white"
          >
            <EnhancedCVPreview
              cv={cv}
              template={selectedTemplate}
              customColors={customColors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
