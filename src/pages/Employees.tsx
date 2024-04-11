import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Employees.css';
import StockPersonnel from '../components/EmployeeList';

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
                <StockPersonnel />
            </IonContent>
        </IonPage>
    );
};

export default EmployeesPage;
