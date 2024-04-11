import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '../../data/supabase';
import { Route } from 'react-router';

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
        // Perform validation here

        // Connect to Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
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
                </IonItem>
                <IonItem>
                    <IonButton style={{ margin: 'auto' }} onClick={handleLogin}>Login</IonButton>
                </IonItem>
                {isLoggedIn && <IonText color={'danger'}>You are already logged in.</IonText>}
            </IonGrid>
        </IonCard>
    );
}
