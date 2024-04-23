import { IonContent, IonHeader, IonToolbar, IonSearchbar, IonCard, IonModal, IonButton, IonItem, IonIcon, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../../util/supabase';
import ContactCard from './ContactCard';
import { chevronBack } from 'ionicons/icons';

const ContactList: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*');

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
  
  const handleCall = (phone: string | undefined) => {
    window.open(`tel:${phone}`);
  };

  const handleText = (phone: string | undefined) => {
    window.open(`sms:${phone}`);
  };

  const handleEmail = (email: string | undefined) => {
    window.open(`mailto:${email}`);
  }

  const handleAddress = (address: string | undefined) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  }

  return (
    <IonContent className="contact-list">
      <IonHeader>
        <IonToolbar>
          <IonSearchbar value={searchTerm} showClearButton="focus" onIonInput={e => setSearchTerm(e.detail.value!)} autocapitalize="off" />
        </IonToolbar>
      </IonHeader>
      <IonCard>
        {filteredContacts.map((contact: any, index:number) => (
          <div onClick={() => {setShowModal(true); setSelectedContact(contact);}}>
            <ContactCard
              key={contact.uuid || index}
              fullName={contact.full_name}
            />
          </div>
        ))}
      </IonCard>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <IonHeader>
            <IonIcon icon={chevronBack} style={{borderRadius:'50%', padding:'10px'}} onClick={() => setShowModal(false)} />
          </IonHeader>
          <IonCard>
            <IonCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonCardTitle style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '50%', padding: '15px', minWidth:'65px', minHeight:'65px'}}>{selectedContact?.full_name ? selectedContact.full_name.split(' ').map((name: string) => name.charAt(0)).join('').toUpperCase().slice(0, 2) : ''}</IonCardTitle>
            </IonCardHeader>
            
            <IonCardTitle className='contact-name'>{selectedContact?.full_name}</IonCardTitle>
            <IonCardTitle className='contact-company'>{selectedContact?.company || ''}</IonCardTitle>
            
            <IonCardContent className='contact-buttons'>
              <IonButton fill='clear' onClick={() => handleCall(selectedContact?.phone)} disabled={!selectedContact?.phone} >Call</IonButton>
              <IonButton fill='clear' onClick={() => handleText(selectedContact?.phone)} disabled={!selectedContact?.phone} >Text</IonButton>
              <IonButton fill='clear' onClick={() => handleEmail(selectedContact?.email)} disabled={!selectedContact?.email} >Email</IonButton>
            </IonCardContent>

            <IonCardSubtitle>Title</IonCardSubtitle>
            <IonCardContent>
              <h3>{selectedContact?.title || ''}</h3>
            </IonCardContent>
            
            <IonCardSubtitle>Phone</IonCardSubtitle>
            <IonCardContent onClick={() => handleCall(selectedContact?.phone)} style={{color:'#2575fe'}}>
              {selectedContact?.phone || ''}
            </IonCardContent>

            <IonCardSubtitle>Email</IonCardSubtitle>
            <IonCardContent onClick={() => handleEmail(selectedContact?.email)} style={{color:'#2575fe'}}>
              {selectedContact?.email || ''}
            </IonCardContent>
            
            <IonCardSubtitle>Address</IonCardSubtitle>
            <IonCardContent>
              {selectedContact?.address || ''}
            </IonCardContent>
          
          </IonCard>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default ContactList;