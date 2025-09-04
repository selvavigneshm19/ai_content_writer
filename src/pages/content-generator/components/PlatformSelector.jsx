import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformSelector = ({ selectedPlatform, onPlatformChange }) => {
  const platforms = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      charLimit: 3000,
      description: 'Professional networking'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-sky-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      charLimit: 280,
      description: 'Quick thoughts & updates'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      charLimit: 63206,
      description: 'Detailed posts & stories'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground font-heading">
        Select Platform
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform)}
            className={`
              w-full p-3 rounded-lg border-2 transition-all duration-200
              flex items-center space-x-3 text-left
              ${selectedPlatform?.id === platform.id
                ? `${platform.bgColor} ${platform.borderColor} shadow-elevation-1`
                : 'bg-card border-border hover:border-muted-foreground/20'
              }
            `}
          >
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${selectedPlatform?.id === platform.id ? platform.bgColor : 'bg-muted'}
            `}>
              <Icon 
                name={platform.icon} 
                size={20} 
                color={selectedPlatform?.id === platform.id ? platform.color.replace('text-', '') : 'currentColor'}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground font-body">
                {platform.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {platform.description} • {platform.charLimit.toLocaleString()} chars
              </div>
            </div>
            {selectedPlatform?.id === platform.id && (
              <Icon name="Check" size={16} color={platform.color.replace('text-', '')} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;