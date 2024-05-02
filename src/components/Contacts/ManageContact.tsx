import React from 'react'
import { supabase } from '../../util/supabase'
import { IonButton, IonButtons, IonCard, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { add, close } from 'ionicons/icons';

const addOrUpdateContact = async (contact: any) => {
  const { data: existingContacts, error } = await supabase
    .from('contacts')
    .select('*')
    .or(`full_name.eq.${contact.full_name},email.eq.${contact.email}`);

  if (error) {
    console.error('Error fetching Contacts:', error);
    return;
  }

  if (existingContacts && existingContacts.length > 0) {
    const { data: updatedContact, error: updateError } = await supabase
      .from('contacts')
      .update(contact)
      .eq('id', existingContacts[0].id);

    if (updateError) {
      console.error('Error updating Contact:', updateError);
    } else {
      console.log('Contact updated:', updatedContact);
    }
  } else {
    const { data: newContact, error: insertError } = await supabase
      .from('contacts')
      .insert([contact]);

    if (insertError) {
      console.error('Error adding Contact:', insertError);
    } else {
      console.log('Contact added:', newContact);
    }
  }
};


const ManageContact = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [contact, setContact] = React.useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    title: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleAddOrUpdateContact = async () => {
    // Check if contact with same name or email already exists
    const { data: existingContacts, error } = await supabase
      .from('contacts')
      .select('*')
      .or(`full_name.eq.${contact.full_name}, company.eq.${contact.company}, email.eq.${contact.email}, phone.eq.${contact.phone}, title.eq.${contact.title}`);
    if (error) {
      console.error('Error fetching Contacts:', error);
      return;
    }
    if (existingContacts && existingContacts.length > 0) {
      const { data: updatedContact, error: updateError } = await supabase
        .from('contacts')
        .update(contact)
        .eq('id', existingContacts[0].id);
        
      if (updateError) {
        console.error('Error updating Contact:', updateError);
      } else {
        console.log('Contact updated:', updatedContact);
        setIsOpen(false);
      }
    } else {
      const { data: newContact, error: insertError } = await supabase
        .from('contacts')
        .insert([contact]);
        alert('Contact added');
        setIsOpen(false);
      if (insertError) {
        console.error('Error adding Contact:', insertError);
      } else {
        console.log('Contact added:', newContact);
      }
    }
  };

  return (
    <>
      <IonFab slot = 'fixed' vertical='bottom' horizontal='end'>
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      {isOpen && (
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Contact</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonInput type='text' label='Name' labelPlacement='floating' />
              </IonItem>
              <IonItem>
                <IonInput type='text' label='Company' labelPlacement='floating' />
              </IonItem>
              <IonItem>
                <IonInput type='text' label='Title' labelPlacement='floating' />
              </IonItem>
              <IonItem>
                <IonInput type='email' label='Email' labelPlacement='floating' />
              </IonItem>
              <IonItem>
                <IonInput type='tel' label='Phone' labelPlacement='floating' />
              </IonItem>
            </IonList>
            <IonButton expand="full" onClick={addOrUpdateContact}>
              <IonIcon icon={add} slot="start" /> Add Contact
            </IonButton>
          </IonContent>
        </IonModal>
      )}
    </>
  );
};

export default ManageContact