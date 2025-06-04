
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
    backgroundColor: colors.primary,
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
      className={`bg-white shadow-lg ${template.fonts.body} text-sm`}
      style={baseStyles}
    >
      {/* Header */}
      <div className="p-6" style={headerStyle}>
        <h1 className={`text-2xl font-bold mb-2 ${template.fonts.heading}`}>
          {cv.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
          {cv.personalInfo.address && <span>{cv.personalInfo.address}</span>}
        </div>
        {(cv.personalInfo.linkedin || cv.personalInfo.website) && (
          <div className="flex flex-wrap gap-4 text-sm mt-2 opacity-90">
            {cv.personalInfo.linkedin && <span>{cv.personalInfo.linkedin}</span>}
            {cv.personalInfo.website && <span>{cv.personalInfo.website}</span>}
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Professional Summary */}
        {cv.personalInfo.summary && (
          <section>
            <h2
              className={`text-lg font-semibold mb-3 pb-1 border-b-2 ${template.fonts.heading}`}
              style={sectionHeaderStyle}
            >
              Professional Summary
            </h2>
            <p className="leading-relaxed">{cv.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cv.experience.length > 0 && (
          <section>
            <h2
              className={`text-lg font-semibold mb-3 pb-1 border-b-2 ${template.fonts.heading}`}
              style={sectionHeaderStyle}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {cv.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">{exp.position}</h3>
                    <span className="text-sm" style={accentStyle}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="font-medium mb-2" style={accentStyle}>{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <section>
            <h2
              className={`text-lg font-semibold mb-3 pb-1 border-b-2 ${template.fonts.heading}`}
              style={sectionHeaderStyle}
            >
              Education
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold">
                      {edu.degree} in {edu.field}
                    </h3>
                    <span className="text-sm" style={accentStyle}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p style={accentStyle}>{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <section>
            <h2
              className={`text-lg font-semibold mb-3 pb-1 border-b-2 ${template.fonts.heading}`}
              style={sectionHeaderStyle}
            >
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {cv.skills.map((skill) => (
                <div key={skill.id} className="flex justify-between">
                  <span>{skill.name}</span>
                  <span className="text-sm" style={accentStyle}>{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default EnhancedCVPreview;
