import { useState } from 'react';
import { Database, Link as LinkIcon, Download, Sparkles } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { DatabaseTable } from '../../types';

export function DatabaseDesigner() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tables, setTables] = useState<DatabaseTable[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await aiService.generateDatabaseSchema(description);
      setTables(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate database schema");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
            <Database className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Database Designer</h1>
            <p className="text-slate-400">Design and visualize your database schema</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
        <label className="block text-slate-300 font-medium mb-3">App Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your app to generate a schema... (e.g., 'A simple blog with users, posts, and comments')"
          className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !description}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Schema...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Schema
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {tables && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Database className="text-emerald-400" size={28} />
              Generated Schema
            </h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Download size={18} />
                Export SQL
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="text-emerald-400" size={20} />
                    {table.name}
                  </h3>
                </div>

                <div className="space-y-2 mb-4">
                  {table.columns.map((column: any, index: number) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {column.primaryKey && (
                          <div className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded">
                            PK
                          </div>
                        )}
                        <span className="text-white font-medium">{column.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm">{column.type}</span>
                        {!column.nullable && (
                          <span className="text-red-400 text-xs">NOT NULL</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {table.relations && table.relations.length > 0 && (
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                      <LinkIcon size={16} />
                      Relations
                    </h4>
                    <div className="space-y-2">
                      {table.relations.map((relation: any, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-slate-300 bg-slate-700/20 rounded px-3 py-2"
                        >
                          <span className="text-emerald-400">{relation.type}</span> with{' '}
                          <span className="text-cyan-400 font-medium">{relation.table}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 mt-6">
            <h3 className="text-xl font-bold text-white mb-4">Schema Visualization</h3>
            <div className="bg-slate-900/50 rounded-xl p-6 overflow-x-auto">
              <div className="grid grid-cols-4 gap-4 min-w-max">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4 min-w-48"
                  >
                    <div className="font-bold text-emerald-400 mb-2">{table.name}</div>
                    <div className="space-y-1">
                      {table.columns.slice(0, 4).map((col: any, i: number) => (
                        <div key={i} className="text-xs text-slate-400">
                          {col.primaryKey && '🔑 '}
                          {col.name}
                        </div>
                      ))}
                      {table.columns.length > 4 && (
                        <div className="text-xs text-slate-500">
                          +{table.columns.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
