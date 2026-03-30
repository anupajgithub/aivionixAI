import { useState } from 'react';
import { Search, FileText, Code, Database, Zap, TrendingUp } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'documentation' | 'code' | 'api' | 'database';
  relevance: number;
  source: string;
}

export function RAGSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'User Authentication Flow',
      content:
        'Implementation of JWT-based authentication with refresh tokens. Includes middleware for protected routes and token validation logic.',
      type: 'documentation',
      relevance: 98,
      source: 'docs/authentication.md',
    },
    {
      id: '2',
      title: 'auth.controller.ts',
      content:
        'export const loginUser = async (req, res) => { const { email, password } = req.body; const user = await User.findOne({ email }); if (!user) return res.status(401).json({ error: "Invalid credentials" });',
      type: 'code',
      relevance: 95,
      source: 'src/controllers/auth.controller.ts',
    },
    {
      id: '3',
      title: 'POST /api/auth/login',
      content:
        'Authenticates user with email and password. Returns JWT token and user profile. Requires: email (string), password (string)',
      type: 'api',
      relevance: 92,
      source: 'API Endpoints',
    },
    {
      id: '4',
      title: 'users table schema',
      content:
        'Table: users | Columns: id (UUID), email (VARCHAR), password_hash (VARCHAR), created_at (TIMESTAMP) | Relations: one-to-many with sessions',
      type: 'database',
      relevance: 88,
      source: 'Database Schema',
    },
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation':
        return FileText;
      case 'code':
        return Code;
      case 'api':
        return Zap;
      case 'database':
        return Database;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'documentation':
        return 'from-blue-500 to-cyan-500';
      case 'code':
        return 'from-emerald-500 to-teal-500';
      case 'api':
        return 'from-violet-500 to-purple-500';
      case 'database':
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
          <Search className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">RAG Search</h1>
          <p className="text-slate-400">Semantic search across your entire codebase</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for code, documentation, APIs, database schemas..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
            All Types
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
            Documentation
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
            Code
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
            API Endpoints
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
            Database
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Found {results.length} results for "{query}"
            </h2>
            <div className="text-slate-400 text-sm">Sorted by relevance</div>
          </div>

          {results.map((result) => {
            const Icon = getTypeIcon(result.type);
            return (
              <div
                key={result.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${getTypeColor(result.type)} rounded-xl flex-shrink-0`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{result.title}</h3>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-emerald-400" size={16} />
                        <span className="text-emerald-400 font-semibold">{result.relevance}%</span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-3 leading-relaxed">{result.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500">{result.source}</span>
                      <span className={`px-2 py-1 bg-gradient-to-r ${getTypeColor(result.type)} bg-opacity-20 text-white rounded`}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && !isSearching && (
        <div className="bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center">
          <Search className="text-slate-600 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-400 mb-2">Start searching</h3>
          <p className="text-slate-500">
            Use semantic search to find anything in your codebase
          </p>
        </div>
      )}
    </div>
  );
}
