import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonItem, IonTitle, IonImg } from '@ionic/react';
import { firestore } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';
import { arrowBack, arrowBackCircle, close } from 'ionicons/icons';
import TopMenu from '../components/UI/TopMenu';
import GoBackOption from '../components/UI/backButton';
import { useHistory } from 'react-router';
import { guestSignIn } from '../services/firestoreServices';

const SignInPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const keyboard = Keyboard;
  const history = useHistory();

  const getDate = async () => {
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    return `${month}-${date}-${year}`;
  }

  const handleFormSubmit = async () => {
    const date = getDate();
    const time = new Date().toLocaleTimeString();
    if (name && email) {
      try {
        await guestSignIn(name, email, company);
        setSuccess(true);
        setName('');
        setEmail('');
        setCompany('');
        alert('You have been successfully signed in!\nWelcome to Stock & Associates!');
        history.push('/home');
      }
      catch {
        setError(true);
        error && alert('Unable to sign you in. Ensure name & email fields are filled out.');
      }
    }
    else {
      setError(true);
      alert('Unable to sign you in. Ensure name & email fields are filled out.');
    }
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <GoBackOption />
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonItem>
          <IonText>
            <h2>Welcome to Stock & Associates! </h2>
            <h3>Please sign in!</h3>
          </IonText>
          <IonImg slot='end' src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '75px' }} />
        </IonItem>

        <IonItem>
          <IonInput
            id='name'
            type='text'
            fill='outline'
            labelPlacement='floating'
            placeholder='ex. John Doe'
            value={name}
            autoCapitalize={'on'}
            autoCorrect='words'
            autofocus={true}
            clearInput={true}
            clearInputIcon={close}
            required={true}
            onIonInput={e => setName(e.detail.value || '')}
          >
            <IonLabel slot='label'>Name <IonText color={'danger'}>*</IonText></IonLabel>
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            id='email'
            type='email'
            fill='outline'
            labelPlacement='floating'
            placeholder='ex. johndoe@company.com'
            required={true}
            clearInput={true}
            clearInputIcon={close}
            value={email}
            onIonInput={e => setEmail(e.detail.value || '')}
          >
            <IonLabel slot='label' >Email <IonText color={'danger'}>*</IonText></IonLabel>
          </IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            id='company'
            type='text'
            fill='outline'
            labelPlacement='floating'
            placeholder='ex. Stock & Associates'
            autoCapitalize='on'
            value={company}
            clearInput={true}
            clearInputIcon={close}
            onIonInput={e => setCompany(e.detail.value || '')}
          >
            <IonLabel slot='label' >Company</IonLabel>
          </IonInput>
        </IonItem>
        <IonButton id='signIn' expand='block' onClick={handleFormSubmit}>
          Sign In
        </IonButton>

        <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={6500} />
        <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={6500} />

      </IonContent>
    </IonPage>
  );
}

export default SignInPage;
