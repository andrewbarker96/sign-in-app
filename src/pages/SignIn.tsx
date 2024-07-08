import { useState } from 'react';
import { IonCardContent, IonInput, IonButton, IonText, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonToast, IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonItem, IonTitle, IonImg } from '@ionic/react';
import { firestore } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Keyboard } from '@capacitor/keyboard';
import { arrowBack, arrowBackCircle, close } from 'ionicons/icons';
import TopMenu from '../components/TopMenu';
import GoBackOption from '../components/backButton';
import { useHistory } from 'react-router';
import { first } from 'lodash';

const SignInPage: React.FC = () => {
  const [name, setName] = useState('');
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
      if (name && email && company) {
        const docRef = await addDoc(collection(firestore, `guests`), {
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1],
          email: email,
          company: company,
          date: `${date}`,
          signInTime: `${time}`,
          signOutTime: '',
          notes: ''
        });
        console.log('Document written with ID: ', docRef.id);
        setSuccess(true);
        setName('');
        setEmail('');
        setCompany('');
        alert('You have been successfully signed in!');
        window.location.href = '/home';

      } else {
        setError(true);
        alert('Unable to sign you in. Ensure all fields are filled out.');
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
            onIonChange={e => setName(e.detail.value || '')}
          >
            <IonLabel slot='label'>Name<IonText color={'danger'}>*</IonText></IonLabel>
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
            clearOnEdit={true}
            clearInput={true}
            clearInputIcon={close}
            value={email}
            onIonChange={e => setEmail(e.detail.value || '')}
          >
            <IonLabel slot='label' >Email<IonText color={'danger'}>*</IonText></IonLabel>
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
            clearOnEdit={true}
            clearInput={true}
            clearInputIcon={close}
            onIonChange={e => setCompany(e.detail.value || '')}
          >
            <IonLabel slot='label' >Company <IonText color={'danger'}>*</IonText></IonLabel>
          </IonInput>
        </IonItem>
        <IonButton id='signIn' expand='block' onClick={handleFormSubmit}>
          Sign In
        </IonButton>

        <IonToast color='danger' isOpen={error} onDidDismiss={() => setError(false)} message='Unable to sign you in. Ensure all fields are filled out.' duration={5000} />
        <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='You have been successfully signed in!' duration={5000} />

      </IonContent>
    </IonPage>
  );
}

export default SignInPage;
