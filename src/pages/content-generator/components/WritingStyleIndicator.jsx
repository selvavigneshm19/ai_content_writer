import React from 'react';
import Icon from '../../../components/AppIcon';

const WritingStyleIndicator = ({ confidence, lastAnalyzed, styleProfile }) => {
  const getConfidenceColor = () => {
    if (confidence >= 85) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getConfidenceIcon = () => {
    if (confidence >= 85) return 'CheckCircle';
    if (confidence >= 70) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground font-heading">
          Writing Style Confidence
        </h4>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getConfidenceIcon()} 
            size={16} 
            color={`var(--color-${confidence >= 85 ? 'success' : confidence >= 70 ? 'warning' : 'destructive'})`}
          />
          <span className={`text-sm font-semibold ${getConfidenceColor()}`}>
            {confidence}%
          </span>
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            confidence >= 85 ? 'bg-success' : confidence >= 70 ? 'bg-warning' : 'bg-destructive'
          }`}
          style={{ width: `${confidence}%` }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Last analyzed:</span>
          <span className="text-foreground font-medium">{lastAnalyzed}</span>
        </div>
        
        {styleProfile && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Style profile:</span>
            <span className="text-foreground font-medium">{styleProfile}</span>
          </div>
        )}
      </div>

      {confidence < 70 && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
            <p className="text-xs text-warning font-body">
              Low confidence. Upload more writing samples to improve accuracy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingStyleIndicator;