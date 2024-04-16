import { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonText,
  IonCard,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import { supabase } from '../../util/supabase';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // Check if the user is already logged in
      const checkSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          // Handle error
          console.error('Error fetching session:', error);
        } else if (data && data.session) {
          // User is logged in
          setIsLoggedIn(true);
        } else {
          // User is not logged in
          setIsLoggedIn(false);
        }
      };
      checkSession();
    }, []);

    const handleLogin = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error('Error logging in:', error.message);
          prompt('Error logging in:', error.message);
        } else {
          console.log('Logged in successfully:', data);
          setIsLoggedIn(true);
          window.location.href = '/home';
        }
    };

    return (
      <IonCard style={{marginLeft:'10%', marginRight:'10%'}}>
        <IonGrid>
          <IonList inset={true}>
            <form onSubmit={handleLogin}>
          <IonItem>
            <IonInput
              labelPlacement='floating'
              placeholder="Email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}>
              <div slot='label'>
                Email <IonText color='danger'>*</IonText>
              </div>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              labelPlacement='floating'
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}>
              <div slot='label'>
                Password <IonText color='danger'>*</IonText>
              </div>
            </IonInput>
          </IonItem>
          <div className="ion-text-center">
            <IonButton type="submit" fill="solid">
              Login
            </IonButton>
          </div>
            </form>
          </IonList>
          {isLoggedIn && <IonText color={'danger'}>You are already logged in.</IonText>}
        </IonGrid>
      </IonCard>
    );
}
