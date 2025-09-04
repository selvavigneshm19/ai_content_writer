import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentEditor = ({ 
  content, 
  onContentChange, 
  selectedPlatform, 
  onSave, 
  onSchedule,
  onGenerateMore 
}) => {
  const [charCount, setCharCount] = useState(0);
  const [previewMode, setPreviewMode] = useState('edit');

  useEffect(() => {
    setCharCount(content.length);
  }, [content]);

  const getCharLimitColor = () => {
    if (!selectedPlatform) return 'text-muted-foreground';
    const percentage = (charCount / selectedPlatform.charLimit) * 100;
    if (percentage > 90) return 'text-destructive';
    if (percentage > 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatPreviewContent = () => {
    if (!content) return '';
    
    // Simple formatting for preview
    return content
      .split('\n')
      .map((line, index) => (
        <p key={index} className="mb-2 last:mb-0">
          {line}
        </p>
      ));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground font-heading">
            Content Editor
          </h3>
          {selectedPlatform && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md">
              <Icon name={selectedPlatform.icon} size={14} />
              <span className="text-xs font-medium text-muted-foreground">
                {selectedPlatform.name}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPreviewMode('edit')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              previewMode === 'edit' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setPreviewMode('preview')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              previewMode === 'preview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 mb-4">
        {previewMode === 'edit' ? (
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Your generated content will appear here. You can edit it in real-time..."
            className="w-full h-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-card text-foreground font-body"
          />
        ) : (
          <div className="w-full h-full p-4 border border-border rounded-lg bg-card overflow-y-auto">
            <div className="prose prose-sm max-w-none text-foreground">
              {content ? formatPreviewContent() : (
                <p className="text-muted-foreground italic">
                  No content to preview. Generate some content first.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Character Count */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Type" size={16} color="currentColor" />
            <span className="text-sm font-medium text-foreground">
              Character Count
            </span>
          </div>
          <span className={`text-sm font-mono ${getCharLimitColor()}`}>
            {charCount.toLocaleString()}
            {selectedPlatform && (
              <span className="text-muted-foreground">
                /{selectedPlatform.charLimit.toLocaleString()}
              </span>
            )}
          </span>
        </div>
        
        {selectedPlatform && (
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  (charCount / selectedPlatform.charLimit) > 0.9 
                    ? 'bg-destructive' 
                    : (charCount / selectedPlatform.charLimit) > 0.75 
                      ? 'bg-warning' :'bg-success'
                }`}
                style={{ 
                  width: `${Math.min(100, (charCount / selectedPlatform.charLimit) * 100)}%` 
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onGenerateMore}
          iconName="RefreshCw"
          iconPosition="left"
          className="flex-1"
        >
          Generate More
        </Button>
        <Button
          variant="secondary"
          onClick={onSave}
          iconName="Save"
          iconPosition="left"
          className="flex-1"
        >
          Save to Library
        </Button>
        <Button
          variant="default"
          onClick={onSchedule}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
        >
          Schedule Post
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;