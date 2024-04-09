import { IonCard, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sign In</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonItem>
            <img src = "https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt = "Stock & Associates" width = "300" height = "100" className=''/>
          </IonItem>
        <IonCard>
          <IonItem>
            <IonInput placeholder="First Name"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Last Name"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Email"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput placeholder="Password"></IonInput>
          </IonItem>

        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
