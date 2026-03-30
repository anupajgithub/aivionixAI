import { createContext, useContext, useState, ReactNode } from 'react';
import { ToolType, Project } from '../types';

interface AppContextType {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTool, setActiveTool] = useState<ToolType>('dashboard');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activeTool,
        setActiveTool,
        currentProject,
        setCurrentProject,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
