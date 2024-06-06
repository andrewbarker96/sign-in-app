import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonItem } from '@ionic/react';
import { firestore } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';

function SignInPage() {
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
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol size='12'>
              <IonButtons>
                <IonButton color={'primary'} size='large' routerLink='/'>
                  <IonIcon icon={arrowBack} slot='start' />
                  Return
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
              <IonText className='ion-text-center'>
                <h2>Welcome to Stock & Associates</h2>
              </IonText>
              <IonText className='ion-text-center'>
                <h3>Please sign in below</h3>
              </IonText>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='full'>
                <IonInput
                  id='FirstName'
                  type='text'
                  labelPlacement='floating'
                  placeholder='ex. John'
                  value={firstName}
                  autoCapitalize='on'
                  onIonChange={e => setFirstName(e.detail.value || '')}
                >
                  <IonText slot='label'>
                    First Name
                    <IonText color='danger'>*</IonText>
                  </IonText>
                </IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='full'>
                <IonInput
                  id='LastName'
                  type='text'
                  labelPlacement='floating'
                  placeholder='ex. Doe'
                  autoCapitalize='on'
                  value={lastName}
                  onIonChange={e => setLastName(e.detail.value || '')}
                >
                  <IonText slot='label'>
                    Last Name
                    <IonText color='danger'>*</IonText>
                  </IonText>
                </IonInput>
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='full'>
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
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='full'>
                <IonInput
                  id='company'
                  type='text'
                  labelPlacement='floating'
                  placeholder='ex. Stock & Associates'
                  autoCapitalize='on'
                  value={company}
                  onIonChange={e => setCompany(e.detail.value || '')}
                >
                  <IonText slot='label'>
                    Company
                    <IonText color='danger'>*</IonText>
                  </IonText>
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='12'>
              <IonButton size='large' shape='round' id='signIn' expand='block' onClick={handleFormSubmit}>
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={3000} />
        <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={3000} />


      </IonContent>
    </IonPage>
  );
}

export default SignInPage;
