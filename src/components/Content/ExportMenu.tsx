import React, { useState } from 'react';
import { Download, FileText, File, Loader } from 'lucide-react';
import { exportContent, ExportOptions } from '../../utils/exportUtils';

interface ExportMenuProps {
  content: any;
  title: string;
  onClose: () => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ content, title, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'docx' | 'txt') => {
    setIsExporting(true);
    
    const options: ExportOptions = {
      format,
      filename: title.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
      content,
      title,
    };

    try {
      await exportContent(options);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  const exportOptions = [
    {
      format: 'pdf' as const,
      label: 'Export as PDF',
      description: 'Portable Document Format',
      icon: FileText,
      color: 'text-red-600 bg-red-50 hover:bg-red-100',
    },
    {
      format: 'docx' as const,
      label: 'Export as DOCX',
      description: 'Microsoft Word Document',
      icon: File,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    },
    {
      format: 'txt' as const,
      label: 'Export as Text',
      description: 'Plain Text File',
      icon: FileText,
      color: 'text-gray-600 bg-gray-50 hover:bg-gray-100',
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Content
        </h3>
        <p className="text-sm text-gray-500 mt-1">Choose your preferred format</p>
      </div>
      
      <div className="p-2">
        {exportOptions.map((option) => (
          <button
            key={option.format}
            onClick={() => handleExport(option.format)}
            disabled={isExporting}
            className={`
              w-full flex items-center p-3 rounded-lg transition-colors text-left
              ${isExporting ? 'opacity-50 cursor-not-allowed' : `hover:${option.color.split(' ')[2]} ${option.color}`}
            `}
          >
            <div className={`p-2 rounded-lg mr-3 ${option.color.split(' ').slice(1).join(' ')}`}>
              {isExporting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <option.icon className={`w-4 h-4 ${option.color.split(' ')[0]}`} />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};