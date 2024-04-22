import React, { useState } from 'react';
import { chevronForward } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface ContactCardProps {
  fullName: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ fullName }) => {
  
  return (
    <div className="contact-card" style={{ padding: '1%', display: 'flex', alignItems: 'center', width: '100%', borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray' }}>
      <h6 style={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft:'2%', paddingRight:'2%' }}>
        {fullName}
        <IonIcon aria-hidden="true" icon={chevronForward} style={{ marginLeft: 'auto' }} />
      </h6>
    </div>
  );
};

export default ContactCard;
