import { IonCard, IonItem, IonInput, IonText, IonSelect, IonSelectOption, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { supabase } from '../util/supabase';
import { useEffect, useState } from 'react';

const StockPersonnel: React.FC = () => {
    const [personnelOptions, setPersonnelOptions] = useState<string[]>([]);

    useEffect(() => {
        async function fetchPersonnelData() {
          try {
            const { data, error } = await supabase.from('personnel').select('*');
            if (error) {
              console.error('Error fetching personnel data:', error.message);
            } else {
              const personnelNames = data.map(person => `${person.first_name} ${person.last_name}, ${person.title} ${person.on_site}`);
              setPersonnelOptions(personnelNames);
            }
          } catch (error) {
            console.error('Error fetching personnel data:', error);
          }
        }
        fetchPersonnelData();
      }, []);

    return (
        <IonCard style={{ marginLeft: '10%', marginRight: '10%' }}>
            <IonItem>
                Stock Employees
            </IonItem>
            <IonItem>
                <div>
                    {personnelOptions.map((personnelName) => (
                        <div key={personnelName}>
                            <IonItem>
                                <IonText>{personnelName}</IonText>
                            </IonItem>
                        </div>
                    ))}
                </div>
            </IonItem>
        </IonCard>
    );
};

export default StockPersonnel;
