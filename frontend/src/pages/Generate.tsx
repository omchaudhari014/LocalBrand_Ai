import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Loader2, Copy, Download, Volume2 } from 'lucide-react';

export default function Generate() {
  const [businessType, setBusinessType] = useState('');
  const [offer, setOffer] = useState('');
  const [language, setLanguage] = useState('English');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ caption: string, audioUrl: string } | null>(null);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await axios.post(`${apiUrl}/api/generate`, {
        businessType,
        offer,
        language
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error generating ad", error);
      alert("Failed to generate ad. Please check if the backend is running and keys are set.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.caption);
      alert("Caption copied to clipboard!");
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Ad</h2>
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Type
              </label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Local Bakery, Chai Stall"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special Offer / Event
              </label>
              <textarea 
                required 
                rows={3}
                placeholder="e.g. 20% off on all items this Diwali"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Hinglish">Hinglish</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Magic...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Ad</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 flex flex-col justify-center min-h-[400px]">
          {!result && !isLoading ? (
            <div className="text-center text-gray-400 dark:text-gray-500 flex flex-col items-center">
              <Volume2 className="w-16 h-16 mb-4 opacity-50" />
              <p>Your generated caption and voice ad will appear here.</p>
            </div>
          ) : isLoading ? (
             <div className="text-center text-blue-500 dark:text-blue-400 flex flex-col items-center">
                <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                <p className="font-medium animate-pulse">Consulting the AI Marketing Guru...</p>
             </div>
          ) : result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Generated Caption</h3>
                <p className="text-xl font-medium text-gray-900 dark:text-white leading-relaxed italic">
                  "{result.caption}"
                </p>
              </div>

              {result.audioUrl && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Voice Ad</span>
                  </h3>
                  <audio controls className="w-full mt-2 custom-audio" src={result.audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <div className="flex space-x-4">
                <button 
                  onClick={handleCopy}
                  className="flex-1 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <a 
                  href={result.audioUrl}
                  download="voice_ad.mp3"
                  className="flex-1 py-3 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Audio</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}

// Ensure Sparkles is imported
function Sparkles(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  )
}
