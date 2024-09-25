import { IonButton, IonIcon, IonText } from '@ionic/react'
import React from 'react'

interface ButtonProps {
  text?: string
  icon?: string
  slot?: 'start' | 'end'
  fill?: 'clear' | 'outline' | 'solid'
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'
  textColor?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark'
  size?: 'default' | 'small' | 'large'
  routerLink?: string
  onClick?: () => void
}

export const StockButton: React.FC<ButtonProps> = ({ text, icon, slot, fill, color, textColor, size, routerLink, onClick }) => {
  return (
    <>
      <IonButton
        fill={fill}
        shape={'round'}
        expand={'block'}
        color={color}
        size={size}
        routerLink={routerLink}
        onClick={onClick}
      >
        <IonIcon icon={icon} slot={slot} />
        <IonText color={textColor}>{text}</IonText>
      </IonButton>
    </>
  )
};
