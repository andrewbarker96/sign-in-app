import React from 'react';
import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

const Action: React.FC = () => {
    return (
        <IonRow>
            <IonCol>
                <IonRouterLink href="/signin">Sign In</IonRouterLink>
            </IonCol>
            <IonCol>
                <IonRouterLink href="/login">Login</IonRouterLink>
            </IonCol>
        </IonRow>
    );
};