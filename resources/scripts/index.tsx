import React from 'react';
import App from '@/components/App';
import { createRoot } from 'react-dom/client';

// Enable language support.
import './i18n';

createRoot(document.getElementById('app')!).render(<App />);
