import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SignInForm from '../components/Forms/MeetingSignIn';
import './SignIn.css';

const SignInPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meeting Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <div style={{ marginRight: '35%', marginLeft:'35%', paddingTop:'20px', paddingBottom:'20px'}}>
            <img src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" width="auto" height="auto" />
          </div>
        </IonItem>
        <SignInForm />
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;
