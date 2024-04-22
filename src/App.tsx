import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, pencil, people, person, square } from 'ionicons/icons';
import SignInPage from './pages/SignIn';
import EmployeesPage from './pages/Employees';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ContactsPage from './pages/Contacts';
import TopMenu from './components/Menus/TopMenu';
import { SplashScreen } from '@capacitor/splash-screen';
import { useEffect } from 'react';

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

  return (
    <IonApp>
      <IonReactRouter>
        <IonToolbar>
          <TopMenu />
        </IonToolbar>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/signin">
              <SignInPage />
            </Route>
            <Route path="/employees">
              <EmployeesPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path='/contacts'>
              <ContactsPage />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" style={{paddingRight:'2.5%', paddingLeft:'2.5%'}}>
            <IonTabButton tab="tab1" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/signin">
              <IonIcon aria-hidden="true" icon={pencil} />
              <IonLabel>Meeting Sign In</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/employees">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Stock Employees</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/contacts">
              <IonIcon aria-hidden="true" icon={people} />
              <IonLabel>Stock Contacts</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
