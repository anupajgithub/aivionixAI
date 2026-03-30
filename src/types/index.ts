export type ToolType =
  | 'dashboard'
  | 'ai-planner'
  | 'flowchart'
  | 'database'
  | 'api-builder'
  | 'assistant'
  | 'rag-search'
  | 'mcp-server';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: 'active' | 'completed' | 'pending';
}

export interface SRSData {
  id: string;
  projectName: string;
  description: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  systemArchitecture: string;
  createdAt: string;
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: { name: string; type: string; required: boolean }[];
  response: string;
}

export interface DatabaseTable {
  id: string;
  name: string;
  columns: { name: string; type: string; nullable: boolean; primaryKey?: boolean }[];
  relations?: { table: string; type: 'one-to-many' | 'many-to-one' | 'many-to-many' }[];
}
