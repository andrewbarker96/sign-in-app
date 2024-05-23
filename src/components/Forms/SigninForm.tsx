import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel } from '@ionic/react';
import { firestore } from '../../util/firebase';
import { collection, addDoc } from 'firebase/firestore';

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

  const handleFormSubmit = async () => {
    try {
      const docRef = await addDoc(collection(firestore, `guests`), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        company: company,
        date: `${date}`,
        time: `${time}`,
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

  return (
    <>
      <IonCardContent>
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
      </IonCardContent>

      <IonCardContent>
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
      </IonCardContent>

      <IonCardContent>
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
      </IonCardContent>

      <IonCardContent>
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
      </IonCardContent>

      {error && (
        <IonLabel position='stacked' color='danger'>
          Error: Unable to sign you in. Please speak to Receptionist.
        </IonLabel>
      )}

      <IonButton expand='block' onClick={handleFormSubmit}>
        Sign In
      </IonButton>

      {success && (
        <IonLabel position='stacked' color='success'>
          Success: You have been successfully signed in!<br/>Welcome to Stock & Associates!
        </IonLabel>
        
      )}
    </>
  );
}

export default SignInForm;
