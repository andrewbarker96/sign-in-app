import { IonFabButton, IonIcon, IonItem, IonMenuToggle, IonText } from '@ionic/react'
import React from 'react'

interface MenuItemProps {
  icon: string;
  text: string;
  routerLink?: string;
  color?: string;
  onClick?: () => void;
  target?: string;
}

export const TopMenuButton: React.FC<MenuItemProps> = ({ icon, text, routerLink, color, onClick, target }) => {
  return (
    <IonMenuToggle>
      <IonItem
        button={true}
        detail={false}
        routerLink={routerLink}
        onClick={onClick}
        lines='none'
        target={target}
        style={{ marginBottom: '15px' }}
      >
        <IonFabButton style={{ height: '30px', width: '30px' }} color={color} size='small'>
          <IonIcon size='small' icon={icon} />
        </IonFabButton>
        <IonText>{text}</IonText>
      </IonItem>
    </IonMenuToggle>
  )
}
