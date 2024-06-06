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
} from '@ionic/react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../util/firebase';
import { close, eye, eyeOff, send } from 'ionicons/icons';
import Copyright from '../components/CopyrightText';
import { IonRefresher } from '@ionic/react';
import { IonLoading } from '@ionic/react';

export default function LoginPage() {
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
        <IonGrid className='form'>
          <IonRow>
            <IonCol size='12'>
              <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px' }} />
            </IonCol>
            <IonCol size='12'>
              <IonItem>
                <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Email' value={email} onIonChange={e => setEmail(e.detail.value!)} />
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem>
                <IonInput type={showPassword ? 'text' : 'password'} labelPlacement='floating' label='Password' placeholder='Enter your Password' value={password} onIonChange={e => setPassword(e.detail.value!)} />
                <IonIcon slot='end' icon={showPassword ? eye : eyeOff} size='small' color='medium' onClick={() => setShowPassword(!showPassword)} />
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonItem lines='none'>
                <IonLabel position='stacked' color='danger'>{invalid ? 'Invalid email or password' : ''}</IonLabel>
                <IonButton slot='end' fill='clear' onClick={clickForgotPassword}>Forgot Password?</IonButton>
              </IonItem>
            </IonCol>
            <IonCol size='12'>
              <IonButton shape='round' id='open-loading' expand='block' onClick={handleLogin}>Login</IonButton>
            </IonCol>
            <IonCol size='12'>
              <Copyright />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading className='custom-loading' trigger='open-loading' isOpen={false} onDidDismiss={() => setInvalid(false)} message='Logging in...' duration={2000} />

        {/* Reset Password Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonGrid className='ion-padding'>
            <IonRow>
              <IonCol size='12'>
                <IonIcon onClick={() => setShowModal(false)} icon={close} size='large' color='primary' slot='start' />
              </IonCol>
              <IonCol size='12'>
                <IonText class='ion-text-center'><h1>Reset Password</h1></IonText>
                <IonText class='ion-text-center'><h3>Enter your email address to receive a password reset link.</h3></IonText>
              </IonCol>
              <IonCol size='12'>
                <IonItem>
                  <IonInput type='email' labelPlacement='floating' label='Email' placeholder='Enter Email Address' value={emailVerification} onIonChange={e => setEmailVerification(e.detail.value!)} />
                </IonItem>
              </IonCol>
              <IonCol size='12'>
                <IonButton shape='round' id='open-loading' expand='block' onClick={handleForgotPassword}>Send Verification Email</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonToast color='danger' isOpen={invalid} onDidDismiss={() => setInvalid(false)} message='Invalid email address' duration={3000} />
          <IonToast color='success' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Password reset email sent' duration={3000} />
          <IonLoading className='custom-loading' trigger='open-loading' isOpen={success} onDidDismiss={() => setSuccess(false)} message='Sending Email...' duration={2000} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
