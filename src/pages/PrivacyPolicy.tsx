import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBackCircle } from 'ionicons/icons'
import React from 'react'
import GoBackOption from '../components/backButton'
import { useHistory } from 'react-router-dom'

const PrivacyPolicyPage: React.FC = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <GoBackOption />
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='form'>
        <div className="form">
          <IonItem>
            <IonText className='ion-text-start-flex'>
              <h1>Privacy Policy</h1>
            </IonText>
            <IonImg slot='end' src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '100px' }} />
          </IonItem>
          <IonItem>
            <IonText>
              <p>
                Your privacy is important to us. It is Stock & Associates' policy to respect your privacy regarding any information we may collect from you across our application, and other sites we own and operate.
              </p>
              <h2>Information We Collect</h2>
              <p>
                We collect the following information via Firebase for internal usage:
              </p>
              <ul>
                <li>Name</li>
                <li>Email</li>
                <li>Company</li>
                <li>Time arriving and leaving Stock & Associates office</li>
              </ul>
              <h2>How We Use Information</h2>
              <p>
                We use the collected information for:
              </p>
              <ul>
                <li>Providing and maintaining our services</li>
                <li>Understanding how our users interact with our application</li>
                <li>Improving user experience and our services</li>
                <li>Monitoring usage of our services</li>
              </ul>
              <h2>Data Security</h2>
              <p>
                We are committed to ensuring the security of your information. We use industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction.
              </p>
              <h2>Third-Party Services</h2>
              <p>
                Our application may employ third-party services that collect, monitor, and analyze information to improve our service's functionality. Firebase, a Google service, is one such third-party service provider.
              </p>
              <h2>Data Retention</h2>
              <p>
                We retain collected information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.
              </p>
              <h2>Your Rights</h2>
              <p>
                You have the right to access, update, or delete the personal information we have on you. If you wish to exercise any of these rights, please contact us through the contact information provided below.
              </p>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us via our website:
              </p>
              <p>
                <a href="https://stockassoc.com/contact">stockassoc.com</a>
              </p>

            </IonText>
          </IonItem>

          <IonButton fill='outline' color={'primary'} shape='round' expand='block' onClick={goBack}>
            <IonText>Return</IonText>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default PrivacyPolicyPage