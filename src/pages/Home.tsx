import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonButtons, IonCol, IonRow, IonGrid } from '@ionic/react';
import SignInForm from './SignIn';
import { useState } from 'react';
import './Home.css'
import { close } from 'ionicons/icons';
import { set } from 'lodash';
import SignOut from '../components/Forms/SignoutForm';

const HomePage: React.FC = () => {

  const date = new Date();
  const [signOutModal, setSignOutModal] = useState(false);

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }


  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonGrid className='form'>
          <IonRow style={{ marginBottom: '10%' }}>
            <IonCol size='12'>
              <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px' }} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonButton shape='round' routerLink='/sign-in' color={'dark'} expand='block'>Sign In</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonButton id='openSignOutModal' fill='outline' shape='round' color={'dark'} onClick={() => setSignOutModal(true)} expand="block">Sign Out</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <div className='ion-text-center'>
                <IonButton shape='round' fill='clear' color={'medium'} routerLink='/privacy-policy'><p>Privacy Policy</p></IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
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
