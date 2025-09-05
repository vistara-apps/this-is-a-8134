import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Share2 } from 'lucide-react';

export function RightsCard({ stateLaw, language, onLanguageChange, expanded = false, className = '' }) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  if (!stateLaw) {
    return (
      <div className={`card animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const script = language === 'spanish' ? stateLaw.scriptSpanish : stateLaw.scriptEnglish;

  const shareRights = async () => {
    const shareText = `Know Your Rights in ${stateLaw.state}\n\n${stateLaw.rightsSummary}\n\nKey Script: ${script}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Know Your Rights - ${stateLaw.state}`,
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Rights information copied to clipboard!');
    }
  };

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Your Rights in {stateLaw.state}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLanguageChange(language === 'english' ? 'spanish' : 'english')}
            className="p-2 text-text-secondary hover:text-accent transition-colors"
            title={`Switch to ${language === 'english' ? 'Spanish' : 'English'}`}
          >
            <Globe className="h-4 w-4" />
          </button>
          <button
            onClick={shareRights}
            className="p-2 text-text-secondary hover:text-accent transition-colors"
            title="Share rights information"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {stateLaw.rightsSummary}
          </p>
        </div>

        <div className="bg-accent/10 p-3 rounded-md">
          <h4 className="font-medium text-accent mb-2 text-sm">
            {language === 'spanish' ? 'Script Recomendado:' : 'Recommended Script:'}
          </h4>
          <p className="text-sm text-text-primary leading-relaxed font-medium">
            "{script}"
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-sm text-accent hover:text-accent/80 transition-colors"
        >
          <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {isExpanded && (
          <div className="space-y-4 pt-2 animate-slide-up">
            <div>
              <h4 className="font-medium text-text-primary mb-2 text-sm">
                {language === 'spanish' ? '✅ QUÉ DECIR:' : '✅ WHAT TO SAY:'}
              </h4>
              <ul className="space-y-1">
                {stateLaw.doSay.map((item, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-start space-x-2">
                    <span className="text-accent mt-1">•</span>
                    <span>"{item}"</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-2 text-sm">
                {language === 'spanish' ? '❌ QUÉ NO DECIR:' : '❌ WHAT NOT TO SAY:'}
              </h4>
              <ul className="space-y-1">
                {stateLaw.dontSay.map((item, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>"{item}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}