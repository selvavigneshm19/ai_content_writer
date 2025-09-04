import React from 'react';


const WelcomeScreen = ({ onSamplePrompt }) => {
  const samplePrompts = [
    {
      title: 'Generate LinkedIn Post',
      description: 'Create professional content about leadership',
      prompt: 'Generate a LinkedIn post about the future of leadership in 2025',
      icon: 'Linkedin'
    },
    {
      title: 'Analyze Writing Style',
      description: 'Get insights about your communication patterns',
      prompt: 'Analyze my current writing style and confidence score',
      icon: 'BarChart3'
    },
    {
      title: 'Create Instagram Caption',
      description: 'Craft engaging social media content',
      prompt: 'Create an Instagram caption for a product launch with hashtags',
      icon: 'Instagram'
    },
    {
      title: 'Generate Hashtags',
      description: 'Get relevant hashtags for any topic',
      prompt: 'Generate hashtags for a tech startup focused on AI',
      icon: 'Hash'
    }
  ];

  const features = [
    {
      title: 'Content Generation',
      description: 'Create platform-specific posts that match your unique writing style',
      icon: 'Sparkles'
    },
    {
      title: 'Writing Analysis',
      description: 'Understand your communication patterns and get personalized insights',
      icon: 'FileText'
    },
    {
      title: 'Smart Suggestions',
      description: 'Get hashtag recommendations and tone adjustments for better engagement',
      icon: 'Target'
    },
    {
      title: 'Natural Conversation',
      description: 'Chat naturally or use commands - I understand both approaches',
      icon: 'MessageCircle'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Welcome to your AI Content Assistant! 👋
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          I'm here to help you create engaging content and analyze your writing style. 
          You can chat with me naturally or use specific commands to get exactly what you need.
        </p>

        <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-lg text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Type <code className="bg-background px-1.5 py-0.5 rounded font-mono text-xs">/help</code> anytime to see all available commands</span>
        </div>
      </div>

      {/* Sample Prompts */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          Try these examples to get started:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {samplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSamplePrompt(prompt.prompt)}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/20 hover:bg-card/80 transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {prompt.icon === 'Linkedin' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13v10h-6v-9c0-1.1-.9-2-2-2s-2 .9-2 2v9H5V9h6v2c0-2.2 1.8-4 4-4s4 1.8 4 4z" />
                    )}
                    {prompt.icon === 'BarChart3' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )}
                    {prompt.icon === 'Instagram' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a2 2 0 012-2h6a2 2 0 012 2v2M7 4H5a2 2 0 00-2 2v9a2 2 0 002 2h2M7 4h10M17 4h2a2 2 0 012 2v9a2 2 0 01-2 2h-2M9 9h6v6H9V9z" />
                    )}
                    {prompt.icon === 'Hash' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    )}
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {prompt.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 font-mono bg-muted/50 px-2 py-1 rounded">
                    "{prompt.prompt}"
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
          What I can help you with:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon === 'Sparkles' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  )}
                  {feature.icon === 'FileText' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  )}
                  {feature.icon === 'Target' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {feature.icon === 'MessageCircle' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  )}
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Click any example above or start typing below to begin</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;