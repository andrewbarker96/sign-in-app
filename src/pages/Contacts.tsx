import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonItem,
  IonIcon,
  IonButton,
  IonActionSheet,
  IonPage,
  IonTitle,
  IonButtons,
  IonFab,
  IonFabButton,
  IonInput,
  IonLabel,
  IonModal,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from '@ionic/react';
import {
  filter,
  close,
  pencil,
  save,
} from 'ionicons/icons';
import { supabase } from '../util/supabase';
import ContactCard from '../components/Contacts/ContactCard';
import ManageContact from '../components/Contacts/ManageContact';
import TopMenu from '../components/TopMenu';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContact, setEditedContact] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showCallActionSheet, setshowCallActionSheet] = useState(false);
  const [showTextActionSheet, setShowTextActionSheet] = useState(false);
  const [sortField, setSortField] = useState('firstName');

  useEffect(() => {
    fetchContacts();
  }, [searchTerm]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*');

      if (error) {
        console.error('Error fetching Contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error fetching Contacts:', error);
    }
  };

  const handleSaveContact = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(editedContact)
        .eq('id', editedContact.id);

      if (error) {
        console.error('Error updating contact:', error);
      } else if (data && data > 0) {
        setSelectedContact(data[0]);
      }

      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(value =>
      value &&
      typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEditContact = () => {
    setEditedContact({ ...selectedContact });
    setIsEditMode(true);
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedContact({ ...editedContact, [key]: value });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
        <IonItem>
          <IonSearchbar
            className='searchbar'
            showCancelButton='focus'
            onIonInput={e => setSearchTerm(e.detail.value || '')}
            autocapitalize="off"
          />
          <IonButton fill='clear' size='default' onClick={() => setIsOpen(true)} style={{ margin: 'auto' }}>
            <IonIcon icon={filter} color='dark' />
          </IonButton>
        </IonItem>
      </IonHeader>
      <ManageContact />
      <IonContent fullscreen>
        {filteredContacts.map(contact => (
          <div key={contact.id} onClick={() => { setShowModal(true); setSelectedContact(contact); }}>
            <ContactCard
              firstName={contact.firstName}
              lastName={contact.lastName} />
          </div>
        ))}

        {/* Contact View Modal */} 
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonButtons slot='start'>
              <IonIcon slot='start' icon={close} style={{ borderRadius: '50%', padding: '10px' }} onClick={() => setShowModal(false)} />
            </IonButtons>
          </IonHeader>
          <IonContent className='ion-padding'>
            <IonFab slot='fixed' vertical='bottom' horizontal='end'>
              <IonFabButton onClick={isEditMode ? handleSaveContact : handleEditContact}>
                <IonIcon icon={isEditMode ? save : pencil} />
              </IonFabButton>
            </IonFab>
            {!isEditMode && selectedContact && (
              <IonCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonCardTitle style={{ backgroundColor: 'darkgray', color: 'white', borderRadius: '50%', padding: '15px', minWidth: '65px', minHeight: '65px' }}>
                  <IonText>{`${selectedContact.firstName.charAt(0)}${selectedContact.lastName.charAt(0)}`.toUpperCase()}</IonText>
                </IonCardTitle> 
              </IonCardHeader>
            )}
          <IonCardTitle className='contact-name'>
            {isEditMode ? (
              <IonItem>
                <IonLabel position="stacked">First Name</IonLabel>
                <IonInput
                  value={editedContact?.firstName || ''}
                  onIonChange={e => handleInputChange('firstName', e.detail.value || '')}
                />
                <IonLabel position="stacked">Middle Name</IonLabel>
                <IonInput
                  value={editedContact?.middleName || ''}
                  onIonChange={e => handleInputChange('middleName', e.detail.value || '')}
                  />
                  <IonLabel position="stacked">Last Name</IonLabel>
                  <IonInput
                    value={editedContact?.lastName || ''}
                    onIonChange={e => handleInputChange('lastName', e.detail.value || '')}
                  />
              </IonItem>
            ) : (
              selectedContact && `${selectedContact.firstName} ${selectedContact.lastName}`
            )}
          </IonCardTitle>
            {!isEditMode && (
              <IonCardContent className='contact-buttons'>
                <IonButton fill='clear' onClick={() => setshowCallActionSheet(true)} disabled={!selectedContact?.phone}>Call</IonButton>
                <IonButton fill='clear' onClick={() => setShowTextActionSheet(false)} disabled={!selectedContact?.phoneMobile}>Text</IonButton>
                <IonButton fill='clear' onClick={() => {window.open(`mailto:${selectedContact?.email}`)}} disabled={!selectedContact?.email}>Email</IonButton>
                <IonActionSheet
                  isOpen={showCallActionSheet}
                  onDidDismiss={() => setshowCallActionSheet(false)}
                  buttons={[
                    { text: 'Call Work', handler: () => { window.open(`tel:${selectedContact?.phoneWork}`); return false; }},
                    { text: 'Call Mobile', handler: () => { window.open(`tel:${selectedContact?.phoneMobile}`); return false; }},
                    { text: 'Cancel', role: 'cancel' }
                  ]}
                />
              </IonCardContent>
            )}
            <IonCardContent>
              <IonCardSubtitle>Company</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.company || ''}
                    onIonChange={e => handleInputChange('company', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.company}
              </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Title</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.title || ''}
                    onIonChange={e => handleInputChange('title', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.title}
            </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Email</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.email || ''}
                    onIonChange={e => handleInputChange('email', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.email}
            </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Work Phone</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.phoneWork || ''}
                    onIonChange={e => handleInputChange('phone', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.phoneWork}
            </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Mobile Phone</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.phoneMobile || ''}
                    onIonChange={e => handleInputChange('phoneMobile', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.phoneMobile}
            </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Fax</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.fax || ''}
                    onIonChange={e => handleInputChange('fax', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.fax}
            </IonCardContent>
            <IonCardContent>
              <IonCardSubtitle>Address</IonCardSubtitle>
              {isEditMode ? (
                <IonItem>
                  <IonInput
                    value={editedContact?.address || ''}
                    onIonChange={e => handleInputChange('address', e.detail.value || '')}
                  />
                </IonItem>
              ) : selectedContact?.address}
            </IonCardContent>
          </IonContent>
        </IonModal>


        {/* Action Sheet for Sorting */}
        <IonActionSheet
          isOpen={isOpen}
          onDidDismiss={() => setIsOpen(false)}
          header='Sort By:'
          buttons={[
            { text: 'First Name', handler: () => setSortField('firstName') },
            { text: 'Last Name', handler: () => setSortField('lastName') },
            { text: 'Cancel', role: 'cancel' }
          ]}/>

      </IonContent>
    </IonPage>
  );
};

export default ContactsPage;
