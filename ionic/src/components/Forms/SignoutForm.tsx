import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../util/firebase";
import { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonPage, IonText, IonGrid, IonRow, IonCol, IonButtons, IonToast } from "@ionic/react";
import { checkmarkCircle, exitOutline } from "ionicons/icons";
import { groupBy, set } from "lodash";

export default function SignOut() {
  const [guestData, setGuestData] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchGuestData = async () => {
      const guestCollection = collection(firestore, "guests");
      const guestSnapshot = await getDocs(guestCollection);
      const guests = guestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Guests:", guests);
      setGuestData(guests);
    };

    fetchGuestData();
  }, []);

  // Update the sign-out time for a guest in the database
  const handleSignOut = async (id: string) => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      try {
        const guestDoc = doc(firestore, "guests", id);
        const signOutTime = new Date().toLocaleTimeString();
        await updateDoc(guestDoc, { signOutTime });
        console.log("Guest Signed Out:", id);
        setSuccess(true);

        // Update the local state to reflect the sign-out time change
        setGuestData(guestData.map(guest =>
          guest.id === id ? { ...guest, signOutTime } : guest
        ));
      } catch (error) {
        console.error("Error signing out guest:", error);
      }
    }
  }

  // Filter out guests who have signed out
  const signedInGuests = guestData.filter(guest => !guest.signOutTime);

  return (
    <IonContent fullscreen className="ion-padding">
      {Object.entries(groupBy(signedInGuests, 'date')).map(([date, guests], index) => (
        <IonCard key={index} className="ion-padding">
          <IonCardHeader>
            <IonCardTitle>{date}</IonCardTitle>
          </IonCardHeader>
          {guests.map((guest, index) => (
            <IonCardContent key={index}>
              <IonGrid>
                <IonRow>

                  {/* Guest Information */}
                  <IonCol size="12">
                    <IonText>
                      <h2>{guest.firstName} {guest.lastName} | {guest.company}</h2>
                    </IonText>
                    <IonText color={'primary'}>
                      <h2>{guest.email}</h2>
                    </IonText>
                  </IonCol>
                  <IonCol size="12">
                    <IonButtons>
                      <IonIcon icon={checkmarkCircle} color='success' slot="start" />
                      <IonText>
                        <h2>{guest.signInTime}</h2>
                      </IonText>
                    </IonButtons>
                  </IonCol>
                  <IonCol size="12">
                    <IonButton shape="round" color={'dark'} expand="block" onClick={() => handleSignOut(guest.id)}><IonIcon slot="end" icon={exitOutline} />Sign Out</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          ))}
        </IonCard>
      ))}
      <IonToast color={'success'} isOpen={success} onDidDismiss={() => setSuccess(false)} message="Guest signed out successfully!" duration={2000} />
    </IonContent>
  );
}
