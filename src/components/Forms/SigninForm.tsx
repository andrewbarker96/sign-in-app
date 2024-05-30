import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast } from '@ionic/react';
import { firestore } from '../../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';

function SignInForm() {
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
    if (!firstName || !lastName || !email || !company) {
      setError(true);
      return;
    }
    else {
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
        setError(false);
        setTime(new Date().toLocaleTimeString());
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompany('');

      } catch (error) {
        console.error('Error writing document: ', error);
        setError(true);
      }
    };
  }

  return (
    <IonContent className='ion-padding'>
      <IonGrid>
        <IonRow>
          <IonCol size='12'>
            <IonInput
              id='FirstName'
              type='text'
              labelPlacement='floating'
              placeholder='ex. John'
              value={firstName}
              onIonChange={e => setFirstName(e.detail.value || '')}
            >
              <IonText slot='label'>
                First Name
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonCol>
          <IonCol size='12'>
            <IonInput
              id='LastName'
              type='text'
              labelPlacement='floating'
              placeholder='ex. Doe'
              value={lastName}
              onIonChange={e => setLastName(e.detail.value || '')}
            >
              <IonText slot='label'>
                Last Name
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonCol>
          <IonCol size='12'>
            <IonInput
              id='email'
              type='email'
              labelPlacement='floating'
              placeholder='ex. johndoe@company.com'
              value={email}
              onIonChange={e => setEmail(e.detail.value || '')}
            >
              <IonText slot='label'>
                Email
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonCol>
          <IonCol size='12'>
            <IonInput
              id='company'
              type='text'
              labelPlacement='floating'
              placeholder='ex. Stock & Associates'
              value={company}
              onIonChange={e => setCompany(e.detail.value || '')}
            >
              <IonText slot='label'>
                Company
                <IonText color='danger'>*</IonText>
              </IonText>
            </IonInput>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={3000} />
      <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={3000} />

      {error && (
        <IonText color='danger' className='ion-text-center'>
          <p>Unable to sign you in. Ensure all fields are filled out.</p>
        </IonText>
      )}

      <IonButton id='signIn' expand='block' onClick={handleFormSubmit}>
        Sign In
      </IonButton>

      {success && (
        <IonText color='success' className='ion-text-center'>
          <p>You have been successfully signed in!<br />Welcome to Stock & Associates!</p>
        </IonText>

      )}
    </IonContent>
  );
}

export default SignInForm;
