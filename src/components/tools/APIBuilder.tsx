import { useState } from 'react';
import { Code2, Play, FileJson, Sparkles } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { APIEndpoint } from '../../types';

export function APIBuilder() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [endpoints, setEndpoints] = useState<APIEndpoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'from-blue-500 to-cyan-500',
      POST: 'from-emerald-500 to-green-500',
      PUT: 'from-amber-500 to-orange-500',
      DELETE: 'from-red-500 to-rose-500',
      PATCH: 'from-purple-500 to-pink-500',
    };
    return colors[method as keyof typeof colors] || 'from-slate-500 to-slate-600';
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await aiService.generateAPIEndpoints(description);
      setEndpoints(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate API endpoints");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
            <Code2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">API Builder</h1>
            <p className="text-slate-400">Design, test, and manage API endpoints</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <label className="block text-slate-300 font-medium mb-3">API Requirements</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your API requirements... (e.g., 'A set of REST endpoints for user authentication and profile management')"
          className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !description}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating APIs...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate API Endpoints
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {endpoints && (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-6">Generated Endpoints</h2>
          <div className="grid grid-cols-1 gap-4">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-4 py-2 bg-gradient-to-r ${getMethodColor(
                        endpoint.method
                      )} text-white font-bold rounded-lg text-sm`}
                    >
                      {endpoint.method}
                    </div>
                    <div>
                      <code className="text-cyan-400 font-mono text-lg">{endpoint.path}</code>
                      <p className="text-slate-400 text-sm mt-1">{endpoint.description}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                    <Play size={16} />
                    Test
                  </button>
                </div>

                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {endpoint.parameters.map((param, index) => (
                        <div
                          key={index}
                          className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{param.name}</span>
                            {param.required && (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                                required
                              </span>
                            )}
                          </div>
                          <span className="text-slate-400 text-sm font-mono">{param.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    <FileJson size={16} />
                    Response Schema
                  </h4>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <pre className="text-emerald-400 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {typeof endpoint.response === 'string' ? endpoint.response : JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
