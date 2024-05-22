import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase';
import { IonButton, IonIcon, IonCard, IonCardContent, IonMenu, IonMenuButton,  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuToggle, IonText } from '@ionic/react';
import { personCircleOutline, logOutOutline, menuOutline, exit, close, cog, cogSharp, settings, list, clipboard, clipboardOutline, calendarClear, calendarOutline } from 'ionicons/icons';
import Copyright from './CopyrightText';

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

    const handleSignIn = async () => {
      window.location.href = '/signin';
    }
  
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
          <IonButton fill='clear' expand='block' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleSignIn}>
            <IonIcon slot='start' icon={calendarOutline} style={{ marginRight: '10px' }} />
            <IonText>Meeting Sign In</IonText>
          </IonButton>
          <IonButton fill='clear' expand='block' onClick={handleLogout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IonIcon slot='start' icon={logOutOutline} style={{ marginRight: '10px' }} />
            <IonText>Logout</IonText>
          </IonButton>
          <Copyright />
        </IonContent>
      </IonMenu>
      
      {/* Page Toolbar */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
      </>
    );
};

export default TopMenu;
