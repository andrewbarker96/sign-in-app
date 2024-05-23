import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent, IonButton } from '@ionic/react';
import SignInForm from '../components/Forms/MeetingAttendeeForm';
import TopMenu from '../components/TopMenu';
import { useState } from 'react';
import './SignIn.css';

const MeetingSignIn: React.FC = () => {
  
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
            <h2>Sign In</h2>
          </IonText>
        </IonCardContent>
        <IonCardContent>
          <IonButton onClick={() => setShowModal(true)} expand="block">Sign In</IonButton>
        </IonCardContent>
        <IonCardContent>
          <SignInForm />
          </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default MeetingSignIn;
