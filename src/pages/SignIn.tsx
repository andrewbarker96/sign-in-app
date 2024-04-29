import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonImg, IonText } from '@ionic/react';
import SignInForm from '../components/Forms/MeetingSignIn';
import './SignIn.css';
import TopMenu from '../components/TopMenu';

const SignInPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
        <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" className='StockLogo'/>
        </IonItem>
        <IonText className='ion-padding'>Welcome to Stock & Associates. <br/>Please Sign In!</IonText>
        <SignInForm />
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
