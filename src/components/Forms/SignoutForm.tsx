import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../util/firebase";
import { useState, useEffect } from "react";
import { IonCard, IonItem, IonLabel, IonNote, IonText, IonTitle } from "@ionic/react";
import { StockButton } from "../UI/button";

export const SignOut: React.FC = () => {
  const [guestData, setGuestData] = useState<any[]>([]); // Initialize as an array
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchGuestData = async () => {
      const date = new Date().toDateString();
      const docRef = doc(firestore, "guests", date);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const guestList = docSnap.data()?.guestList;
          if (guestList) {
            const guestArray = Object.values(guestList);
            const signedInGuests = guestArray.filter((guest: any) => !guest.signOutTime);
            setGuestData(signedInGuests);
          }
        }
      } catch (error) {
        console.error("Error fetching guest data:", error);
      }
    };
    fetchGuestData();
  }, []);

  const handleSignOut = async (guest: any) => {
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const docRef = doc(firestore, "guests", date);
    try {
      await updateDoc(docRef, {
        [`guestList.${guest.name}.signOutTime`]: time,
      });
      setGuestData((prevGuestData) => prevGuestData.filter((g) => g.name !== guest.name));
      setSuccess(true);
      alert(`You been signed out successfully!\nThank you for visiting Stock & Associates ${guest.name.split(" ")[0]}!`);
    } catch (error) {
      console.error("Error signing out guest:", error);
    }
  };


  return (
    <>
      {/* Conditionally render the guest data */}
      {guestData.length > 0 ? (
        guestData.map((guest, index) => (
          <IonCard key={index} style={{ paddingBottom: '10px' }}>
            <IonItem>
              <div className="start">
                <IonText style={{ fontSize: '1.25em' }}>
                  {guest.name}
                </IonText>
                <IonLabel color={'dark'}>
                  {guest.email}
                </IonLabel>
                <IonLabel color={"dark"}>
                  {guest.company}
                </IonLabel>
              </div>
              <div slot="end">
                <IonNote color={'dark'}>
                  {guest.signInTime}
                </IonNote>
              </div>
            </IonItem>
            <StockButton text="Sign Out" color="dark" onClick={() => handleSignOut(guest)} />
          </IonCard>
        ))
      ) : (
        <IonItem className="ion-text-center">
          <IonTitle>No guests found.</IonTitle>
        </IonItem>
      )}
    </>
  );
}
