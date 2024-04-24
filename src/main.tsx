import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoginPage from './pages/Login';
import { supabase } from './util/supabase';
import TopMenu from './components/TopMenu';

const container = document.getElementById('root');
const root = createRoot(container!);

supabase.auth.getSession().then((response) => {
  const { user } = response.data.session || {};
  if (user) {
    root.render(
      <React.StrictMode>
        <TopMenu />
        <App />
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <LoginPage />
      </React.StrictMode>
    );
  }
});
