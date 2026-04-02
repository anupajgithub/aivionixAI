import { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/tools/Dashboard';
import { AIPlanner } from './components/tools/AIPlanner';
import { FlowchartGenerator } from './components/tools/FlowchartGenerator';
import { DatabaseDesigner } from './components/tools/DatabaseDesigner';
import { APIBuilder } from './components/tools/APIBuilder';
import { AIAssistant } from './components/tools/AIAssistant';
import { RAGSearch } from './components/tools/RAGSearch';
import { MCPServer } from './components/tools/MCPServer';
import { Login } from './components/Login';

function App() {
  const { activeTool } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderTool = () => {
    switch (activeTool) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-planner':
        return <AIPlanner />;
      case 'flowchart':
        return <FlowchartGenerator />;
      case 'database':
        return <DatabaseDesigner />;
      case 'api-builder':
        return <APIBuilder />;
      case 'assistant':
        return <AIAssistant />;
      case 'rag-search':
        return <RAGSearch />;
      case 'mcp-server':
        return <MCPServer />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden animate-fadeIn">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
        {/* Subtle Dashboard Background Overlay ensuring consistency with login */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        {renderTool()}
      </main>
    </div>
  );
}

export default App;
