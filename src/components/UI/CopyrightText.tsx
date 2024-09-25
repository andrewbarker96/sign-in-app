import { IonItem, IonNote, IonText } from "@ionic/react";


export const Copyright: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <IonItem>
        <IonNote className="ion-text-center">
          Copyright © {year} Stock & Associates Consulting Engineers, Inc.
        </IonNote>
      </IonItem>
    </>
  )
};
