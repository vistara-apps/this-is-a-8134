import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export function useAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generateRightsCard = async (state, situation, language = 'english') => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = `Generate a concise "Know Your Rights" card for someone in ${state} during a ${situation} with police. 
      
      Include:
      1. 3-4 key rights specific to this situation
      2. Exact phrases to say (polite but firm)
      3. Things to avoid saying
      4. Any state-specific considerations
      
      Language: ${language}
      Format: Clear, mobile-friendly, emergency-appropriate
      Tone: Calm, authoritative, practical
      
      Keep it under 200 words total.`;

      const response = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are a legal rights expert providing accurate, safe guidance for police interactions. Always emphasize de-escalation and safety.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content generated');
      }

      return content;
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError(err.message);
      
      // Fallback content for demo purposes
      return `Know Your Rights in ${state}

Key Rights:
• Right to remain silent
• Right to refuse searches
• Right to record (in public)
• Right to ask "Am I free to leave?"

Say This:
"I'm exercising my right to remain silent. I want to speak to a lawyer. I do not consent to searches."

Avoid Saying:
• "I didn't do anything"
• "This is harassment"
• Arguing or being confrontational

Stay calm, keep hands visible, and comply with lawful orders while asserting your rights clearly.`;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateRightsCard,
    isGenerating,
    error
  };
}