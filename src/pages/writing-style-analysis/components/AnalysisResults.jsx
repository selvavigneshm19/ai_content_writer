import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ analysisData, onRetrainModel, isRetraining }) => {
  const [activeTab, setActiveTab] = useState('tone');

  if (!analysisData) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="BarChart3" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Analysis Available
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload writing samples to see your communication patterns and style analysis
        </p>
      </div>
    );
  }

  const toneData = [
    { name: 'Professional', value: analysisData.tone.professional, color: '#1B365D' },
    { name: 'Conversational', value: analysisData.tone.conversational, color: '#4A90A4' },
    { name: 'Authoritative', value: analysisData.tone.authoritative, color: '#E8B931' },
    { name: 'Friendly', value: analysisData.tone.friendly, color: '#38A169' }
  ];

  const vocabularyData = [
    { category: 'Business Terms', frequency: analysisData.vocabulary.businessTerms },
    { category: 'Technical Jargon', frequency: analysisData.vocabulary.technicalJargon },
    { category: 'Casual Language', frequency: analysisData.vocabulary.casualLanguage },
    { category: 'Industry Specific', frequency: analysisData.vocabulary.industrySpecific },
    { category: 'Action Words', frequency: analysisData.vocabulary.actionWords }
  ];

  const complexityData = [
    { subject: 'Sentence Length', A: analysisData.complexity.sentenceLength, fullMark: 100 },
    { subject: 'Word Complexity', A: analysisData.complexity.wordComplexity, fullMark: 100 },
    { subject: 'Readability', A: analysisData.complexity.readability, fullMark: 100 },
    { subject: 'Structure Variety', A: analysisData.complexity.structureVariety, fullMark: 100 },
    { subject: 'Engagement Level', A: analysisData.complexity.engagementLevel, fullMark: 100 }
  ];

  const tabs = [
    { id: 'tone', label: 'Tone Analysis', icon: 'Palette' },
    { id: 'vocabulary', label: 'Vocabulary Patterns', icon: 'BookOpen' },
    { id: 'complexity', label: 'Writing Complexity', icon: 'TrendingUp' },
    { id: 'insights', label: 'Key Insights', icon: 'Lightbulb' }
  ];

  const renderToneChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={toneData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {toneData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Confidence']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderVocabularyChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={vocabularyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="frequency" fill="#4A90A4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderComplexityChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={complexityData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis tick={{ fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          <Radar
            name="Complexity"
            dataKey="A"
            stroke="#1B365D"
            fill="#1B365D"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <h4 className="text-lg font-heading font-medium text-foreground">
              Dominant Style
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Your writing style is predominantly <strong>{analysisData.insights.dominantStyle}</strong> with high confidence in professional communication patterns.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs font-body text-success font-medium">
              {analysisData.insights.confidence}% Confidence
            </span>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="Users" size={20} className="text-secondary" />
            </div>
            <h4 className="text-lg font-heading font-medium text-foreground">
              Audience Alignment
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Your communication style aligns well with <strong>{analysisData.insights.targetAudience}</strong> expectations and industry standards.
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-xs font-body text-accent font-medium">
              Executive Level Match
            </span>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-6">
        <h4 className="text-lg font-heading font-medium text-foreground mb-4">
          Recommendations for Content Generation
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysisData.insights.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="CheckCircle" size={14} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Writing Style Analysis
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered analysis of your communication patterns and writing style
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-body text-success font-medium">
                Model Trained
              </span>
            </div>
            
            <Button
              variant="outline"
              onClick={onRetrainModel}
              loading={isRetraining}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Retrain AI Model
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md font-body font-medium text-sm transition-all duration-150
                ${activeTab === tab.id
                  ? 'bg-card text-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'tone' && (
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Communication Tone Distribution
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderToneChart()}
              <div className="space-y-4">
                {toneData.map((tone, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: tone.color }}
                      ></div>
                      <span className="font-body font-medium text-foreground">{tone.name}</span>
                    </div>
                    <span className="text-sm font-body text-muted-foreground">{tone.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Vocabulary Usage Patterns
            </h3>
            {renderVocabularyChart()}
          </div>
        )}

        {activeTab === 'complexity' && (
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Writing Complexity Metrics
            </h3>
            {renderComplexityChart()}
          </div>
        )}

        {activeTab === 'insights' && renderInsights()}
      </div>
    </div>
  );
};

export default AnalysisResults;