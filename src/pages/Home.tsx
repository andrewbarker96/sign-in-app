import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonMenuButton } from '@ionic/react';
import SignInForm from '../components/Forms/SigninForm';
import TopMenu from '../components/TopMenu';
import { useState } from 'react';
import './Home.css'
import { Margin } from '@mui/icons-material';
import { close } from 'ionicons/icons';
import { set } from 'lodash';
import SignOut from '../components/Forms/SignoutForm';

const HomePage: React.FC = () => {

  const date = new Date();
  const monthDayYear = date.toDateString();
  const [signInModal, setSignInModal] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [signInModal2, setSignInModal2] = useState(false);

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  return (
    <IonPage className='login-tab'>
      <IonContent className='ion-padding'>
        <IonCardContent>
          <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px' }} />
        </IonCardContent>
        <IonCardContent className='form'>
          <IonText class='ion-text-center' >
            <h1>Welcome to Stock & Associates!</h1>
          </IonText>
          <br />
          <IonButton id='openSignInModal' onClick={() => setSignInModal(true)} expand="block">Sign In</IonButton>
          <br />
          <IonButton id='openSignOutModal' color={'secondary'} onClick={() => setSignOutModal(true)} expand="block">Sign Out</IonButton>
          <br />
          {/* <IonButton color='medium' onClick={() => setSignInModal2(true)} expand="block">Set Up Meeting</IonButton> */}
        </IonCardContent>
      </IonContent>

      {/* Sign In Modal */}
      <IonModal trigger='openSignInModal' canDismiss={canDismiss} isOpen={signInModal} initialBreakpoint={1} breakpoints={[0, 0]}>
        <IonHeader>
          <IonToolbar style={{ display: 'flex' }}>
            <IonTitle>Sign In</IonTitle>
            <IonButton fill='clear' slot='start' shape='round' onClick={() => setSignInModal(false)}>
              <IonIcon icon={close} slot='start' />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <SignInForm />
      </IonModal>

      {/* Sign Out Modal */}
      <IonModal trigger='openSignOutModal' canDismiss={canDismiss} isOpen={signOutModal} initialBreakpoint={1} breakpoints={[0, 0]}>
        <IonHeader>
          <IonToolbar style={{ display: 'flex' }}>
            <IonTitle>Sign In</IonTitle>
            <IonButton fill='clear' slot='start' shape='round' onClick={() => setSignInModal(false)}>
              <IonIcon icon={close} slot='start' />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <SignOut />
      </IonModal>

      {/* <IonModal isOpen={signInModal2}>
          <IonHeader>
            <IonToolbar style={{ display: 'flex' }}>
              <IonTitle>Set Up Meeting</IonTitle>
              <IonButton fill='clear' slot='start' shape='round' onClick={() => setSignInModal2(false)}>
                <IonIcon icon={close} slot='start' />
              </IonButton>
            </IonToolbar>
          </IonHeader>
        </IonModal> */}


    </IonPage>
  );
};

export default HomePage;
