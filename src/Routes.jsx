import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import WritingStyleAnalysis from "pages/writing-style-analysis";
import ContentGenerator from "pages/content-generator";
import Chatbot from "pages/chatbot";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Chatbot />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/writing-style-analysis" element={<WritingStyleAnalysis />} />
        <Route path="/content-generator" element={<ContentGenerator />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;