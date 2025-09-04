import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const ContentControls = ({ 
  topic, 
  onTopicChange, 
  contentType, 
  onContentTypeChange, 
  tone, 
  onToneChange,
  hashtags,
  onHashtagsChange,
  onGenerate,
  isGenerating 
}) => {
  const contentTypes = [
    { value: 'thought-leadership', label: 'Thought Leadership' },
    { value: 'company-update', label: 'Company Update' },
    { value: 'industry-insight', label: 'Industry Insight' },
    { value: 'personal-story', label: 'Personal Story' },
    { value: 'product-announcement', label: 'Product Announcement' },
    { value: 'team-appreciation', label: 'Team Appreciation' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'humorous', label: 'Humorous' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <Input
          label="Topic or Theme"
          type="text"
          placeholder="e.g., Leadership in remote work, AI transformation, quarterly results..."
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          description="Describe what you want to write about"
          required
        />
      </div>

      <div>
        <Select
          label="Content Type"
          options={contentTypes}
          value={contentType}
          onChange={onContentTypeChange}
          placeholder="Choose content type"
          description="Select the type of post you want to create"
        />
      </div>

      <div>
        <Select
          label="Tone & Style"
          options={toneOptions}
          value={tone}
          onChange={onToneChange}
          placeholder="Select tone"
          description="Choose the tone that matches your message"
        />
      </div>

      <div>
        <Input
          label="Hashtag Preferences"
          type="text"
          placeholder="#leadership #innovation #business"
          value={hashtags}
          onChange={(e) => onHashtagsChange(e.target.value)}
          description="Add relevant hashtags (optional)"
        />
      </div>

      <div className="pt-4 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onGenerate}
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          disabled={!topic || !contentType || !tone}
        >
          {isGenerating ? 'Generating Content...' : 'Generate Content'}
        </Button>
      </div>
    </div>
  );
};

export default ContentControls;