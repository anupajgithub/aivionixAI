import { TrendingUp, Users, Zap, Database, Clock, CheckCircle } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function Dashboard() {
  const { setActiveTool, setCurrentProject } = useApp();

  const stats = [
    {
      label: 'Active Projects',
      value: '12',
      change: '+3 this week',
      icon: Database,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'API Endpoints',
      value: '247',
      change: '+18 new',
      icon: Zap,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      label: 'Total Users',
      value: '1,842',
      change: '+12% growth',
      icon: Users,
      color: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Response Time',
      value: '124ms',
      change: '-23% faster',
      icon: Clock,
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const recentActivity = [
    { action: 'Generated SRS for E-Commerce Platform', time: '2 hours ago', status: 'completed' },
    { action: 'Created API endpoints for Payment Service', time: '4 hours ago', status: 'completed' },
    { action: 'Updated database schema for Users table', time: '6 hours ago', status: 'completed' },
    { action: 'AI Assistant helped debug authentication', time: '8 hours ago', status: 'completed' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Aivionix</h1>
        <p className="text-slate-400">Your AI-powered development platform dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                  <Icon className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={24} />
                </div>
                <TrendingUp className="text-emerald-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
              <div className="text-emerald-400 text-xs font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Projects</h2>
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-700/30 rounded-xl p-4 hover:bg-slate-700/50 transition-all cursor-pointer border border-transparent hover:border-cyan-500/30"
                onClick={() => {
                  setCurrentProject(project);
                  setActiveTool('ai-planner');
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : project.status === 'completed'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{project.description}</p>
                <div className="text-slate-500 text-xs">Created {project.createdAt}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle className="text-emerald-400" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm">{activity.action}</p>
                  <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => setActiveTool('ai-planner')}
          className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-left hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-white font-bold text-lg mb-2">Generate SRS</h3>
          <p className="text-cyan-100 text-sm">Create comprehensive system requirements</p>
        </button>

        <button
          onClick={() => setActiveTool('api-builder')}
          className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-left hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-white font-bold text-lg mb-2">Build APIs</h3>
          <p className="text-blue-100 text-sm">Design and manage API endpoints</p>
        </button>

        <button
          onClick={() => setActiveTool('assistant')}
          className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-6 text-left hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-white font-bold text-lg mb-2">AI Assistant</h3>
          <p className="text-violet-100 text-sm">Get help from your AI coding partner</p>
        </button>
      </div>
    </div>
  );
}
