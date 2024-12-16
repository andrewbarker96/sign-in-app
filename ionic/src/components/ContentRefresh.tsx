import React from 'react'
import { IonRefresher } from '@ionic/react'

const ContentRefresh = () => {
  return (
    <IonRefresher slot="fixed" onIonRefresh={() => window.location.reload()}>
    </IonRefresher>
  )
}

export default ContentRefresh