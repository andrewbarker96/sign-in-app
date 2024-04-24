import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
  IonIcon,
  IonTabBar,
  IonText,
  IonImg,
  IonCard,
} from '@ionic/react';
import { supabase } from '../util/supabase';
import { eye, eyeOff } from 'ionicons/icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast ] = useIonToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await showLoading();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data) {
        await showToast({ message: 'Logged in successfully!' });
        window.location.href = '/home';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (e: any) {
      await showToast({ message: e.error_description || e.message , duration: 5000});
    } finally {
      await hideLoading();
    }
  };

  const copyright = new Date().getFullYear();

  return (
    <IonPage className='login-tab'>
      <IonContent>
        <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ paddingTop:'20%', width: '250', display: 'flex', margin:'auto'}}/>
          <form onSubmit={handleLogin} style={{margin:'25px'}}>
            <IonItem>
              <IonInput value={email} name="email" label='Email' labelPlacement='floating' onIonChange={(e) => setEmail(e.detail.value ?? '')}type="email"/>
            </IonItem>
            <IonItem>
              <IonInput value={password} name="password" label='Password' labelPlacement='floating' onIonChange={(e) => setPassword(e.detail.value ?? '')} type={showPassword ? "text" : "password"} />
              <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>
                <IonIcon slot="icon-only" style={{opacity:'65%'}} icon={showPassword ? eye : eyeOff} />
              </IonButton>
            </IonItem>
            <IonButton type="submit" expand='block' style={{marginTop:'10%'}}>
              Login
            </IonButton>
          </form>
          <IonText className='copyright'> Copyright © {copyright}<br/>Stock & Associates Consulting Engineers, Inc. </IonText>
      </IonContent>
    </IonPage>
  );
}
