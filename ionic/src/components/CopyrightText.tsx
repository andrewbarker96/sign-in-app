import { IonText } from "@ionic/react";


const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <IonText className="copyright">Copyright © { year }<br/>Stock & Associates Consulting Engineers, Inc.</IonText>
  )
}

export default Copyright