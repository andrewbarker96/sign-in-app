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
} from '@ionic/react';
import { supabase } from '../util/supabase';
import { eye, eyeOff } from 'ionicons/icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast ] = useIonToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await showLoading();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await showToast({ message: 'Logged in successfully!' });
    } catch (e: any) {
      await showToast({ message: e.error_description || e.message , duration: 5000});
    } finally {
      await hideLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonItem>
          <div style={{ marginRight: '25%', marginLeft:'25%', paddingTop:'20px', paddingBottom:'20px'}}>
            <img src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" width="auto" height="auto" />
          </div> 
        </IonItem>
        <IonList inset={true}>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonInput value={email} name="email" label='Email' labelPlacement='floating' onIonChange={(e) => setEmail(e.detail.value ?? '')}type="email"/>
            </IonItem>
            <IonItem>
              <IonInput value={password} name="password" label='Password' labelPlacement='floating' onIonChange={(e) => setPassword(e.detail.value ?? '')} type={showPassword ? "text" : "password"} />
              <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>
                <IonIcon slot="icon-only" icon={showPassword ? eyeOff : eye} />
              </IonButton>
          </IonItem>
            <div className="ion-text-center">
              <IonButton type="submit" expand='block'>
                Login
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
