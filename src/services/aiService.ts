import { GoogleGenerativeAI } from '@google/generative-ai';
import { SRSData, DatabaseTable, APIEndpoint } from '../types';

const getAPIKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

let genAI: GoogleGenerativeAI | null = null;
const getModel = () => {
  if (!genAI) {
    const key = getAPIKey();
    if (!key) throw new Error("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
    genAI = new GoogleGenerativeAI(key);
  }
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const aiService = {
  async generateSRS(projectDescription: string): Promise<SRSData> {
    const model = getModel();
    const prompt = `
      You are an expert Software Architect. Generate a complete Software Requirements Specification (SRS) for the following project description.
      Project: ${projectDescription}
      
      Respond ONLY with a valid JSON file containing the following structure:
      {
        "projectName": "Name of the project",
        "description": "A comprehensive paragraph describing the system",
        "functionalRequirements": ["req 1", "req 2", ...],
        "nonFunctionalRequirements": ["req 1", "req 2", ...],
        "systemArchitecture": "A paragraph describing the architecture"
      }
    `;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);
    
    return {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...parsed
    };
  },
  
  async generateFlowchart(prompt: string): Promise<string> {
    const model = getModel();
    const fullPrompt = `
      You are an expert systems designer. Generate a Mermaid.js flowchart based on the following request:
      "${prompt}"
      
      CRITICAL INSTRUCTIONS:
      1. Output ONLY valid Mermaid.js syntax.
      2. Start with "graph TD" or "graph LR".
      3. Escape special characters. If a node label contains parentheses, brackets, or punctuation, you MUST enclose the label in double quotes. Example: A["Login (User)"] --> B["Success!"]
      4. Return ONLY the mermaid code, without any extra explanation or text.
    `;
    
    const result = await model.generateContent(fullPrompt);
    let text = result.response.text().trim();
    
    // Extract code block if wrapped in markdown
    const codeBlockMatch = text.match(/```(?:mermaid)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      text = codeBlockMatch[1];
    }
    
    // Fallback cleanup
    text = text.replace(/^```mermaid\s*/i, '').replace(/^```\w*\s*/, '').replace(/```$/, '').trim();
    
    return text;
  },

  async generateDatabaseSchema(prompt: string): Promise<DatabaseTable[]> {
    const model = getModel();
    const fullPrompt = `
      You are a Database expert. Generate a database schema for the following app idea:
      "${prompt}"

      Respond ONLY with a valid JSON array of table objects matching this schema exactly:
      [
        {
          "name": "table_name",
          "columns": [
            { "name": "column_name", "type": "VARCHAR(255)", "nullable": false, "primaryKey": true }
          ],
          "relations": [
            { "table": "other_table", "type": "one-to-many" }
          ]
        }
      ]
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }]}],
      generationConfig: { responseMimeType: "application/json" }
    });

    const parsed = JSON.parse(result.response.text());
    
    return parsed.map((table: DatabaseTable, index: number) => ({
      ...table,
      id: (Date.now() + index).toString(),
    }));
  },

  async generateAPIEndpoints(prompt: string): Promise<APIEndpoint[]> {
    const model = getModel();
    const fullPrompt = `
      You are an API Designer. Generate a list of RESTful API endpoints for the following feature/app:
      "${prompt}"

      Respond ONLY with a valid JSON array of endpoint objects matching this exact schema. DO NOT include ids:
      [
        {
          "method": "GET",
          "path": "/api/v1/...",
          "description": "Description of the endpoint",
          "parameters": [
            { "name": "param_name", "type": "string", "required": true }
          ],
          "response": "{ \\"success\\": true }"
        }
      ]
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }]}],
      generationConfig: { responseMimeType: "application/json" }
    });

    const parsed = JSON.parse(result.response.text());
    return parsed.map((ep: APIEndpoint, index: number) => ({
      ...ep,
      id: (Date.now() + index).toString(),
    }));
  },

  async chat(messages: { role: 'user' | 'assistant', content: string }[], newMessage: string): Promise<string> {
    const model = getModel();
    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    
    const chatSession = model.startChat({ history });
    const result = await chatSession.sendMessage(newMessage);
    return result.response.text();
  }
};
