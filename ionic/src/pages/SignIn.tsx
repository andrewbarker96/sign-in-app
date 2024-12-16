import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonItem, IonTitle, IonImg } from '@ionic/react';
import { firestore } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';
import { arrowBack, arrowBackCircle, close } from 'ionicons/icons';
import TopMenu from '../components/TopMenu';
import GoBackOption from '../components/backButton';
import { useHistory } from 'react-router';

const SignInPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const hour = new Date().toLocaleTimeString();
  const date = (new Date().getMonth() + 1) + '-' + (new Date().getDate()) + '-' + new Date().getFullYear();

  const keyboard = Keyboard;

  const handleFormSubmit = async () => {
    try {
      if (firstName && lastName && email && company) {
        const docRef = await addDoc(collection(firestore, `guests`), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          company: company,
          date: `${date}`,
          signInTime: `${time}`,
          signOutTime: '',
          notes: ''
        });
        console.log('Document written with ID: ', docRef.id);
        setSuccess(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompany('');
      } else {
        setError(true);
      }

    } catch (error) {
      console.error('Error writing document: ', error);
      setError(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
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
            id='FirstName'
            type='text'
            fill='outline'

            labelPlacement='floating'
            label='First Name'
            placeholder='ex. John'
            value={firstName}
            autoCapitalize={'on'}
            autoCorrect='on'
            autofocus={true}
            clearInput={true}
            clearInputIcon={close}
            onIonChange={e => setFirstName(e.detail.value || '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            fill='outline'
            id='LastName'
            type='text'
            labelPlacement='floating'
            label='Last Name'
            required={true}
            placeholder='ex. Doe'
            autoCapitalize='on'
            value={lastName}
            clearOnEdit={true}
            clearInput={true}
            clearInputIcon={close}
            onIonChange={e => setLastName(e.detail.value || '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            id='email'
            type='email'
            fill='outline'
            required={false}
            labelPlacement='floating'
            label='Email'
            placeholder='ex. johndoe@company.com'
            autoCapitalize='on'
            clearOnEdit={true}
            clearInput={true}
            clearInputIcon={close}
            value={email}
            onIonChange={e => setEmail(e.detail.value || '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            id='company'
            type='text'
            fill='outline'
            labelPlacement='floating'
            label='Company'
            placeholder='ex. Stock & Associates'
            autoCapitalize='on'
            required={false}
            value={company}
            clearOnEdit={true}
            clearInput={true}
            clearInputIcon={close}
            onIonChange={e => setCompany(e.detail.value || '')}
          />
        </IonItem>
        <IonButton id='signIn' expand='block' onClick={handleFormSubmit}>
          Sign In
        </IonButton>

        <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={3000} />
        <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={3000} />

      </IonContent>
    </IonPage>
  );
}

export default SignInPage;
