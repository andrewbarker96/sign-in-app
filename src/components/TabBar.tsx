import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase';
import { IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import { home, pencil, people, person} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';


const TabBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('Error fetching session:', error);
          } else if (data && data.session) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        };
        checkSession();
    }, []);

    if (!isLoggedIn) {
        return null;
    }

  return (
      <IonReactRouter>
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
      </IonReactRouter>
    );
};

export default TabBar;
