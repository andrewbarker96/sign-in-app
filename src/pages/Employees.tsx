import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Employees.css';
import StockPersonnel from '../components/Employees/EmployeeList';
import EmployeeCard from '../components/Employees/EmployeeCard';
import TopMenu from '../components/TopMenu';

const EmployeesPage: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Personnel</IonTitle>
            <TopMenu  />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <StockPersonnel />
          {/* <EmployeeCard /> */}
        </IonContent>
      </IonPage>
    );
};

export default EmployeesPage;
