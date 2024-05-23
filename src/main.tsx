import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoginPage from './pages/Login';
import TopMenu from './components/TopMenu';
import { auth } from './util/firebase'; // Ensure correct path
import { onAuthStateChanged } from 'firebase/auth';

const container = document.getElementById('root');
const root = createRoot(container!);

onAuthStateChanged(auth, (user) => {
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
