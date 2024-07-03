import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonItem, IonTitle } from '@ionic/react';
import { firestore } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';
import { arrowBack, arrowBackCircle, close } from 'ionicons/icons';
import TopMenu from '../components/TopMenu';
import GoBackOption from '../components/backButton';

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
      window.location.href = '/';

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
        <IonText className='ion-text-center'>
          <h2>Welcome to Stock & Associates</h2>
        </IonText>
        <IonText className='ion-text-center'>
          <h3>Please sign in below</h3>
        </IonText>

        <div className="form">
          <IonItem lines='none'>
            <IonInput
              id='FirstName'
              type='text'
              labelPlacement='floating'
              placeholder='ex. John'
              value={firstName}
              autoCapitalize={'on'}
              autoCorrect='on'
              autofocus={true}
              clearInput={true}
              clearInputIcon={close}
              onIonChange={e => setFirstName(e.detail.value || '')}
            >
              <IonText slot='label'>
                First Name
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonItem>

          <IonItem lines='full'>
            <IonInput
              id='LastName'
              type='text'
              labelPlacement='floating'
              placeholder='ex. Doe'
              autoCapitalize='on'
              value={lastName}
              clearOnEdit={true}
              clearInput={true}
              clearInputIcon={close}
              onIonChange={e => setLastName(e.detail.value || '')}
            >
              <IonText slot='label'>
                Last Name
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonItem>

          <IonItem lines='full'>
            <IonInput
              id='email'
              type='email'
              labelPlacement='floating'
              placeholder='ex. johndoe@company.com'
              autoCapitalize='on'
              clearOnEdit={true}
              clearInput={true}
              clearInputIcon={close}
              value={email}
              onIonChange={e => setEmail(e.detail.value || '')}
            >
              <IonText slot='label'>
                Email
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonItem>

          <IonItem lines='full'>
            <IonInput
              id='company'
              type='text'
              labelPlacement='floating'
              placeholder='ex. Stock & Associates'
              autoCapitalize='on'
              value={company}
              clearOnEdit={true}
              clearInput={true}
              clearInputIcon={close}
              onIonChange={e => setCompany(e.detail.value || '')}
            >
              <IonText slot='label'>
                Company
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonItem>

          <IonButton shape='round' id='signIn' expand='block' onClick={handleFormSubmit}>
            Sign In
          </IonButton>
        </div>

        <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={3000} />
        <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={3000} />

      </IonContent>
    </IonPage>
  );
}

export default SignInPage;
