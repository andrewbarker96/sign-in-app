import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../../data/supabase';

export const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        // Perform validation here

        // Connect to Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) {
            console.error('Error signing up:', error.message);
        }
        else {
            console.log('Signed up successfully:', data);
        }
    };

    return (
        <IonCard style={{ marginLeft: '10%', marginRight: '10%' }}>
            <IonGrid >
                <IonItem>
                    <IonInput type='email' labelPlacement='floating' placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}>
                        <div slot='label'>
                            Email <IonText color='danger'>*</IonText>
                        </div>
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput type='password' labelPlacement='floating' placeholder="Password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                        <div slot='label'>
                            Password <IonText color='danger'>*</IonText>
                        </div>
                    </IonInput>
                    <IonInput type='password' labelPlacement='floating' placeholder="Confirm Password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
                        <div slot='label'>
                            Confirm Password <IonText color='danger'>*</IonText>
                        </div>
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonButton style={{ margin: 'auto' }} onClick={handleSignUp}>Login</IonButton>
                </IonItem>
            </IonGrid>
        </IonCard>
    );
}