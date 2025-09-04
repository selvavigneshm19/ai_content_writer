import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import WelcomeScreen from './components/WelcomeScreen';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock AI responses for different commands
  const aiResponses = {
    help: `🤖 **AI Content Assistant Commands:**

**Content Generation:**
• \`/generate [platform] [topic]\` - Generate content for specific platform
• \`/tone [tone]\` - Set writing tone (professional, casual, authoritative, friendly)
• \`/hashtags [topic]\` - Generate relevant hashtags

**Writing Analysis:**
• \`/analyze\` - Analyze your writing style
• \`/style-report\` - Get detailed writing style report
• \`/samples\` - View uploaded writing samples

**Quick Actions:**
• \`/help\` - Show this help menu
• \`/clear\` - Start new conversation
• \`/sessions\` - View chat history

**Examples:**
• "Generate LinkedIn post about leadership" •"Create Instagram caption for product launch" •"Analyze my writing style" •"What's my current writing confidence score?"

Just type naturally! I understand both commands and conversational requests. 🚀`,

    defaultResponse: `I'm your AI Content Assistant! I can help you with:

✨ **Content Generation** - Create engaging posts for any platform
📊 **Writing Analysis** - Understand your unique writing style  
🎯 **Content Strategy** - Get personalized recommendations

Try asking me something like:
• "Create a LinkedIn post about innovation" •"What's my writing style like?"• "Generate hashtags for a tech startup"

Type \`/help\` for detailed commands or just chat naturally with me!`,

    analysisResponse: `📊 **Your Current Writing Style Analysis:**

**Style Profile:** Professional & Authoritative
**Confidence Score:** 87%
**Last Updated:** July 24, 2025

**Key Characteristics:**
• **Tone:** 75% Professional, 25% Conversational
• **Vocabulary:** Strong business terminology (85%)
• **Complexity:** Advanced sentence structure (80%)
• **Engagement:** Moderate to high (65%)

**Recommendations:**
✅ Your authoritative tone works great for thought leadership
✅ Consider adding more conversational elements for social media
✅ Your business vocabulary adds credibility

Would you like me to generate content that matches this style, or help you analyze new writing samples?`,

    samplesResponse: `📁 **Your Writing Samples Library:**

**Recent Samples (5 total):**
1. **Q3 Board Presentation.pdf** (92% confidence)
   - 3,450 words • Professional tone
   
2. **LinkedIn Posts Collection.txt** (78% confidence)
   - 1,250 words • Mixed professional/conversational
   
3. **Email Communications.eml** (85% confidence)
   - 2,100 words • Action-oriented language
   
4. **Industry Article Draft.docx** (95% confidence)
   - 4,200 words • Thought leadership style
   
5. **Manual Text Input** (65% confidence)
   - 890 words • Casual communication

Your writing style model is trained on **11,890 total words** from these samples.

Want to upload more samples to improve accuracy? Or shall I generate content based on your current style profile?`
  };

  // Mock content generation responses
  const contentResponses = {
    linkedin: {
      leadership: `🚀 **LinkedIn Post Generated:**

The future of leadership isn't about having all the answers—it's about asking the right questions and empowering your team to find innovative solutions. In today's rapidly evolving business landscape, the most successful leaders are those who embrace uncertainty as an opportunity for growth. They create environments where experimentation is encouraged, failure is seen as learning, and diverse perspectives are valued.

What questions are you asking your team today?

**Hashtags:** #leadership #innovation #growth #futureofwork #teambuilding

**Style Match:** 92% confidence with your professional tone
**Estimated Engagement:** High (based on your writing patterns)

Would you like me to create variations or generate content for other platforms?`,

      general: `🚀 **LinkedIn Post Generated:**

Success in today's marketplace isn't just about having great products—it's about building authentic relationships and delivering consistent value to your audience.

The companies that thrive are those that listen actively, adapt quickly, and never stop learning from their customers and communities.

What's one lesson your business has learned recently that changed how you operate?

**Hashtags:** #business #entrepreneurship #growth #customerexperience #innovation

**Style Match:** 89% confidence with your professional tone
**Word Count:** 52 words (optimal for LinkedIn)

Need adjustments or want to try a different angle?`
    },

    instagram: {
      general: `📸 **Instagram Caption Generated:**

Behind every successful moment is a story of persistence, learning, and growth. ✨

The journey isn't always perfect, but that's what makes it authentic. Each challenge teaches us something new, each setback becomes a setup for a comeback.

What's one lesson you've learned recently that changed your perspective? 👇

**Hashtags:** #motivation #growth #mindset #journey #authentic #success #learning #inspiration #hustle #entrepreneur

**Style Match:** 78% confidence (adapted for Instagram's casual tone)
**Character Count:** 287 (optimal for Instagram)

Want me to make it more casual or add emoji variations?`
    },

    twitter: {
      general: `🐦 **Twitter Post Generated:**

The best ideas often come from the intersection of different perspectives. 

When we stop assuming we have all the answers and start asking better questions, innovation happens naturally.

What's a question that changed how you think about your work?

**Hashtags:** #innovation #leadership #growth

**Style Match:** 85% confidence 
**Character Count:** 241/280

Ready to tweet or want me to create a thread version?`
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message if no current session
    if (!currentSession && messages.length === 0) {
      const welcomeMessage = {
        id: uuidv4(),
        type: 'ai',
        content: aiResponses.defaultResponse,
        timestamp: new Date(),
        isWelcome: true
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Create or update session
    if (!currentSession) {
      const newSession = {
        id: uuidv4(),
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        timestamp: new Date(),
        messageCount: 1
      };
      setCurrentSession(newSession);
      setChatSessions(prev => [newSession, ...prev]);
    }

    // Simulate AI processing delay
    setTimeout(() => {
      const aiMessage = {
        id: uuidv4(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Update session message count
      if (currentSession) {
        setChatSessions(prev => prev.map(session => 
          session.id === currentSession.id 
            ? { ...session, messageCount: session.messageCount + 2 }
            : session
        ));
      }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Command responses
    if (input.startsWith('/help') || input === 'help') {
      return aiResponses.help;
    }

    if (input.startsWith('/clear')) {
      setTimeout(() => {
        setMessages([]);
        setCurrentSession(null);
      }, 1000);
      return "🔄 Starting fresh! How can I help you today?";
    }

    if (input.startsWith('/analyze') || input.includes('writing style') || input.includes('analyze')) {
      return aiResponses.analysisResponse;
    }

    if (input.startsWith('/samples') || input.includes('samples')) {
      return aiResponses.samplesResponse;
    }

    if (input.startsWith('/sessions')) {
      const sessionsList = chatSessions.length > 0 
        ? chatSessions.map((session, index) => 
            `${index + 1}. **${session.title}** (${session.messageCount} messages)`
          ).join('\n')
        : "No previous sessions found.";
      
      return `📝 **Your Chat Sessions:**\n\n${sessionsList}\n\nSelect a session from the sidebar to continue a previous conversation.`;
    }

    // Content generation responses
    if (input.includes('linkedin') || input.includes('generate linkedin')) {
      if (input.includes('leadership')) {
        return contentResponses.linkedin.leadership;
      }
      return contentResponses.linkedin.general;
    }

    if (input.includes('instagram') || input.includes('generate instagram')) {
      return contentResponses.instagram.general;
    }

    if (input.includes('twitter') || input.includes('generate twitter')) {
      return contentResponses.twitter.general;
    }

    // Content generation with platform detection
    if (input.includes('generate') || input.includes('create') || input.includes('write')) {
      if (input.includes('post') || input.includes('content')) {
        return `🚀 **Content Generated Successfully!**

Here's engaging content tailored to your professional style:

---

*"The most impactful innovations don't just solve problems—they anticipate needs that people didn't even know they had.*

*When we shift from reactive problem-solving to proactive opportunity creation, we unlock entirely new possibilities for growth and value.*

*What opportunity are you creating today that others haven't seen yet?"*

---

**Style Analysis:** 
✅ Matches your authoritative tone (87% confidence)
✅ Incorporates thought-provoking questions (your signature style)
✅ Professional yet engaging language

**Suggested Platforms:** LinkedIn, Twitter, Blog post
**Estimated Engagement:** High

Want me to adapt this for a specific platform or create variations?`;
      }
    }

    // Hashtag generation
    if (input.includes('hashtag')) {
      const topic = input.replace(/.*hashtag.*?for\s+/, '').replace(/.*hashtag\s+/, '') || 'business';
      return `🏷️ **Relevant Hashtags Generated:**

**Primary (High Volume):**
#${topic} #innovation #growth #leadership #success

**Secondary (Medium Volume):**  
#strategy #mindset #entrepreneur #futureofwork #inspiration

**Niche (Targeted):**
#thoughtleadership #businessinsights #professionaldev #industryleader #gamechangers

**Trending (Current):**
#2025trends #digitaltransformation #worklifebalance

**Usage Tips:**
• Use 3-5 primary hashtags for maximum reach
• Mix high-volume and niche tags for better targeting
• Save trending hashtags for timely content

Want hashtags for a different topic or platform-specific recommendations?`;
    }

    // Tone setting
    if (input.includes('tone') || input.includes('style')) {
      return `🎨 **Writing Tone Options:**

**Current Style:** Professional & Authoritative (87% match)

**Available Tones:**
• **Professional** - Formal, business-focused, credible
• **Conversational** - Friendly, approachable, relatable  
• **Authoritative** - Expert, confident, thought-leadership
• **Casual** - Relaxed, personal, social media friendly
• **Inspirational** - Motivating, uplifting, vision-focused

**Style Recommendations:**
✅ Your natural authoritative tone works great for LinkedIn
✅ Try conversational tone for Instagram engagement
✅ Mix professional + inspirational for thought leadership

Tell me which tone you'd like me to use, or ask me to generate content in a specific style!`;
    }

    // General conversational responses
    const responses = [
      `That's an interesting perspective! Based on your writing style, I can help you turn that into compelling content. Would you like me to create a post about this topic?`,
      
      `I see what you mean. Your professional communication style would work great for this. Should I generate some content options for you?`,
      
      `Great question! This sounds like perfect material for thought leadership content. Want me to craft something that matches your authoritative tone?`,
      
      `That's exactly the kind of insight your audience would find valuable. Let me help you package that into engaging content. Which platform are you thinking?`,
      
      `I can definitely help with that! Based on your writing patterns, I'd recommend framing this in your signature question-based style. Sound good?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSession(null);
    setShowSidebar(false);
    
    // Add welcome message
    const welcomeMessage = {
      id: uuidv4(),
      type: 'ai',
      content: aiResponses.defaultResponse,
      timestamp: new Date(),
      isWelcome: true
    };
    setMessages([welcomeMessage]);
  };

  const handleSessionSelect = (session) => {
    // In a real app, you'd load the session messages from storage
    setCurrentSession(session);
    setShowSidebar(false);
    
    // Mock loading session messages
    const mockSessionMessages = [
      {
        id: uuidv4(),
        type: 'user',
        content: session.title,
        timestamp: new Date(session.timestamp)
      },
      {
        id: uuidv4(),
        type: 'ai',
        content: generateAIResponse(session.title),
        timestamp: new Date(session.timestamp.getTime() + 2000)
      }
    ];
    
    setMessages(mockSessionMessages);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Header />
      
      {/* Sidebar */}
      <ChatSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        sessions={chatSessions}
        currentSession={currentSession}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col pt-16">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Chat Header */}
          <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 hover:bg-muted rounded-md transition-colors lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">AI Content Assistant</h2>
                  <p className="text-sm text-muted-foreground">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNewChat}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              New Chat
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {messages.length === 0 ? (
              <WelcomeScreen onSamplePrompt={handleSendMessage} />
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isTyping={isTyping && message === messages[messages.length - 1]}
                  />
                ))}
                
                {isTyping && (
                  <ChatMessage
                    message={{
                      id: 'typing',
                      type: 'ai',
                      content: '',
                      timestamp: new Date()
                    }}
                    isTyping={true}
                  />
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </main>
    </div>
  );
};

export default Chatbot;