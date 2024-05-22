import React from 'react';
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
} from '@ionic/react';
import { logOutOutline, close, calendarOutline } from 'ionicons/icons';
import Copyright from './CopyrightText';
import { auth } from '../util/firebase';
import { signOut } from 'firebase/auth';
import { IonLoading } from '@ionic/react';
import { useState } from 'react';


const TopMenu: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const handleSignIn = async () => {
    window.location.href = '/signin';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
          <IonButton
            fill="clear"
            expand="block"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleSignIn}
          >
            <IonIcon slot="start" icon={calendarOutline} style={{ marginRight: '10px' }} />
            <IonText>Meeting Sign In</IonText>
          </IonButton>
          <IonButton
            id='open-loading'
            fill="clear"
            expand="block"
            onClick={handleLogout}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <IonIcon slot="start" icon={logOutOutline} style={{ marginRight: '10px' }} />
            <IonText>Logout</IonText>
          </IonButton>
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
