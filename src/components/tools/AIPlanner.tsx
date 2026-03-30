import { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, Download, Copy } from 'lucide-react';
import { mockSRSData } from '../../data/mockData';

export function AIPlanner() {
  const [projectInput, setProjectInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Planner</h1>
          <p className="text-slate-400">Generate comprehensive Software Requirements Specification</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <label className="block text-slate-300 font-medium mb-3">Project Description</label>
        <textarea
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
          placeholder="Describe your project in detail... (e.g., 'Build an e-commerce platform with user authentication, product catalog, shopping cart, and payment processing')"
          className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !projectInput}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating SRS...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate SRS Document
            </>
          )}
        </button>
      </div>

      {showResults && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="text-cyan-400" size={28} />
              Generated SRS Document
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Copy size={18} />
                Copy
              </button>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Download size={18} />
                Export PDF
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Project Overview</h3>
              <h4 className="text-2xl font-bold text-white mb-2">{mockSRSData.projectName}</h4>
              <p className="text-slate-300 leading-relaxed">{mockSRSData.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Functional Requirements</h3>
              <div className="space-y-3">
                {mockSRSData.functionalRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-4">
                    <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Non-Functional Requirements</h3>
              <div className="space-y-3">
                {mockSRSData.nonFunctionalRequirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-4">
                    <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3">System Architecture</h3>
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                <p className="text-slate-300 leading-relaxed">{mockSRSData.systemArchitecture}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-slate-500 text-sm">
                Generated on {new Date(mockSRSData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
