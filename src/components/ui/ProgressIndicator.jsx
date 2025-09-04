import React from 'react';

const ProgressIndicator = ({ 
  type = 'indeterminate', 
  progress = 0, 
  size = 'default',
  label = '',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3'
  };

  if (type === 'determinate') {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body text-muted-foreground">{label}</span>
            <span className="text-sm font-body text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        )}
        <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
          <div
            className="h-full bg-primary transition-all duration-200 ease-out rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-center mb-3">
          <span className="text-sm font-body text-muted-foreground">{label}</span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-pulse rounded-full" />
      </div>
    </div>
  );
};

export default ProgressIndicator;