import { IonButton, IonCard, IonCardContent, IonIcon, IonText, IonSelect, IonSelectOption, IonActionSheet, IonImg } from '@ionic/react';
import { call, callOutline, chatbubbleEllipses, mail, mailOpen, phonePortrait, text } from 'ionicons/icons';
import { useState } from 'react';

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  suffix: string;
  title: string;
  phone: string;
  direct: string;
  email: string;
  image: string;
  on_site: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ firstName, lastName, suffix, title, phone, direct, email, image, on_site }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleCell = (phone: string) => {
    window.open(`tel:${phone}`);
  }

  const handleDirect = (direct: string) => {
    window.open(`tel:${direct}`);
  }

  const handleSMS = (phone: string) => {
    window.open(`sms:${phone}`);
  }

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`);
  }

  return (
    <IonCard className="employee-card" style={{ width:'100%', margin: '2%', paddingTop: '1%', paddingBottom:'2%', display: 'flex', alignItems: 'center' }}>
      {!imageLoaded && <IonCardContent style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '2%', backgroundColor: '#ccc' }} />}
      <IonCardContent>
      <img 
        src={image} 
        alt='employee' 
        style={{ width: '150px', height: 'fit', marginRight: '2%', objectFit:'cover', display: imageLoaded ? 'block' : 'none' }} 
        onLoad={() => setImageLoaded(true)}
        />
      </IonCardContent>
      <IonCardContent style={{width:'100%'}}>
        <IonText><h2>{firstName} {lastName}, {suffix}</h2></IonText>
        <IonText ><h3>{title}</h3></IonText>
        <div style={{ display: 'flex' }}>
          <IonButton size='small' id='open-action-sheet' onClick={() => setIsOpen(true)}><IonIcon icon={call} /></IonButton>
          <IonActionSheet
            isOpen={isOpen}
            trigger='open-action-sheet'
            header='Phone Options'
            buttons={[
              // { text: `Text`, handler: () => handleSMS(phone) },
              { text: `Cell: ${phone}`, handler: () => handleCell(phone) },
              { text: `Direct: ${direct}`, handler: () => handleDirect(direct) },
              // { text: `Email`, handler: () => handleEmail(email) },
              { text: 'Cancel', role: 'cancel', handler: () => setIsOpen(false)}
            ]}
          />
          <IonButton size='small' onClick={() => handleSMS(phone)}><IonIcon icon={chatbubbleEllipses} /></IonButton>
          <IonButton size='small' onClick={() => handleEmail(email)}><IonIcon icon={mail} /></IonButton>
        </div>
      </IonCardContent>
      <IonCardContent>
        <IonText>{renderIndicator()}</IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default EmployeeCard;
