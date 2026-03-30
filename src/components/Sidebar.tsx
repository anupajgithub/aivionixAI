import {
  LayoutDashboard,
  Sparkles,
  GitBranch,
  Database,
  Code2,
  MessageSquare,
  Search,
  Server,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ToolType } from '../types';

interface NavItem {
  id: ToolType;
  label: string;
  icon: React.ElementType;
  description: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics',
  },
  {
    id: 'ai-planner',
    label: 'AI Planner',
    icon: Sparkles,
    description: 'SRS Generator',
  },
  {
    id: 'flowchart',
    label: 'Flowchart',
    icon: GitBranch,
    description: 'Visual Flow Designer',
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    description: 'Schema Designer',
  },
  {
    id: 'api-builder',
    label: 'API Builder',
    icon: Code2,
    description: 'Endpoint Manager',
  },
  {
    id: 'assistant',
    label: 'AI Assistant',
    icon: MessageSquare,
    description: 'Chat Helper',
  },
  {
    id: 'rag-search',
    label: 'RAG Search',
    icon: Search,
    description: 'Semantic Search',
  },
  {
    id: 'mcp-server',
    label: 'MCP Server',
    icon: Server,
    description: 'Tool Interface',
  },
];

export function Sidebar() {
  const { activeTool, setActiveTool, sidebarCollapsed, setSidebarCollapsed } = useApp();

  return (
    <div
      className={`bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="p-6 border-b border-slate-700 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
               AJ  RAG
            </h1>
            <p className="text-slate-400 text-xs mt-1">AI Dev Platform</p>
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTool === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={`text-xs ${isActive ? 'text-cyan-100' : 'text-slate-400'}`}>
                    {item.description}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        {!sidebarCollapsed && (
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">System Status</span>
            </div>
            <p className="text-xs text-slate-400">All services operational</p>
          </div>
        )}
      </div>
    </div>
  );
}
