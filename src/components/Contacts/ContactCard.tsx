import React, { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { IonIcon, IonItem, IonText } from '@ionic/react';

interface ContactCardProps {
  fullName: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ fullName }) => {
  
  return (
    <IonItem>
      <IonText style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {fullName}
        <IonIcon aria-hidden="true" icon={chevronForward} style={{ marginLeft: 'auto' }} />
      </IonText>
    </IonItem>
  );
};

export default ContactCard;
