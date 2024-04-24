import { IonContent, IonHeader, IonToolbar, IonSearchbar, IonCard, IonModal, IonButton, IonItem, IonIcon, IonCardSubtitle, IonCardContent, IonCardHeader, IonCardTitle, IonPage, IonTitle, IonButtons, IonFab, IonFabButton, IonInput, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase';
import { add, chevronBack, pencil, checkmark, save } from 'ionicons/icons';
import ContactCard from '../components/Contacts/ContactCard';
import ManageContact from '../components/Contacts/ManageContact';

const ContactsPage: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContact, setEditedContact] = useState<any>(null);
  
  
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
  
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSaveContact = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .update(editedContact)
      .eq('uuid', editedContact.uuid);
    
    if (error) {
      console.error('Error updating contact:', error);
    } else if (data && (data as any[]).length > 0) {
      setSelectedContact(data[0]);
    }
  
    setIsEditMode(false);
    fetchContacts();
  };
  
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

  const handleEditContact = () => {
    setEditedContact(selectedContact);
    setIsEditMode(true);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
        <IonSearchbar value={searchTerm} showClearButton="focus" onIonInput={e => setSearchTerm(e.detail.value!)} autocapitalize="off" />
      </IonToolbar>
      <ManageContact />
      <IonContent className="contact-list">

        {/* Contact List View */}
        <IonCard>
          {filteredContacts.map((contact: any, index: number) => (
            <div
              key={contact.uuid || index}
              onClick={() => { setShowModal(true); setSelectedContact(contact); }}
            >
              <ContactCard
                fullName={contact.full_name}
              />
            </div>
          ))}
        </IonCard>

        {/* Contact View Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <IonHeader>
              <IonButtons slot='start'>
                <IonIcon slot='start' icon={chevronBack} style={{ borderRadius: '50%', padding: '10px' }} onClick={() => setShowModal(false)} />
              </IonButtons>
            </IonHeader>

            <IonFab slot='fixed' vertical='bottom' horizontal='end'>
              <IonFabButton onClick={isEditMode ? handleSaveContact : handleEditContact}>
                <IonIcon icon={isEditMode ? save : pencil} />
              </IonFabButton>
            </IonFab>
            
            <IonCard>
              <IonCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonCardTitle style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '50%', padding: '15px', minWidth: '65px', minHeight: '65px' }}>{selectedContact?.full_name ? selectedContact.full_name.split(' ').map((name: string) => name.charAt(0)).join('').toUpperCase().slice(0, 2) : ''}</IonCardTitle>
              </IonCardHeader>

              <IonCardTitle className='contact-name'>{isEditMode ? (
                <IonItem>
                  <IonLabel position="floating">Full Name</IonLabel>
                  <IonInput
                    value={editedContact?.full_name || ''}
                    onIonChange={(e) =>
                      setEditedContact({
                        ...editedContact,
                        full_name: e.detail.value || '',
                      })
                    }
                  />
                </IonItem>
              ) : selectedContact?.full_name}</IonCardTitle>
              <IonCardTitle className='contact-company'>{isEditMode ? (
                <IonItem>
                  <IonLabel position="floating">Company</IonLabel>
                  <IonInput
                    value={editedContact?.company || ''}
                    onIonChange={(e) =>
                      setEditedContact({
                        ...editedContact,
                        company: e.detail.value || '',
                      })
                    }
                  />
                </IonItem>
              ) : selectedContact?.company}</IonCardTitle>

              <IonCardContent className='contact-buttons'>
                <IonButton fill='clear' onClick={() => handleCall(selectedContact?.phone)} disabled={!selectedContact?.phone} >Call</IonButton>
                <IonButton fill='clear' onClick={() => handleText(selectedContact?.phone)} disabled={!selectedContact?.phone} >Text</IonButton>
                <IonButton fill='clear' onClick={() => handleEmail(selectedContact?.email)} disabled={!selectedContact?.email} >Email</IonButton>
              </IonCardContent>

              <IonCardSubtitle>Title</IonCardSubtitle>

                {isEditMode ? (
                  <IonItem>
                    <IonInput
                      value={editedContact?.title || ''}
                      onIonChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          title: e.detail.value || '',
                        })
                      }
                    />
                  </IonItem>
              ) : selectedContact?.title}
                <IonCardContent>
              </IonCardContent>

              <IonCardSubtitle>Phone</IonCardSubtitle>
                {isEditMode ? (
                  <IonItem>
                    <IonInput
                      value={editedContact?.phone || ''}
                      onIonChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          phone: e.detail.value || '',
                        })
                      }
                    />
                  </IonItem>
              ) : selectedContact?.phone}
                <IonCardContent onClick={() => handleCall(selectedContact?.phone)} style={{ color: '#2575fe' }}>
              </IonCardContent>

              <IonCardSubtitle>Email</IonCardSubtitle>
                {isEditMode ? (
                  <IonItem>
                    <IonInput
                      value={editedContact?.email || ''}
                      onIonChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          email: e.detail.value || '',
                        })
                      }
                    />
                  </IonItem>
              ) : selectedContact?.email}
                <IonCardContent onClick={() => handleEmail(selectedContact?.email)} style={{ color: '#2575fe' }}>
              </IonCardContent>

              <IonCardSubtitle>Address</IonCardSubtitle>
              <IonCardContent>
                {isEditMode ? (
                  <IonItem>
                    <IonInput
                      value={editedContact?.address || ''}
                      onIonChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          address: e.detail.value || '',
                        })
                      }
                    />
                  </IonItem>
                ) : selectedContact?.address}
              </IonCardContent>

            </IonCard>

          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ContactsPage;
