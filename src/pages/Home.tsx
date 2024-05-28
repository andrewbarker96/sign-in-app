import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon, IonMenuButton } from '@ionic/react';
import SignInForm from '../components/Forms/SigninForm';
import TopMenu from '../components/TopMenu';
import { useState } from 'react';
import './Home.css'
import { Margin } from '@mui/icons-material';
import { close } from 'ionicons/icons';
import { set } from 'lodash';

const HomePage: React.FC = () => {

  const date = new Date();
  const monthDayYear = date.toDateString();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Home</IonTitle>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonCardContent className='ion-margin-top'>
          <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" className='ion-padding' style={{ height: '175px' }} />
        </IonCardContent>
        <IonCardContent>
          <IonText class='ion-text-center' >
            <h1>Welcome to Stock & Associates!</h1>
          </IonText>
        </IonCardContent>
        <IonCardContent style={{ marginLeft: '20%', marginRight: '20%' }}>
          <IonButton id='open-modal' onClick={() => setShowModal(true)} expand="block">Sign In</IonButton>
          <br />
          {/* <IonButton color='medium' onClick={() => setShowModal2(true)} expand="block">Set Up Meeting</IonButton> */}
        </IonCardContent>
      </IonContent>


      <IonModal trigger='open-modal' canDismiss={canDismiss} isOpen={showModal} initialBreakpoint={1} breakpoints={[0, 1]}>
        <IonHeader>
          <IonToolbar style={{ display: 'flex' }}>
            <IonTitle>Sign In</IonTitle>
            <IonButton fill='clear' slot='start' shape='round' onClick={() => setShowModal(false)}>
              <IonIcon icon={close} slot='start' />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <SignInForm />
      </IonModal>

      {/* <IonModal isOpen={showModal2}>
          <IonHeader>
            <IonToolbar style={{ display: 'flex' }}>
              <IonTitle>Set Up Meeting</IonTitle>
              <IonButton fill='clear' slot='start' shape='round' onClick={() => setShowModal2(false)}>
                <IonIcon icon={close} slot='start' />
              </IonButton>
            </IonToolbar>
          </IonHeader>
        </IonModal> */}


    </IonPage>
  );
};

export default HomePage;
