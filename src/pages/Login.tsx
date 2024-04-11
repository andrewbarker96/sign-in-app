import { IonCard, IonGrid, IonRow, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { loginFormInputValidation } from '../data/utils';
import { loginFields, registerFields } from '../data/fields';
import { LoginForm } from '../components/Forms/Login';
import { validateForm } from '../data/utils';
import './Login.css';
import { useParams } from 'react-router';

const LoginPage: React.FC = () => {
    
    const params = useParams<{ id: string }>();
    
    const fields = loginFields;

    return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
            <IonContent>
            <IonItem>
                <div style={{ marginRight: '35%', marginLeft:'35%', paddingTop:'20px', paddingBottom:'20px'}}>
                    <img src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" width="auto" height="auto" />
                </div> 
            </IonItem>
            <LoginForm />
        </IonContent>
    </IonPage>
  );
};

export default LoginPage;