import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, setupIonicReact, IonToolbar, IonTitle, IonHeader, IonImg, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, pencil, people, person, square } from 'ionicons/icons';
import SignInPage from './pages/SignIn';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import TopMenu from './components/TopMenu';
import { SplashScreen } from '@capacitor/splash-screen';
import { useEffect } from 'react';
import useMediaQuery from 'react-responsive';

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

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });
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
            <Route exact path="/signin">
              <SignInPage />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/">
            </Route>  
            <Route exact path="/">
              <LoginPage />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
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
