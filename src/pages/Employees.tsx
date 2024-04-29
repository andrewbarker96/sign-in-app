import { IonCard, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Employees.css';
import TopMenu from '../components/TopMenu';
import EmployeeCard from '../components/Employees/EmployeeCard';
import { supabase } from '../util/supabase';
import { useState, useEffect } from 'react';
import { filter } from 'ionicons/icons';

const EmployeesPage: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from('personnel')
        .select('*');

      if (error) {
        console.error('Error fetching employees:', error);
      } else {
        setPersonnel(data);
      }
    };

    fetchEmployees();
  }, []);
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <TopMenu  />
            <IonTitle>Personnel</IonTitle>
          </IonToolbar>
          <IonSearchbar className='searchbar' placeholder='Search Employees' showCancelButton='focus'></IonSearchbar>
        </IonHeader>
        <IonContent fullscreen>
          {personnel.map((employee: any) => (
          <EmployeeCard
            key={employee.uuid}
            image={employee.image}
            firstName={employee.first_name}
            lastName={employee.last_name}
            suffix={employee.suffix}
            title={employee.title}
            phone={employee.phone}
            direct={employee.direct}
            email={employee.email}
            on_site={employee.on_site}
          />
        ))}
        </IonContent>
      </IonPage>
    );
};

export default EmployeesPage;
