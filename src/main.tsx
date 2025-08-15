import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif; color: #dc2626;">
      <h1>Application Error</h1>
      <p>Failed to load the application. Please refresh the page.</p>
      <p style="font-size: 14px; color: #666; margin-top: 20px;">Error: ${error}</p>
    </div>
  `;
}
