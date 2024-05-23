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

  return (
    <IonPage className='ion-align-items-center'>
      <IonContent className='ion-padding'>
        <IonCardContent>
          <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" className='ion-padding' style={{ height: '175px' }} />
        </IonCardContent>
        <IonCardContent>
          <IonText class='ion-text-center' >
            <h1>Welcome to Stock & Associates!</h1>
          </IonText>
        </IonCardContent>
        <IonCardContent style={{marginLeft:'20%', marginRight:'20%'}}>
          <IonButton onClick={() => setShowModal(true)} expand="block">Sign In</IonButton>
          <br />
          <IonButton color='medium' onClick={() => setShowModal2(true)} expand="block">Set Up Meeting</IonButton>
        </IonCardContent>
        </IonContent>
        
        
        <IonModal isOpen={showModal}>
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
      
        <IonModal isOpen={showModal2}>
          <IonHeader>
            <IonToolbar style={{ display: 'flex' }}>
              <IonTitle>Set Up Meeting</IonTitle>
              <IonButton fill='clear' slot='start' shape='round' onClick={() => setShowModal2(false)}>
                <IonIcon icon={close} slot='start' />
              </IonButton>
            </IonToolbar>
          </IonHeader>
        </IonModal>


    </IonPage>
  );
};

export default HomePage;
