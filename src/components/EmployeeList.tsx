import { IonCard, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import { supabase } from '../util/supabase';
import { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';

const StockPersonnel: React.FC = () => {
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
    <IonContent className="employee-list">
      <IonCard>
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
        />
      ))}
      </IonCard>
    </IonContent>
  );
};

export default StockPersonnel;
