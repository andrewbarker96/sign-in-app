import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/Login';
import TopMenu from './components/TopMenu';
import { auth } from './util/firebase'; // Ensure correct path
import { onAuthStateChanged } from 'firebase/auth';

const container = document.getElementById('root');
const root = createRoot(container!);

onAuthStateChanged(auth, (user) => {
  root.render(
    <React.StrictMode>
      <Router>
        <TopMenu />
        <Route exact path="/">
          {user ? <App /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!user ? <LoginPage /> : <Redirect to="/" />}
        </Route>
      </Router>
    </React.StrictMode>
  );
});