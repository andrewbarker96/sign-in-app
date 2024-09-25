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
import { logOutOutline, close, calendarOutline, shieldHalf, home, personAdd, logOut, exit, qrCode } from 'ionicons/icons';
import { Copyright } from './CopyrightText';
import { adminAuth, auth } from '../../util/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { TopMenuButton } from '../TopMenuButton';
import { useHistory } from 'react-router';

const TopMenu: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [authUser, setAuthUser] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const history = useHistory();

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
      history.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      <IonMenu contentId="main" swipeGesture={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color={'medium'}>
              <IonIcon icon={close} />
            </IonMenuButton>
          </IonButtons>
          <IonTitle>Stock & Associates</IonTitle>
        </IonToolbar>

        <IonContent className="ion-padding">
          <TopMenuButton icon={home} text='Meeting Sign In' routerLink='/home' />
          <TopMenuButton icon={shieldHalf} text='Admin Portal' routerLink='/admin' />
          <TopMenuButton icon={qrCode} text='QR Sign In' routerLink='/qr' />
          <TopMenuButton icon={close} color='danger' text='Log Out Application' onClick={handleLogout} />
          <IonLoading className='custom-loading' trigger='open-loading' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Logging Out' duration={2000} />
          <Copyright />
        </IonContent>
      </IonMenu>


      <IonButtons slot="start" id='main-content'>
        <IonMenuButton color={'medium'} />
      </IonButtons>
    </>
  );
};

export default TopMenu;
