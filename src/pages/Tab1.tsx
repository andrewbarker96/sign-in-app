import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SignInForm from '../components/SignInForm';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IonHeader>
          <IonItem>
            <div style={{ margin: '20px' }}>
              <img src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" width="300" height="100" />
            </div>
          </IonItem>
        </IonHeader>
        <SignInForm />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
