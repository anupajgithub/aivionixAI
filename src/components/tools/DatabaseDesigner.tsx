import { Database, Plus, Link as LinkIcon, Download } from 'lucide-react';
import { mockDatabaseTables } from '../../data/mockData';

export function DatabaseDesigner() {
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
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2">
          <Plus size={20} />
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockDatabaseTables.map((table) => (
          <div
            key={table.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="text-emerald-400" size={20} />
                {table.name}
              </h3>
              <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                Edit
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {table.columns.map((column, index) => (
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
                  {table.relations.map((relation, index) => (
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

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Schema Visualization</h3>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Download size={18} />
            Export SQL
          </button>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-6 overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 min-w-max">
            {mockDatabaseTables.map((table) => (
              <div
                key={table.id}
                className="bg-slate-800 border border-emerald-500/30 rounded-lg p-4 min-w-48"
              >
                <div className="font-bold text-emerald-400 mb-2">{table.name}</div>
                <div className="space-y-1">
                  {table.columns.slice(0, 4).map((col, i) => (
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
  );
}
