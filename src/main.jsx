
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WorkflowEngine from './components/WorkflowEngine.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkflowEngine />
  </StrictMode>,
);
