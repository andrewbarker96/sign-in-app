import React, { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { IonButton, IonCardContent, IonIcon, IonItem, IonText } from '@ionic/react';

interface GuestCardProps {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  time?: string;
}

const GuestCard: React.FC<GuestCardProps> = ({ firstName, lastName, company, email, time }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonItem onClick={() => setShowModal(true)}>
        <IonCardContent style={{ flex: 12, flexDirection: 'column' }}>
          <IonText>{firstName} {lastName}</IonText>
          <IonText>{email}</IonText>
          <IonText>{company}</IonText>
          <IonText>{time}</IonText>
        </IonCardContent>
        <IonCardContent style={{ flex: 1, flexDirection: 'column' }}>
          <IonButton fill='clear' onClick={() => setShowModal(true)}>
            <IonIcon icon={chevronForward} color='dark' />
          </IonButton>
        </IonCardContent>
      </IonItem>
    </>
  );
};

export default GuestCard;
