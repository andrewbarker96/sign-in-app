import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../util/firebase";
import { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonPage, IonText, IonGrid, IonRow, IonCol } from "@ionic/react";
import { exitOutline } from "ionicons/icons";
import { groupBy } from "lodash";

export default function SignOut() {
  const [guestData, setGuestData] = useState<any[]>([]);

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
    <IonPage className="main-content">
      <IonContent fullscreen className="ion-padding">

        {/* Guest Entries Sorted by Date then Time */}
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
                        <h2>{guest.firstName} {guest.lastName}</h2>
                      </IonText>
                      <IonText>
                        <p>{guest.company}</p>
                      </IonText>
                      <IonText color={'primary'}>
                        <p>{guest.email}</p>
                      </IonText>
                      <br />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="3">
                      <IonText>
                        <p>Sign In Time:</p>
                      </IonText>
                    </IonCol>
                    <IonCol size="3">
                      <IonText>
                        <p>{guest.signInTime}</p>
                      </IonText>
                    </IonCol>
                    <IonCol size="12">
                      <IonButton expand="block" onClick={() => handleSignOut(guest.id)}><IonIcon slot="end" icon={exitOutline} />Sign Out</IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            ))}
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
