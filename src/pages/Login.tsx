import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonIcon,
  IonImg,
  IonGrid,
  IonCol,
  IonModal,
  IonRow,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonToast,
  IonTitle,
  IonInputPasswordToggle,
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../util/firebase';
import { close, eye, eyeOff, send } from 'ionicons/icons';
import Copyright from '../components/CopyrightText';
import { IonRefresher } from '@ionic/react';
import { IonLoading } from '@ionic/react';
import GoBackOption from '../components/backButton';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth(firebase);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        console.log('User signed in:', user, uid);
        window.location.href = '/';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
        setInvalid(true);
        setPassword('');
      });
  };

  const clickForgotPassword = () => {
    setShowModal(true);
  }

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, emailVerification)
      .then(() => {
        console.log('Password reset email sent');
        setSuccess(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error sending password reset email:', errorCode, errorMessage);
        setInvalid(true);
        setEmailVerification('');
      });
  }




  return (
    // Main Login Form
    <IonPage>

      <IonContent className='ion-padding'>
        <div className="form">

          <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px', marginTop: '2.5%' }} />
          <IonItem lines='none'>
            <IonInput type='email' labelPlacement='stacked' label='Email' placeholder='Email' value={email} onIonChange={e => setEmail(e.detail.value!)} />
          </IonItem>
          <IonItem lines='none'>
            <IonInput type={showPassword ? 'text' : 'password'} label='Password' labelPlacement='stacked' placeholder='Enter your Password' value={password} onIonChange={e => setPassword(e.detail.value!)}>
              <IonInputPasswordToggle slot='end' />
            </IonInput>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel position='stacked' color='danger'>{invalid ? 'Invalid email or password' : ''}</IonLabel>
            <IonButton slot='end' fill='clear' routerLink='/forgot-password'>Forgot Password?</IonButton>
          </IonItem>
          <IonButton shape='round' id='open-loading' expand='block' onClick={handleLogin}>Login</IonButton>
          <Copyright />
        </div>
        <IonLoading className='custom-loading' trigger='open-loading' isOpen={false} onDidDismiss={() => setInvalid(false)} message='Logging in...' duration={2000} />
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;