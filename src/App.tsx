import { IonApp, IonToolbar, IonTabs, IonRouterOutlet, IonTabBar, IonHeader, IonContent, IonButtons, IonIcon, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './util/firebase'; // Ensure correct path
import TopMenu from './components/TopMenu';
import HomePage from './pages/Home';
import SplashScreen from '@capacitor/splash-screen';
import { useMediaQuery } from 'react-responsive';
import { setupIonicReact } from '@ionic/react';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import { adminAuth } from './util/firebase';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SignInPage from './pages/SignIn';
import { logOut, logOutOutline } from 'ionicons/icons';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

setupIonicReact();

const App: React.FC = () => {
  const [authUser, setAuthUser] = useState(false);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
        if (adminAuth.includes(user.uid)) {
          setAdminUser(true);
        } else {
          setAdminUser(false);
        }
      } else {
        setAuthUser(false);
        setAdminUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const screenSize = useMediaQuery({
    query: '(min-device-width: 1000px)'
  });

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonButtons slot='end'>
            <IonButton color={'medium'} size='small' onClick={handleSignOut}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='main-content'>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                {authUser ? <HomePage /> : <LoginPage />}
              </Route>
              <Route exact path="/Admin">
                {adminUser ? <AdminPage /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/Admin">
                {adminUser && <AdminPage />}
              </Route>
              <Route exact path="/sign-in">
                <SignInPage />
              </Route>
              <Route exact path="/privacy-policy">
                <PrivacyPolicyPage />
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
      </IonContent>
    </IonApp>
  );
};

export default App;
