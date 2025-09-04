import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navigationItems = [
    {
      label: 'AI Chatbot',
      path: '/chatbot',
      icon: 'MessageCircle',
      tooltip: 'Chat with AI assistant for content generation and analysis'
    },
    {
      label: 'Writing Style',
      path: '/writing-style-analysis',
      icon: 'FileText',
      tooltip: 'Upload samples and view your communication patterns'
    },
    {
      label: 'Content Generator',
      path: '/content-generator',
      icon: 'Sparkles',
      tooltip: 'Generate platform-optimized content matching your voice'
    }
  ];

  const handleTabClick = (path) => {
    setActiveTab(path);
    window.location.href = path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                AI Content Assistant
              </h1>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleTabClick(item.path)}
              className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-md font-body font-medium text-sm
                transition-all duration-200 ease-out
                ${activeTab === item.path
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={16} 
                color="currentColor"
              />
              <span className="hidden sm:inline">{item.label}</span>
              
              {/* Active indicator */}
              {activeTab === item.path && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <button
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-150"
            title="Settings"
          >
            <Icon name="Settings" size={20} />
          </button>
          
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;