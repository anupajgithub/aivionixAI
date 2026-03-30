import { Server, Activity, Zap, CheckCircle, AlertCircle } from 'lucide-react';

export function MCPServer() {
  const tools = [
    {
      name: 'generate_schema',
      description: 'Generate database schema from natural language description',
      status: 'active',
      calls: 1247,
    },
    {
      name: 'create_api_endpoint',
      description: 'Create RESTful API endpoints with validation',
      status: 'active',
      calls: 892,
    },
    {
      name: 'optimize_query',
      description: 'Analyze and optimize database queries',
      status: 'active',
      calls: 567,
    },
    {
      name: 'generate_tests',
      description: 'Generate unit tests for functions and components',
      status: 'maintenance',
      calls: 423,
    },
  ];

  const serverMetrics = [
    { label: 'Total Requests', value: '3,129', change: '+18%' },
    { label: 'Avg Response Time', value: '87ms', change: '-12%' },
    { label: 'Success Rate', value: '99.7%', change: '+0.3%' },
    { label: 'Active Tools', value: '12', change: '+2' },
  ];

  const recentLogs = [
    { time: '14:23:45', action: 'Tool invoked: generate_schema', status: 'success' },
    { time: '14:23:12', action: 'Tool invoked: create_api_endpoint', status: 'success' },
    { time: '14:22:58', action: 'Tool invoked: optimize_query', status: 'success' },
    { time: '14:22:31', action: 'Tool invoked: generate_tests', status: 'warning' },
    { time: '14:22:15', action: 'MCP Server health check', status: 'success' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
          <Server className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">MCP Server</h1>
          <p className="text-slate-400">Model Context Protocol Interface</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {serverMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6"
          >
            <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-slate-400 text-sm mb-2">{metric.label}</div>
            <div className="text-emerald-400 text-xs font-medium">{metric.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Available Tools</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400 text-sm">Server Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-xl p-5 hover:bg-slate-700/50 transition-all border border-transparent hover:border-emerald-500/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Zap className="text-emerald-400" size={20} />
                  <div>
                    <h3 className="font-bold text-white">{tool.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{tool.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    tool.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {tool.status}
                </span>
                <span className="text-slate-500 text-sm">{tool.calls} calls</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-emerald-400" size={20} />
            <h2 className="text-xl font-bold text-white">System Logs</h2>
          </div>
          <div className="space-y-3">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? (
                    <CheckCircle className="text-emerald-400" size={16} />
                  ) : (
                    <AlertCircle className="text-amber-400" size={16} />
                  )}
                  <span className="text-slate-300 text-sm">{log.action}</span>
                </div>
                <span className="text-slate-500 text-xs">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Configuration</h2>
          <div className="space-y-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Server URL</div>
              <code className="text-cyan-400 font-mono">http://localhost:3001/mcp</code>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Protocol Version</div>
              <code className="text-white font-mono">1.0.0</code>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Max Concurrent Requests</div>
              <code className="text-white font-mono">100</code>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">Timeout</div>
              <code className="text-white font-mono">30s</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
