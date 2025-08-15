import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Starting application...');

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    console.log('Rendering React app...');
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app rendered successfully');
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
} else {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif; color: #dc2626;">
      <h1>Application Error</h1>
      <p>Root element not found. Please check the HTML structure.</p>
    </div>
  `;
}
