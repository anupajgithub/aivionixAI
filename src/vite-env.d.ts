/// <reference types="vite/client" />

interface Window {
  mermaid?: {
    initialize: (config: unknown) => void;
    run: () => Promise<void>;
  };
}
