import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonText,
  IonLoading,
} from '@ionic/react';
import { logOutOutline, close, calendarOutline, shieldHalf, home } from 'ionicons/icons';
import Copyright from './CopyrightText';
import { adminAuth, auth } from '../util/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const TopMenu: React.FC = () => {
  const [success, setSuccess] = useState(false);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton>
                <IonIcon icon={close} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="full"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => window.location.href = '/'}
              slot='start'
            >
              <IonIcon slot="start" icon={home} style={{ marginRight: '10px' }} />
              <IonText>Home</IonText>
            </IonButton>
          </IonButtons>
          {adminUser && (
            <IonButtons className='top-menu-button'>
              <IonButton
                fill="clear"
                expand="block"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => window.location.href = '/admin'}
              >
                <IonIcon slot="start" icon={shieldHalf} style={{ marginRight: '10px' }} />
                <IonText>Admin Portal</IonText>
              </IonButton>
            </IonButtons>
          )}
          <IonButtons className='top-menu-button'>
            <IonButton
              fill="clear"
              expand="block"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => window.location.href = '/calendar'}
            >
              <IonIcon slot="start" icon={calendarOutline} style={{ marginRight: '10px' }} />
              <IonText>Set up Meeting</IonText>
            </IonButton>
          </IonButtons>
          <IonButtons className='top-menu-button'>
            <IonButton
              id='open-loading'
              fill="clear"
              expand="block"
              onClick={handleLogout}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <IonIcon slot="start" icon={logOutOutline} style={{ marginRight: '10px' }} />
              <IonText>Sign Out</IonText>
            </IonButton>
          </IonButtons>
          <IonLoading className='custom-loading' trigger='open-loading' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Logging Out' duration={2000} />
          <Copyright />
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent />
      </IonPage>
    </>
  );
};

export default TopMenu;
