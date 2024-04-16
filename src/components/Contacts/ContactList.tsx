import { IonCard, IonContent, IonSearchbar, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { supabase } from '../../util/supabase';
import { useEffect, useState } from 'react';
import ContactCard from './ContactCard';

const ContactList: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('full_name');

      if (error) {
        console.error('Error fetching Contacts:', error);
      } else {
        if (data && Array.isArray(data)) {
          const sortedData = data.sort((a, b) => a.full_name.localeCompare(b.full_name));
          setPersonnel(sortedData);
        }
        console.log(data);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = personnel.filter(contact => contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <IonContent className="contact-list">
      <IonHeader>
        <IonToolbar>
          <IonSearchbar value={searchTerm} showClearButton="focus" onIonInput={e => setSearchTerm(e.detail.value!)} autocapitalize="off" />
        </IonToolbar>
      </IonHeader>
      <IonCard>
        {filteredContacts.map((contact: any, index:number) => (
          <ContactCard
            key={contact.uuid || index}
            fullName={contact.full_name}
          />
        ))}
      </IonCard>
    </IonContent>
  );
};

export default ContactList;