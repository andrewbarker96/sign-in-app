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
import { ellipse, home, pencil, person, square, triangle } from 'ionicons/icons';
import SignInPage from './pages/SignIn';
import EmployeesPage from './pages/Employees';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { supabase } from './data/supabase';
import TopMenu from './components/Menus/TopMenu';


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

const App: React.FC = () => (
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
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/login">
                        <IonIcon aria-hidden="true" icon={home} />
                        <IonLabel>Login</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/signin">
                        <IonIcon aria-hidden="true" icon={pencil} />
                        <IonLabel>Sign In</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/employees">
                        <IonIcon aria-hidden="true" icon={person} />
                        <IonLabel>Employees</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab4" href="/tab3">
                        <IonIcon aria-hidden="true" icon={square} />
                        <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
