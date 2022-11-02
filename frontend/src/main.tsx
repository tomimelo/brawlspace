import React from 'react';
import ReactDOM from 'react-dom/client';

import Layout from './app/layout/Layout';
import BrawlSpace from './BrawlSpace';
import './index.css';
import { AppTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <Layout>
        <BrawlSpace />
      </Layout>
    </AppTheme>
  </React.StrictMode>,
);
