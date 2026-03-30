import { useState, useEffect } from 'react';
import { GitBranch, Download, Copy, RefreshCw } from 'lucide-react';
import { mockFlowchartCode } from '../../data/mockData';

export function FlowchartGenerator() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      if (window.mermaid) {
        window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mermaidCode && window.mermaid) {
      window.mermaid.run();
    }
  }, [mermaidCode]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setMermaidCode(mockFlowchartCode);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
          <GitBranch className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Flowchart Generator</h1>
          <p className="text-slate-400">Transform descriptions into visual flow diagrams</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <label className="block text-slate-300 font-medium mb-3">Process Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your process or workflow... (e.g., 'User login flow with authentication and error handling')"
          className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !description}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Flowchart...
            </>
          ) : (
            <>
              <GitBranch size={20} />
              Generate Flowchart
            </>
          )}
        </button>
      </div>

      {mermaidCode && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Generated Flowchart</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <RefreshCw size={18} />
                Regenerate
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Copy size={18} />
                Copy Code
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Download size={18} />
                Export PNG
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
            <div className="bg-white rounded-xl p-8 overflow-x-auto">
              <pre className="mermaid">{mermaidCode}</pre>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">Mermaid Code</h3>
            <pre className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-slate-300 text-sm">{mermaidCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
