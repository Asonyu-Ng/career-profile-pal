
import React from 'react';
import { CV } from '../types/cv';
import { CVTemplate } from '../types/template';

interface EnhancedCVPreviewProps {
  cv: CV;
  template: CVTemplate;
  customColors?: { primary: string; secondary: string };
  scale?: number;
}

const EnhancedCVPreview: React.FC<EnhancedCVPreviewProps> = ({
  cv,
  template,
  customColors,
  scale = 1
}) => {
  const colors = customColors || {
    primary: template.colors.primary,
    secondary: template.colors.secondary
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const baseStyles = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    backgroundColor: template.colors.background,
    color: template.colors.text
  };

  const headerStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: 'white'
  };

  const sectionHeaderStyle = {
    color: colors.primary,
    borderBottomColor: colors.primary
  };

  const accentStyle = {
    color: colors.secondary
  };

  return (
    <div
      className={`bg-white shadow-xl rounded-lg overflow-hidden ${template.fonts.body} text-sm`}
      style={baseStyles}
    >
      {/* Enhanced Header */}
      <div className="p-8 relative overflow-hidden" style={headerStyle}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h1 className={`text-3xl font-bold mb-3 ${template.fonts.heading}`}>
            {cv.personalInfo.fullName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-95">
            {cv.personalInfo.email && (
              <div className="flex items-center">
                <span className="font-medium">{cv.personalInfo.email}</span>
              </div>
            )}
            {cv.personalInfo.phone && (
              <div className="flex items-center">
                <span className="font-medium">{cv.personalInfo.phone}</span>
              </div>
            )}
            {cv.personalInfo.address && (
              <div className="flex items-center">
                <span className="font-medium">{cv.personalInfo.address}</span>
              </div>
            )}
            {(cv.personalInfo.linkedin || cv.personalInfo.website) && (
              <div className="flex items-center space-x-4">
                {cv.personalInfo.linkedin && <span className="font-medium">{cv.personalInfo.linkedin}</span>}
                {cv.personalInfo.website && <span className="font-medium">{cv.personalInfo.website}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {cv.personalInfo.summary && (
          <section className="animate-fade-in">
            <h2
              className={`text-xl font-bold mb-4 pb-2 border-b-2 ${template.fonts.heading} relative`}
              style={sectionHeaderStyle}
            >
              Professional Summary
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" style={{background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`}}></div>
            </h2>
            <p className="leading-relaxed text-gray-700 text-base">{cv.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cv.experience.length > 0 && (
          <section className="animate-fade-in">
            <h2
              className={`text-xl font-bold mb-4 pb-2 border-b-2 ${template.fonts.heading} relative`}
              style={sectionHeaderStyle}
            >
              Work Experience
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" style={{background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`}}></div>
            </h2>
            <div className="space-y-6">
              {cv.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full" style={{backgroundColor: colors.primary}}></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100" style={{color: colors.secondary}}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="font-medium mb-3 text-base" style={accentStyle}>{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          {cv.education.length > 0 && (
            <section className="animate-fade-in">
              <h2
                className={`text-xl font-bold mb-4 pb-2 border-b-2 ${template.fonts.heading} relative`}
                style={sectionHeaderStyle}
              >
                Education
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" style={{background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`}}></div>
              </h2>
              <div className="space-y-4">
                {cv.education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <p className="font-medium" style={accentStyle}>{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {cv.skills.length > 0 && (
            <section className="animate-fade-in">
              <h2
                className={`text-xl font-bold mb-4 pb-2 border-b-2 ${template.fonts.heading} relative`}
                style={sectionHeaderStyle}
              >
                Skills
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" style={{background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`}}></div>
              </h2>
              <div className="space-y-3">
                {cv.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm px-2 py-1 rounded-full bg-white" style={{color: colors.secondary}}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 60 : 40}%`,
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedCVPreview;
