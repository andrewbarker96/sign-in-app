import { IonApp, IonToolbar, IonTabs, IonRouterOutlet, IonTabBar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './util/firebase'; // Ensure correct path
import TopMenu from './components/TopMenu';
import MeetingSignIn from './pages/SignIn';
import HomePage from './pages/Home';
import SplashScreen from '@capacitor/splash-screen';
import { useMediaQuery } from 'react-responsive';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/Login';

setupIonicReact();

const App: React.FC = () => {
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });
    

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const screenSize = useMediaQuery({
    query: '(min-device-width: 1000px)'
  });

  return (
    <IonApp>
      <IonToolbar>
        <TopMenu />
      </IonToolbar>
      <IonReactRouter>
        <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            {authUser ? <HomePage /> : <LoginPage />}
          </Route>
          <Route exact path="/signin">
            <MeetingSignIn />
          </Route>
        </IonRouterOutlet>
            <IonTabBar slot={'bottom'}>
            {/* <IonTabButton tab="tab1" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/signin">
              <IonIcon aria-hidden="true" icon={pencil} />
              <IonLabel>Sign In</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/employees">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Personnel</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/contacts">
              <IonIcon aria-hidden="true" icon={people} />
              <IonLabel>Contacts</IonLabel>
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

