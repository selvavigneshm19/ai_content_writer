import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import AnalysisResults from './components/AnalysisResults';
import SampleLibrary from './components/SampleLibrary';
import Icon from '../../components/AppIcon';

const WritingStyleAnalysis = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isRetraining, setIsRetraining] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [samples, setSamples] = useState([]);

  // Mock data for demonstration
  const mockAnalysisData = {
    tone: {
      professional: 75,
      conversational: 15,
      authoritative: 65,
      friendly: 25
    },
    vocabulary: {
      businessTerms: 85,
      technicalJargon: 45,
      casualLanguage: 20,
      industrySpecific: 70,
      actionWords: 60
    },
    complexity: {
      sentenceLength: 75,
      wordComplexity: 80,
      readability: 85,
      structureVariety: 70,
      engagementLevel: 65
    },
    insights: {
      dominantStyle: "Professional Executive",
      confidence: 87,
      targetAudience: "C-level executives and business leaders",
      recommendations: [
        "Maintain authoritative tone for thought leadership content",
        "Include more conversational elements for social media engagement",
        "Leverage industry-specific terminology for credibility"
      ]
    }
  };

  const mockSamples = [
    {
      id: 1,
      name: "Q3 Board Presentation.pdf",
      type: "application/pdf",
      size: 2456789,
      uploadDate: "2024-07-20T10:30:00Z",
      confidenceScore: 92,
      wordCount: 3450,
      analysisPreview: "Highly professional tone with strong business vocabulary. Excellent for executive communication patterns."
    },
    {
      id: 2,
      name: "LinkedIn Posts Collection.txt",
      type: "text/plain",
      size: 156789,
      uploadDate: "2024-07-18T14:15:00Z",
      confidenceScore: 78,
      wordCount: 1250,
      analysisPreview: "Mix of professional and conversational tones. Good for social media content generation."
    },
    {
      id: 3,
      name: "Email Communications.eml",
      type: "message/rfc822",
      size: 345678,
      uploadDate: "2024-07-15T09:45:00Z",
      confidenceScore: 85,
      wordCount: 2100,
      analysisPreview: "Consistent professional communication style with clear action-oriented language."
    },
    {
      id: 4,
      name: "Industry Article Draft.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 567890,
      uploadDate: "2024-07-12T16:20:00Z",
      confidenceScore: 95,
      wordCount: 4200,
      analysisPreview: "Authoritative thought leadership style with industry expertise. Perfect for content generation."
    },
    {
      id: 5,
      name: "Manual Text Input",
      type: "text/plain",
      size: 89012,
      uploadDate: "2024-07-10T11:30:00Z",
      confidenceScore: 65,
      wordCount: 890,
      analysisPreview: "Informal communication sample. Useful for understanding casual writing patterns."
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setSamples(mockSamples);
    setAnalysisData(mockAnalysisData);
  }, []);

  const handleFileUpload = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate processing time
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Add new samples
      const newSamples = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString(),
        confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100
        wordCount: file.isTextInput ? file.content.split(' ').length : Math.floor(Math.random() * 3000) + 500,
        analysisPreview: `Analysis completed for ${file.name}. Writing patterns identified and integrated into your style profile.`
      }));

      setSamples(prev => [...newSamples, ...prev]);
      
      // Update analysis data with new insights
      setAnalysisData(mockAnalysisData);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }, 3000);
  };

  const handleRetrainModel = async () => {
    setIsRetraining(true);
    
    // Simulate retraining process
    setTimeout(() => {
      // Update analysis data with slightly different values
      const updatedAnalysis = {
        ...mockAnalysisData,
        tone: {
          professional: Math.min(100, mockAnalysisData.tone.professional + Math.floor(Math.random() * 10)),
          conversational: Math.max(0, mockAnalysisData.tone.conversational + Math.floor(Math.random() * 10) - 5),
          authoritative: Math.min(100, mockAnalysisData.tone.authoritative + Math.floor(Math.random() * 8)),
          friendly: Math.max(0, mockAnalysisData.tone.friendly + Math.floor(Math.random() * 8) - 4)
        },
        insights: {
          ...mockAnalysisData.insights,
          confidence: Math.min(100, mockAnalysisData.insights.confidence + Math.floor(Math.random() * 5))
        }
      };
      
      setAnalysisData(updatedAnalysis);
      setIsRetraining(false);
    }, 2500);
  };

  const handleDeleteSample = (sampleId) => {
    setSamples(prev => prev.filter(sample => sample.id !== sampleId));
  };

  const handleReanalyzeSample = async (sampleId) => {
    setIsProcessing(true);
    
    // Simulate reanalysis
    setTimeout(() => {
      setSamples(prev => prev.map(sample => 
        sample.id === sampleId 
          ? {
              ...sample,
              confidenceScore: Math.floor(Math.random() * 30) + 70,
              analysisPreview: `Re-analyzed on ${new Date().toLocaleDateString()}. Updated writing patterns integrated into your style profile.`
            }
          : sample
      ));
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Writing Style Analysis</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Writing Style Analysis
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload writing samples to analyze your communication patterns and train AI for personalized content generation
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* File Upload Section */}
            <FileUploadZone
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            {/* Analysis Results Section */}
            <AnalysisResults
              analysisData={analysisData}
              onRetrainModel={handleRetrainModel}
              isRetraining={isRetraining}
            />

            {/* Sample Library Section */}
            <SampleLibrary
              samples={samples}
              onDeleteSample={handleDeleteSample}
              onReanalyzeSample={handleReanalyzeSample}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WritingStyleAnalysis;