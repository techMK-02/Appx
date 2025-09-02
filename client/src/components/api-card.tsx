import { useState } from "react";
import type { ApiApp } from "@shared/schema";

interface ApiCardProps {
  app: ApiApp;
  searchQuery: string;
}

export function ApiCard({ app, searchQuery }: ApiCardProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const highlightSearchTerm = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(app.api);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = app.api;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const openApi = () => {
    window.open(app.api, '_blank');
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-2xl transition-all duration-300 hover:border-primary/50 hover:transform hover:scale-[1.02] backdrop-blur-sm"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(250,250,255,0.95) 100%)',
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.1)'
      }}
      data-testid={`card-app-${app.id}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2 rounded-lg mr-3 shadow-md">
              <i className="fas fa-mobile-alt text-purple-600 text-base"></i>
            </div>
            <div>
              <h3 
                className="font-semibold text-base text-foreground leading-tight"
                data-testid={`text-app-name-${app.id}`}
              >
                {highlightSearchTerm(app.name)}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-3">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">API Endpoint</label>
            <div className="bg-muted p-2 rounded-md border">
              <code 
                className="text-xs font-mono text-foreground break-all"
                data-testid={`text-api-url-${app.id}`}
              >
                {app.api}
              </code>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-border">
          <button 
            onClick={copyToClipboard}
            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold border-0 ${
              copySuccess 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/50' 
                : 'gradient-button text-white'
            }`}
            data-testid={`button-copy-${app.id}`}
          >
            <i className={`${copySuccess ? 'fas fa-check' : 'fas fa-copy'} mr-2`}></i>
            {copySuccess ? 'Copied!' : 'Copy API'}
          </button>
          <button 
            onClick={openApi}
            className="secondary-button text-white px-4 py-2 rounded-lg text-xs font-semibold border-0"
            data-testid={`button-open-${app.id}`}
          >
            <i className="fas fa-external-link-alt mr-1"></i>
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
