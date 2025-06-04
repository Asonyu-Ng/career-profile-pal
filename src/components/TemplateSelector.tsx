
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CVTemplate, CV_TEMPLATES, COLOR_THEMES } from '../types/template';
import { Check, Palette } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  selectedColors: { primary: string; secondary: string };
  onTemplateChange: (template: CVTemplate) => void;
  onColorChange: (colors: { primary: string; secondary: string }) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  selectedColors,
  onTemplateChange,
  onColorChange
}) => {
  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Choose Template
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {CV_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : ''
              }`}
              onClick={() => onTemplateChange(template)}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">{template.preview}</div>
                  <h4 className="font-semibold text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {template.description}
                  </p>
                  {selectedTemplate === template.id && (
                    <div className="mt-2">
                      <Check className="h-4 w-4 text-blue-500 mx-auto" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Color Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Color Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {COLOR_THEMES.map((theme) => (
            <Button
              key={theme.name}
              variant="outline"
              size="sm"
              className={`h-auto p-3 ${
                selectedColors.primary === theme.primary
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
              onClick={() => onColorChange({
                primary: theme.primary,
                secondary: theme.secondary
              })}
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  />
                </div>
                <span className="text-xs">{theme.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
