import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Employees.css';

const EmployeesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stock Employees</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Stock Employees</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Employees page" />
      </IonContent>
    </IonPage>
  );
};

export default EmployeesPage;
