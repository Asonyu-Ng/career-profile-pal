
import React, { useRef } from 'react';
import { CV } from '../types/cv';
import { Button } from '@/components/ui/button';
import { Download, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVPreviewProps {
  cv: CV;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cv }) => {
  const navigate = useNavigate();
  const cvRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
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
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          style={{ minHeight: '297mm' }}
        >
          {/* CV Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {cv.personalInfo.fullName}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                {cv.personalInfo.email && (
                  <span>{cv.personalInfo.email}</span>
                )}
                {cv.personalInfo.phone && (
                  <span>{cv.personalInfo.phone}</span>
                )}
                {cv.personalInfo.address && (
                  <span>{cv.personalInfo.address}</span>
                )}
              </div>
              {(cv.personalInfo.linkedin || cv.personalInfo.website) && (
                <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                  {cv.personalInfo.linkedin && (
                    <span>{cv.personalInfo.linkedin}</span>
                  )}
                  {cv.personalInfo.website && (
                    <span>{cv.personalInfo.website}</span>
                  )}
                </div>
              )}
            </div>

            {/* Professional Summary */}
            {cv.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {cv.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {cv.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {cv.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <span className="text-sm text-gray-600">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                      {exp.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cv.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {cv.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <span className="text-sm text-gray-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {cv.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {cv.skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
