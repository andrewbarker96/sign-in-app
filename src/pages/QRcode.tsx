import { IonContent, IonImg, IonItem, IonPage } from '@ionic/react'
import React from 'react'

export const QRcode: React.FC = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonImg src="https://stockassoc.com/wp-content/uploads/2023/11/Blue.svg" alt="Stock & Associates" style={{ height: '175px', marginTop: '2.5%' }} />

        <IonItem>
          <IonImg className='ion-text-center' src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld" style={{ margin: 'auto' }} />
        </IonItem>

      </IonContent>
    </IonPage>
  )
}
