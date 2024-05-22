import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText, IonCardContent } from '@ionic/react';
import SignInForm from '../components/Forms/MeetingSignIn';
import './SignIn.css';
import TopMenu from '../components/TopMenu';
import { supabase } from '../util/supabase';

const SignInPage: React.FC = () => {
  
  const date = new Date();
  const monthDayYear = date.toDateString();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCardContent>
          <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" className='ion-padding' style={{ height: '175px' }} />
        </IonCardContent>
        <IonCardContent>
          <IonText class='ion-text-center'>
            <h1>Meeting Sign In</h1>
            <h2>{monthDayYear}</h2>
          </IonText>
        </IonCardContent>
        <IonCardContent>
          <SignInForm />
          </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
