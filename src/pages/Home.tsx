import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonButtons, IonCol, IonRow, IonGrid, IonItem, IonAlert, IonSelect, IonRouterLink } from '@ionic/react';
import SignInForm from './SignIn';
import { useState } from 'react';
import './Home.css'
import { close, logOut, logOutOutline } from 'ionicons/icons';
import { set } from 'lodash';
import SignOut from '../components/Forms/SignoutForm';
import TopMenu from '../components/TopMenu';
import { signOut } from 'firebase/auth';
import { auth } from '../util/firebase';

const HomePage: React.FC = () => {

  const date = new Date();
  const [signOutModal, setSignOutModal] = useState(false);

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  const handleLogout = async () => {
    try {
      <IonAlert>
        <IonText>Are you sure you want to sign out?</IonText>
        <IonSelect>
          <IonButton onClick={() => setSignOutModal(false)}>Cancel</IonButton>
          <IonButton onClick={() => signOut(auth)}>Sign Out</IonButton>
        </IonSelect>
      </IonAlert>
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Stock & Associates</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px', marginTop: '5%' }} />

      <IonContent className='ion-padding ion-text-center'>
        <div className="form">
          <IonButton shape='round' routerLink='/sign-in' color={'primary'} expand='block'>Guest Sign In</IonButton>
          <IonButton id='openSignOutModal' fill='outline' shape='round' color={'primary'} expand="block" onClick={() => setSignOutModal(true)} >Guest Sign Out</IonButton>
          <IonButton fill='clear' expand='block' color={'medium'} routerLink='/privacy-policy'><p>Privacy Policy</p></IonButton>
        </div>
      </IonContent>

      {/* Sign Out Modal */}
      <IonModal trigger='openSignOutModal' canDismiss={canDismiss} isOpen={signOutModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign Out</IonTitle>
            <IonButtons slot='start'>
              <IonButton slot='icon-only' onClick={() => setSignOutModal(false)}>
                <IonIcon icon={close} slot='start' />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <SignOut />
      </IonModal>

    </IonPage>
  );
};

export default HomePage;
