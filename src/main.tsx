import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoginPage from './pages/Login';
import TopMenu from './components/TopMenu';
import { auth } from './util/firebase'; // Ensure correct path
import { onAuthStateChanged } from 'firebase/auth';
import { IonApp } from '@ionic/react';

const container = document.getElementById('root');
const root = createRoot(container!);

onAuthStateChanged(auth, (user) => {
  if (user) {
    root.render(
      <IonApp>
        <TopMenu />
        <App />
      </IonApp>
    );
  } else {
    root.render(
      <IonApp>
        <LoginPage />
      </IonApp>
    );
  }
});
