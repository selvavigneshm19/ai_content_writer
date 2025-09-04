import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const FileUploadZone = ({ onFileUpload, isUploading, uploadProgress }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { extension: '.txt', type: 'text/plain', icon: 'FileText' },
    { extension: '.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: 'FileText' },
    { extension: '.pdf', type: 'application/pdf', icon: 'File' },
    { extension: '.eml', type: 'message/rfc822', icon: 'Mail' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const isValidType = supportedFormats.some(format => 
        file.type === format.type || file.name.toLowerCase().endsWith(format.extension)
      );
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim().length > 100) {
      onFileUpload([{
        name: 'Manual Text Input',
        type: 'text/plain',
        content: textInput,
        size: textInput.length,
        isTextInput: true
      }]);
      setTextInput('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Upload Writing Samples
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Upload documents or paste text to analyze your writing style
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Upload" size={20} className="text-primary" />
          <span className="text-sm font-body text-primary font-medium">
            {isUploading ? 'Processing...' : 'Ready to Upload'}
          </span>
        </div>
      </div>

      {/* File Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".txt,.docx,.pdf,.eml"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="CloudUpload" size={32} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-muted-foreground">
              Support for documents, emails, and text files up to 10MB
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            iconName="FolderOpen"
            iconPosition="left"
          >
            Choose Files
          </Button>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-card/80 rounded-lg flex items-center justify-center">
            <div className="bg-card rounded-lg p-6 shadow-elevation-2 min-w-64">
              <ProgressIndicator
                type="determinate"
                progress={uploadProgress}
                label="Analyzing writing samples..."
                size="default"
              />
            </div>
          </div>
        )}
      </div>

      {/* Supported Formats */}
      <div className="mt-4 flex flex-wrap gap-3">
        {supportedFormats.map((format, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-md"
          >
            <Icon name={format.icon} size={16} className="text-muted-foreground" />
            <span className="text-xs font-body text-muted-foreground">
              {format.extension.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Manual Text Input */}
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4">
          Or paste text directly
        </h3>
        
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your writing samples here (emails, articles, social media posts, etc.)..."
            className="w-full h-32 px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            disabled={isUploading}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {textInput.length} characters (minimum 100 required)
            </span>
            
            <Button
              variant="default"
              onClick={handleTextSubmit}
              disabled={textInput.trim().length < 100 || isUploading}
              iconName="Send"
              iconPosition="right"
            >
              Analyze Text
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;