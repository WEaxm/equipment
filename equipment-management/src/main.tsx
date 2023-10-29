import '@unocss/reset/tailwind-compat.css';
import { App as AntdApp } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AntdApp>
      <App />
    </AntdApp>
  </React.StrictMode>,
);
