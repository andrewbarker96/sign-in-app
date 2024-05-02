import React, { useState } from 'react';
import { call, chatbubbleEllipses, chevronForward, close, mail } from 'ionicons/icons';
import { IonActionSheet, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonModal, IonText } from '@ionic/react';

interface PersonnelCardProps {
  first_name: string;
  last_name: string;
  suffix: string;
  title: string;
  on_site: boolean;
  phone?: string;
  direct?: string;
  email?: string;
  image?: string;
}

const PersonnelCard: React.FC<PersonnelCardProps> = ({ first_name, last_name, suffix, title, on_site, phone, direct, email }) => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const renderIndicator = () => {
    if (on_site === true) {
      return <div style={{ backgroundColor: 'green', width: '15px', height: '15px', borderRadius: '50%'}} />;
    } else if (on_site === false) {
      return <div style={{ backgroundColor: 'red', width: '15px', height: '15px', borderRadius: '50%'}} />;
    } else {
      return null;
    }
  };

  return (
    <>
      <IonItem onClick={() => setShowModal(true)}>
        <IonCardContent style={{flex:1, flexDirection:'column'}}>
          {renderIndicator()}
        </IonCardContent>
        <IonCardContent style={{flex:12, flexDirection:'column'}}>
          <IonText>{first_name} {last_name} {suffix}</IonText>
          <br />
          <IonText>{title}</IonText>
        </IonCardContent>
        <IonCardContent style={{ flex: 1, flexDirection: 'column' }}>
          <IonButton fill='clear' onClick={() => setShowModal(true)}><IonIcon icon={chevronForward} color='dark' /></IonButton>
        </IonCardContent>
      </IonItem>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <IonHeader>
            <IonButtons slot='start'>
              <IonIcon slot='start' icon={close} style={{ borderRadius: '50%', padding: '10px' }} onClick={() => setShowModal(false)} />
            </IonButtons>
          </IonHeader>
          <IonCardHeader style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <IonText><h2>{first_name} {last_name} {suffix}<br />{title}</h2></IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonCardSubtitle>Cell</IonCardSubtitle>
              <IonText color={'primary'} id='open-action-sheet' onClick={() => setIsOpen(true)}>{phone}</IonText>
          </IonCardContent>
          <IonCardContent>
            <IonCardSubtitle>Direct</IonCardSubtitle>
            <IonText color={'primary'} onClick={() => {window.open(`tel:+1${direct}`)}}>{direct}</IonText>
          </IonCardContent>
          <IonCardContent>
            <IonCardSubtitle>Email</IonCardSubtitle>
            <IonText color={'primary'} onClick={() => {window.open(`mailto:${email}`)}}>{email}</IonText>
          </IonCardContent>
          <IonCardContent>
            <IonCardSubtitle>Location</IonCardSubtitle>
          </IonCardContent>
          <IonCardContent>
            <IonActionSheet
              isOpen={isOpen}
              trigger='open-action-sheet'
              header = 'Cellphone Options'
              buttons={[
                { text: `Text`, handler: () => {window.open(`sms:${phone}`); }},
                { text: `Call`, handler: () => {window.open(`tel:${phone}`); }},
                { text: 'Cancel', role: 'cancel', handler: () => setIsOpen(false)}
              ]}
            />
          </IonCardContent>
        </IonContent>
      </IonModal>
    </>
  );
};

export default PersonnelCard;
