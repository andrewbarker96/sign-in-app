import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonButtons, IonCol, IonRow, IonGrid, IonItem, IonAlert, IonSelect, IonRouterLink } from '@ionic/react';
import SignInForm from './SignIn';
import { useState } from 'react';
import { close, logOut, logOutOutline } from 'ionicons/icons';
import { SignOut } from '../components/Forms/SignoutForm';
import { signOut } from 'firebase/auth';
import { auth } from '../util/firebase';
import { StockButton } from '../components/UI/button';

const HomePage: React.FC = () => {

  const date = new Date();
  const [signOutModal, setSignOutModal] = useState(false);

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }


  return (
    <IonPage>
      <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px', marginTop: '5%' }} />
      <IonContent className='ion-padding'>
        <StockButton text='Guest Sign In' routerLink='/sign-in' />
        <StockButton text='Guest Sign Out' fill='outline' onClick={() => setSignOutModal(true)} />
        <StockButton text='Privacy Policy' routerLink='/privacy-policy' fill='clear' textColor='medium' />
      </IonContent>

      {/* Sign Out Modal */}
      <IonModal trigger='openSignOutModal' canDismiss={canDismiss} isOpen={signOutModal}>
        <IonHeader className='ion-no-border'>
          <IonToolbar>
            <IonTitle>Sign Out</IonTitle>
            <IonButtons slot='start'>
              <IonButton slot='icon-only' onClick={() => setSignOutModal(false)}>
                <IonIcon icon={close} slot='start' />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <SignOut />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default HomePage;
