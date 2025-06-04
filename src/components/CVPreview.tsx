
import React, { useRef, useState, useEffect } from 'react';
import { CV } from '../types/cv';
import { CVTemplate, CV_TEMPLATES } from '../types/template';
import { Button } from '@/components/ui/button';
import { Download, Edit, ArrowLeft } from 'lucide-react';
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

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
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

      pdf.save(`${cv.personalInfo.fullName}_CV.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate(`/cv/${cv.id}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit CV
              </Button>
              <Button onClick={downloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* CV Preview */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div 
          ref={cvRef}
          className="shadow-lg rounded-lg overflow-hidden"
          style={{ minHeight: '297mm' }}
        >
          <EnhancedCVPreview
            cv={cv}
            template={selectedTemplate}
            customColors={customColors}
          />
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
