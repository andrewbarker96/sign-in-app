import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../util/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonToolbar } from "@ionic/react";
import TopMenu from "../components/TopMenu";
import { trashBin, trashBinOutline } from "ionicons/icons";
import { groupBy } from "lodash";


export default function AdminPage() {
  const [guestData, setGuestData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

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

  const handleNoteChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedGuestData = guestData.map(guest => {
      if (guest.id === id) {
        return { ...guest, notes: e.target.value };
      }
      return guest;
    });

    console.log("Updated Guest Data:", updatedGuestData);

    setGuestData(updatedGuestData);
  };

  const handleExport = () => {
    const confirmExport = window.confirm("Are you sure you want to export this data?");
    if (confirmExport) {
      const csv = guestData.map(guest => {
        return `${guest.firstName},${guest.lastName},${guest.company},${guest.email},${guest.time}, ${guest.date},${guest.notes || ''}`;
      }).join('\n');

      console.log("CSV:", csv); 

      const csvBlob = new Blob([csv], { type: 'text/csv' });
      const csvUrl = URL.createObjectURL(csvBlob);

      const a = document.createElement('a');
      a.href = csvUrl;
      a.download = 'guests.csv';
      a.click();
    }
  };

  const removeGuest = async (id: string) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this guest?");
    if (confirmRemove) {
      // Remove guest from database
      try {
        await deleteDoc(doc(firestore, "guests", id));
        const updatedGuestData = guestData.filter(guest => guest.id !== id);
        setGuestData(updatedGuestData);
      } catch (error) {
        console.error("Error removing guest:", error);
      }
    }
  }
    const datePicker = (dateString: string) => {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();
      return utcDay !== 0 && utcDay !== 6;
    };
      
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h1>Admin Page</h1>
        </IonText>
        {Object.entries(groupBy(guestData, 'date')).map(([date, guests], index) => (
          <IonCard key={index} className="ion-padding" onClick={() => setSelectedDate(selectedDate === date ? undefined : date)}>
            <IonCardHeader>
              <IonCardTitle>{date}</IonCardTitle>
            </IonCardHeader>
            {selectedDate === date && guests.map((guest, index) => (
              <IonCardContent key={index} style={{display:'flex', justifyContent:'space-between', alignContent:"center", marginLeft:'2%', marginRight:'2%'}}>
                <div>
                  <IonText>
                    <h2>{guest.firstName} {guest.lastName}</h2>
                  </IonText>
                  <IonText>
                    <p>{guest.company}</p>
                  </IonText>
                  <IonText color={'primary'}>
                    <p>{guest.email}</p>
                  </IonText>
                  <IonText>
                    <p>{guest.date}</p>
                  </IonText>
                </div>
                <div>
                  <IonButton fill="clear" onClick={(e) => { e.stopPropagation(); removeGuest(guest.id) }}>
                    <IonIcon icon={trashBinOutline} size='large' />
                  </IonButton>
                </div>
              </IonCardContent>
            ))}
            <IonButton onClick={handleExport}>Export to Email/PDF</IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
