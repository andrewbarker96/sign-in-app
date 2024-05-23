import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton, IonModal, IonIcon } from '@ionic/react';
import SignInForm from '../components/Forms/SigninForm';
import TopMenu from '../components/TopMenu';
import { useState } from 'react';
import './SignIn.css';
import { Margin } from '@mui/icons-material';
import { close } from 'ionicons/icons';

const HomePage: React.FC = () => {
  
  const date = new Date();
  const monthDayYear = date.toDateString();
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{monthDayYear}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
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
        </IonCardContent>
        </IonContent>
        
        
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonIcon icon={close} size='large' color='primary' onClick={() => setShowModal(false)} />
              <IonTitle>Guest Sign In</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCardContent>
            <SignInForm />
          </IonCardContent>
        </IonModal>

    </IonPage>
  );
};

export default HomePage;
