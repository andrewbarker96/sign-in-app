import { IonCard, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonItem, IonButton, IonIcon, IonActionSheet  } from '@ionic/react';
import './Employees.css';
import TopMenu from '../components/TopMenu';
import PersonnelCard from '../components/Employees/PersonnelCard';
import { supabase } from '../util/supabase';
import { useState, useEffect } from 'react';
import { filter, person } from 'ionicons/icons';

const EmployeesPage: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [sortField, setSortField] = useState('first_name');
  const [isOpen, setIsOpen] = useState(false);  
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPersonnel = async () => {
      const { data, error } = await supabase
        .from('personnel')
        .select('*');

      if (error) {
        console.error('Error fetching employees:', error);
      } else {
        const sortedData = data.sort((a, b) => a[sortField].localeCompare(b[sortField]));
        setPersonnel(sortedData);
      }
    };

    fetchPersonnel();
  }, [sortField]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu  />
          <IonTitle>Personnel</IonTitle>
        </IonToolbar>
        <IonItem style={{flex:1, flexDirection:'column'}}>
        <IonSearchbar className='searchbar' placeholder='Search Employees' showClearButton='never' showCancelButton='focus' onIonChange={e => setSearchTerm(e.detail.value ?? '')}/>
          <IonButton fill='clear' size='default' id='open-action-sheet' onClick={() => setIsOpen(true)} style={{ margin: 'auto' }}>
            <IonIcon icon={filter} color='dark' />
          </IonButton>
        </IonItem>
      </IonHeader>
      
      <IonContent fullscreen>
        {personnel
          .filter(person => person.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((personnel: any, index: number) => (
          <div 
            key={personnel.first || index}
            onClick={() => {
              setShowModal(true);
              setSelectedEmployee(personnel);
            }}
          >
            <PersonnelCard
              on_site={personnel.on_site}
              first_name={personnel.first_name}
              last_name={personnel.last_name}
              suffix={personnel.suffix}
              title={personnel.title}
              image={personnel.image}
              phone={personnel.phone}
              direct={personnel.direct}
              email={personnel.email}
            />
          </div>
        ))}
      <IonActionSheet
          isOpen={isOpen}
          onDidDismiss={() => setIsOpen(false)}
          header='Sort By:'
          buttons={[
            { text: 'First Name', handler: () => setSortField('first_name') },
            { text: 'Last Name', handler: () => setSortField('last_name') },
            { text: 'Title', handler: () => setSortField('title') },
            { text: 'Cancel', role: 'cancel' }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EmployeesPage;