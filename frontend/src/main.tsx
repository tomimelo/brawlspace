import React from 'react';
import ReactDOM from 'react-dom/client';

import BrawlSpace from './BrawlSpace';
import './index.css';
import { AppTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <BrawlSpace />
    </AppTheme>
  </React.StrictMode>,
);
