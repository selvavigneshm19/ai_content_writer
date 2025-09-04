import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import PlatformSelector from './components/PlatformSelector';
import ContentControls from './components/ContentControls';
import ContentEditor from './components/ContentEditor';
import ContentVariations from './components/ContentVariations';
import WritingStyleIndicator from './components/WritingStyleIndicator';

const ContentGenerator = () => {
  // State management
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('');
  const [tone, setTone] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentVariations, setContentVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Mock writing style data
  const writingStyleData = {
    confidence: 87,
    lastAnalyzed: 'July 23, 2025',
    styleProfile: 'Professional & Authoritative'
  };

  // Mock content variations
  const mockVariations = [
    {
      id: 1,
      content: `The future of leadership isn't about having all the answers—it's about asking the right questions and empowering your team to find innovative solutions.\n\nIn today's rapidly evolving business landscape, the most successful leaders are those who embrace uncertainty as an opportunity for growth. They create environments where experimentation is encouraged, failure is seen as learning, and diverse perspectives are valued.\n\nWhat questions are you asking your team today? #leadership #innovation #growth`,
      confidence: 92,
      wordCount: 67,
      tone: 'Inspirational',
      hashtags: ['#leadership', '#innovation', '#growth']
    },
    {
      id: 2,
      content: `Leadership in 2025 requires a fundamental shift in mindset. We're moving from command-and-control to coach-and-collaborate.\n\nThe leaders who will thrive are those who:\n• Ask powerful questions instead of giving all the answers\n• Create psychological safety for their teams\n• Embrace diverse perspectives and inclusive decision-making\n• View challenges as opportunities for innovation\n\nThe question isn't whether you have all the answers—it's whether you're creating space for the right questions to emerge. #leadership #futureofwork #teambuilding`,
      confidence: 89,
      wordCount: 78,
      tone: 'Professional',
      hashtags: ['#leadership', '#futureofwork', '#teambuilding']
    },
    {
      id: 3,
      content: `Here's what I've learned about leadership after 15 years in executive roles: The best leaders don't have all the answers—they ask the questions that unlock their team's potential.\n\nWhen we shift from being the person with solutions to being the person who creates space for solutions to emerge, magic happens. Teams become more engaged, innovation flourishes, and everyone grows.\n\nWhat's one question you could ask your team this week that might change everything? #leadership #executiveinsights #teamdevelopment`,
      confidence: 85,
      wordCount: 71,
      tone: 'Conversational',
      hashtags: ['#leadership', '#executiveinsights', '#teamdevelopment']
    }
  ];

  // Handle platform selection
  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  // Handle content generation
  const handleGenerate = async () => {
    if (!topic || !contentType || !tone) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate AI generation process
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    setTimeout(() => {
      const selectedVariation = mockVariations[0];
      setGeneratedContent(selectedVariation.content);
      setContentVariations(mockVariations);
      setSelectedVariation(selectedVariation);
      setIsGenerating(false);
      setGenerationProgress(0);
    }, 2500);
  };

  // Handle variation selection
  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
    setGeneratedContent(variation.content);
  };

  // Handle content change
  const handleContentChange = (newContent) => {
    setGeneratedContent(newContent);
  };

  // Handle save to library
  const handleSave = () => {
    // Mock save functionality
    alert('Content saved to library successfully!');
  };

  // Handle schedule post
  const handleSchedule = () => {
    // Mock schedule functionality
    alert('Post scheduled successfully!');
  };

  // Handle generate more variations
  const handleGenerateMore = () => {
    // Mock generate more functionality
    alert('Generating more variations...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
              AI Content Generator
            </h1>
            <p className="text-muted-foreground font-body">
              Create engaging social media content that matches your unique writing style and voice.
            </p>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="mb-6">
              <ProgressIndicator
                type="determinate"
                progress={generationProgress}
                label="Generating content with AI..."
                className="max-w-md"
              />
            </div>
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel - Generation Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Platform Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <PlatformSelector
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={handlePlatformChange}
                />
              </div>

              {/* Content Controls */}
              <div className="bg-card border border-border rounded-lg p-6">
                <ContentControls
                  topic={topic}
                  onTopicChange={setTopic}
                  contentType={contentType}
                  onContentTypeChange={setContentType}
                  tone={tone}
                  onToneChange={setTone}
                  hashtags={hashtags}
                  onHashtagsChange={setHashtags}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>

              {/* Writing Style Indicator */}
              <WritingStyleIndicator
                confidence={writingStyleData.confidence}
                lastAnalyzed={writingStyleData.lastAnalyzed}
                styleProfile={writingStyleData.styleProfile}
              />
            </div>

            {/* Right Panel - Content Editor and Variations */}
            <div className="lg:col-span-3 space-y-6">
              {/* Content Editor */}
              <div className="bg-card border border-border rounded-lg p-6 h-96 lg:h-[500px]">
                <ContentEditor
                  content={generatedContent}
                  onContentChange={handleContentChange}
                  selectedPlatform={selectedPlatform}
                  onSave={handleSave}
                  onSchedule={handleSchedule}
                  onGenerateMore={handleGenerateMore}
                />
              </div>

              {/* Content Variations */}
              <div className="bg-card border border-border rounded-lg p-6">
                <ContentVariations
                  variations={contentVariations}
                  selectedVariation={selectedVariation}
                  onVariationSelect={handleVariationSelect}
                />
              </div>
            </div>
          </div>

          {/* Mobile-specific improvements */}
          <div className="lg:hidden mt-8">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-foreground">
                  Pro Tip
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                For the best experience, try using the content generator on a larger screen where you can see all options at once.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentGenerator;