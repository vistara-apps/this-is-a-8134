import React, { useState } from 'react';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { useAI } from '../hooks/useAI';

export function AIGenerator({ selectedState, isPremium = false, className = '' }) {
  const [situation, setSituation] = useState('');
  const [language, setLanguage] = useState('english');
  const [generatedContent, setGeneratedContent] = useState('');
  const { generateRightsCard, isGenerating, error } = useAI();

  const situations = [
    'traffic stop',
    'street encounter',
    'home visit',
    'public protest',
    'ID check',
    'search request'
  ];

  const handleGenerate = async () => {
    if (!isPremium) {
      alert('AI-powered content generation is a premium feature. Please upgrade to access this functionality.');
      return;
    }

    if (!situation.trim()) {
      alert('Please describe the situation first.');
      return;
    }

    try {
      const content = await generateRightsCard(selectedState, situation, language);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const shareContent = async () => {
    if (!generatedContent) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI-Generated Know Your Rights Card',
          text: generatedContent,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(generatedContent);
      alert('Content copied to clipboard!');
    }
  };

  const downloadContent = () => {
    if (!generatedContent) return;

    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rights-card-${selectedState}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">AI Rights Generator</h3>
        {!isPremium && (
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">Premium</span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Describe your situation:
          </label>
          <div className="space-y-2">
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="e.g., I'm being pulled over for speeding..."
              className={`w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                !isPremium ? 'bg-gray-100 cursor-not-allowed' : 'bg-surface'
              }`}
              rows={3}
              disabled={!isPremium}
            />
            <div className="flex flex-wrap gap-2">
              {situations.map((preset) => (
                <button
                  key={preset}
                  onClick={() => isPremium && setSituation(preset)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    situation === preset
                      ? 'bg-accent text-white border-accent'
                      : isPremium
                      ? 'bg-surface text-text-secondary border-gray-200 hover:border-accent'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                  disabled={!isPremium}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Language:
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                !isPremium ? 'bg-gray-100 cursor-not-allowed' : 'bg-surface'
              }`}
              disabled={!isPremium}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={!isPremium || isGenerating || !situation.trim()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                isPremium && situation.trim() && !isGenerating
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {generatedContent && (
          <div className="bg-accent/10 border border-accent/20 rounded-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-accent">Generated Rights Card</h4>
              <div className="flex space-x-2">
                <button
                  onClick={shareContent}
                  className="p-2 text-accent hover:text-accent/80 transition-colors"
                  title="Share content"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={downloadContent}
                  className="p-2 text-accent hover:text-accent/80 transition-colors"
                  title="Download content"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
              {generatedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}