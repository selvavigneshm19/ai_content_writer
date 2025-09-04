import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentVariations = ({ variations, selectedVariation, onVariationSelect }) => {
  if (!variations || variations.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="FileText" size={48} color="var(--color-muted-foreground)" />
        <p className="text-muted-foreground mt-4 font-body">
          Generate content to see variations here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground font-heading">
          Content Variations
        </h3>
        <span className="text-sm text-muted-foreground font-body">
          {variations.length} options
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {variations.map((variation, index) => (
          <div
            key={variation.id}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedVariation?.id === variation.id
                ? 'border-primary bg-primary/5 shadow-elevation-1'
                : 'border-border bg-card hover:border-muted-foreground/20'
              }
            `}
            onClick={() => onVariationSelect(variation)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground font-body">
                  Variation {index + 1}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} color="var(--color-accent)" />
                  <span className="text-xs text-accent font-medium">
                    {variation.confidence}% match
                  </span>
                </div>
              </div>
              {selectedVariation?.id === variation.id && (
                <Icon name="Check" size={16} color="var(--color-primary)" />
              )}
            </div>

            <div className="text-sm text-foreground font-body line-clamp-3 mb-3">
              {variation.content}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-muted-foreground">
                  {variation.wordCount} words
                </span>
                <span className="text-xs text-muted-foreground">
                  {variation.tone}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {variation.hashtags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {variation.hashtags.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{variation.hashtags.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Plus"
          iconPosition="left"
        >
          Generate More Variations
        </Button>
      </div>
    </div>
  );
};

export default ContentVariations;