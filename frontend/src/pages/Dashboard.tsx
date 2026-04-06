
import { useNavigate } from 'react-router-dom';
import { Sparkles, History, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LocalBrandAI</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Scale your local business with AI-generated marketing copy and high-quality voice ads, all in a few clicks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Sparkles size={120} />
          </div>
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Create New Ad</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Generate catching captions and voiceovers for your next big offer or local promotion.
          </p>
          <button 
            onClick={() => navigate('/generate')}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300"
          >
            <span>Start Generating</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden opacity-80">
          <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">History (Coming Soon)</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Review your previously generated marketing content and re-download voice ads.
          </p>
          <button className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 font-semibold cursor-not-allowed">
            <span>View History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
