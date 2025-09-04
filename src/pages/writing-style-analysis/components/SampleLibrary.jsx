import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { format } from 'date-fns';

const SampleLibrary = ({ samples, onDeleteSample, onReanalyzeSample, isProcessing }) => {
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const getFileIcon = (type) => {
    switch (type) {
      case 'application/pdf':
        return 'File';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'FileText';
      case 'message/rfc822':
        return 'Mail';
      case 'text/plain':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-warning';
  };

  const getConfidenceBadge = (score) => {
    if (score >= 80) return { label: 'High', color: 'bg-success/10 text-success' };
    if (score >= 60) return { label: 'Medium', color: 'bg-accent/10 text-accent' };
    return { label: 'Low', color: 'bg-warning/10 text-warning' };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSelectSample = (sampleId) => {
    setSelectedSamples(prev => 
      prev.includes(sampleId) 
        ? prev.filter(id => id !== sampleId)
        : [...prev, sampleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSamples.length === samples.length) {
      setSelectedSamples([]);
    } else {
      setSelectedSamples(samples.map(sample => sample.id));
    }
  };

  const handleBulkDelete = () => {
    selectedSamples.forEach(sampleId => {
      onDeleteSample(sampleId);
    });
    setSelectedSamples([]);
  };

  const sortedAndFilteredSamples = samples
    .filter(sample => {
      if (filterBy === 'all') return true;
      if (filterBy === 'high') return sample.confidenceScore >= 80;
      if (filterBy === 'medium') return sample.confidenceScore >= 60 && sample.confidenceScore < 80;
      if (filterBy === 'low') return sample.confidenceScore < 60;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'confidence':
          return b.confidenceScore - a.confidenceScore;
        case 'size':
          return b.size - a.size;
        default:
          return 0;
      }
    });

  if (samples.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FolderOpen" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Writing Samples
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload your first writing sample to start building your style profile
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Writing Sample Library
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your uploaded documents and analysis history
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-body text-muted-foreground">
              {samples.length} sample{samples.length !== 1 ? 's' : ''}
            </span>
            
            {selectedSamples.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Selected ({selectedSamples.length})
              </Button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-body text-muted-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="date">Upload Date</option>
                <option value="name">Name</option>
                <option value="confidence">Confidence Score</option>
                <option value="size">File Size</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-body text-muted-foreground">Filter:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Samples</option>
                <option value="high">High Confidence</option>
                <option value="medium">Medium Confidence</option>
                <option value="low">Low Confidence</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSamples.length === samples.length && samples.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border focus:ring-ring"
            />
            <label className="text-sm font-body text-muted-foreground">
              Select All
            </label>
          </div>
        </div>
      </div>

      {/* Sample List */}
      <div className="divide-y divide-border">
        {sortedAndFilteredSamples.map((sample) => {
          const confidenceBadge = getConfidenceBadge(sample.confidenceScore);
          
          return (
            <div key={sample.id} className="p-6 hover:bg-muted/30 transition-colors duration-150">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedSamples.includes(sample.id)}
                  onChange={() => handleSelectSample(sample.id)}
                  className="rounded border-border focus:ring-ring"
                />

                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getFileIcon(sample.type)} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-body font-medium text-foreground truncate">
                      {sample.name}
                    </h3>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${confidenceBadge.color}`}>
                        {confidenceBadge.label} Confidence
                      </span>
                      
                      <span className={`text-lg font-body font-semibold ${getConfidenceColor(sample.confidenceScore)}`}>
                        {sample.confidenceScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        {format(new Date(sample.uploadDate), 'MMM dd, yyyy')}
                      </span>
                      <span>•</span>
                      <span>{formatFileSize(sample.size)}</span>
                      {sample.wordCount && (
                        <>
                          <span>•</span>
                          <span>{sample.wordCount.toLocaleString()} words</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onReanalyzeSample(sample.id)}
                        disabled={isProcessing}
                        iconName="RefreshCw"
                        iconPosition="left"
                      >
                        Re-analyze
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSample(sample.id)}
                        disabled={isProcessing}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {sample.analysisPreview && (
                <div className="mt-4 ml-14 p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-body font-medium text-foreground mb-2">
                    Analysis Preview
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {sample.analysisPreview}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {sortedAndFilteredSamples.length === 0 && samples.length > 0 && (
        <div className="p-8 text-center">
          <Icon name="Filter" size={32} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            No samples match your filter
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filter criteria to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default SampleLibrary;