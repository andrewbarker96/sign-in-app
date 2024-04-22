import React from 'react'; // Add import statement for React package
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Contacts.css';
import ContactList from '../components/Contacts/ContactList';
import SigParser from '../components/Contacts/SigParser';

const ContactsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stock Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <h2 style={{ paddingLeft: '2%' }}>Stock Contacts</h2>
        <SigParser />
        {/* <ContactList /> */}
      </IonContent>
    </IonPage>
  );
};

export default ContactsPage;
