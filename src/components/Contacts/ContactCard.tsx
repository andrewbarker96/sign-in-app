import React, { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { IonButton, IonCardContent, IonIcon, IonItem, IonText } from '@ionic/react';

interface ContactCardProps {
  fullName: string;
  company?: string;
  title?: string;
  phone?: string;
  email?: string;
  address?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ fullName }) => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <IonItem onClick={() => setShowModal(true)}>
        <IonCardContent style={{flex:12, flexDirection:'column'}}>
          <IonText>{fullName}</IonText>
        </IonCardContent>
        <IonCardContent style={{ flex: 1, flexDirection: 'column' }}>
          <IonButton fill='clear' onClick={() => setShowModal(true)}><IonIcon icon={chevronForward} color='dark'/></IonButton>
        </IonCardContent>
      </IonItem>
    </>
  );
};

export default ContactCard;
