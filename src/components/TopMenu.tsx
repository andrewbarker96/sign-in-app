import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase';
import { IonButton, IonIcon, IonCard, IonCardContent, IonMenu, IonMenuButton,  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuToggle, IonText } from '@ionic/react';
import { personCircleOutline, logOutOutline, menuOutline, exit, close, cog, cogSharp } from 'ionicons/icons';

const TopMenu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                // Handle error
                console.error('Error fetching session:', error);
            } else if (data && data.session) {
                // User is logged in
                setIsLoggedIn(true);
            } else {
                // User is not logged in
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, []);

    const handleLogout = async () => {
      let { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Error logging out:', error);
      } else {
        setIsLoggedIn(false); 
        console.log('User logged out successfully');
        window.location.href = '/';
      }
    };

    const copyright = new Date().getFullYear();

  return (
    <>
      {/* Actual Menu */}
      <IonMenu contentId='main-content'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton>
                <IonIcon icon={close} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton fill='clear' expand='block'>
            <IonIcon icon={personCircleOutline} />
            Profile
          </IonButton>
          <IonButton fill='clear' expand='block' onClick={handleLogout}>
            <IonIcon icon={logOutOutline} />
            Logout
          </IonButton>
          <IonButton fill='clear' expand='block'>
            <IonIcon icon={cogSharp} />
            Settings
          </IonButton>
          <IonText className='copyright'>
            Copyright © {copyright}<br/>Stock & Associates Consulting Engineers, Inc. 
          </IonText>
        </IonContent>
      </IonMenu>
      
      {/* Page Toolbar */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
      </>
    );
};

export default TopMenu;
