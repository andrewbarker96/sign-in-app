import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../util/firebase";
import { useState, useEffect } from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonText, IonToolbar, IonInput, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonTextarea } from "@ionic/react";
import TopMenu from "../components/TopMenu";
import { create, createOutline, pencil, save, saveOutline, trash, trashBinOutline } from "ionicons/icons";
import { groupBy } from "lodash";

export default function AdminPage() {
  const [guestData, setGuestData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [guestNotes, setGuestNotes] = useState<string | undefined>();

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

  // Update a guest's information and store it in Firestore
  const handleGuestUpdate = async (id: string, field: string, value: string) => {
    const updatedGuestData = guestData.map(guest => {
      if (guest.id === id) {
        return { ...guest, [field]: value };
      }
      return guest;
    });

    setGuestData(updatedGuestData);

    // Update the guest document in Firestore
    try {
      const guestDocRef = doc(firestore, "guests", id);
      await updateDoc(guestDocRef, { [field]: value });
      console.log(`Updated guest ${id}: ${field} set to ${value}`);
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  // Export the guest data to a CSV file
  const handleExport = () => {
    const confirmExport = window.confirm("Are you sure you want to export this data?");
    if (confirmExport) {
      const csv = guestData.map(guest => {
        const csv = `First Name,Last Name,Company,Email,Date,Time,Notes\n${guestData.map(guest => `${guest.firstName},${guest.lastName},${guest.company},${guest.email},${guest.date},${guest.time},${guest.notes}`).join('\n')}`;
      }).join('\n');

      const csvBlob = new Blob([csv], { type: 'text/csv' });
      const csvUrl = URL.createObjectURL(csvBlob);

      const a = document.createElement('a');
      a.href = csvUrl;
      a.download = 'guests.csv';
      a.click();
    }
  };

  // Remove a guest from the database
  const removeGuest = async (id: string) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this guest?");
    if (confirmRemove) {
      try {
        await deleteDoc(doc(firestore, "guests", id));
        const updatedGuestData = guestData.filter(guest => guest.id !== id);
        setGuestData(updatedGuestData);
      } catch (error) {
        console.error("Error removing guest:", error);
      }
    }
  };

  return (
    <IonPage className="main-content">
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h1>Admin</h1>
        </IonText>
        {Object.entries(groupBy(guestData, 'date')).map(([date, guests], index) => (
          <IonCard key={index} className="ion-padding" onClick={() => setSelectedDate(selectedDate === date ? undefined : date)}>
            <IonCardHeader>
              <IonCardTitle>{date}</IonCardTitle>
            </IonCardHeader>
            {selectedDate === date && guests.map((guest, index) => (
              <IonCardContent key={index} style={{ display: 'flex', justifyContent: 'space-between', alignContent: "center", marginLeft: '2%', marginRight: '2%' }}>
                <IonGrid>
                  <IonRow>

                    {/* Guest Information */}
                    <IonCol size="3">
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
                      <IonText>
                        <p>Arrival:</p>
                        <p>{guest.date} | {guest.time}</p>
                      </IonText>
                    </IonCol>

                    {/* Notes */}
                    <IonCol size="1" style={{ display: 'flex', justifyContent: 'right' }}>
                      <IonText>
                        <h2>Notes:</h2>
                      </IonText>
                    </IonCol>

                    {/* Notes Editable Text Area */}
                    <IonCol size="6">
                      {editingGuestId === guest.id ? (
                        <IonItem onClick={(e) => e.stopPropagation()}>
                          <IonTextarea value={guestNotes} onIonChange={(e) => setGuestNotes(e.detail.value!)} />
                        </IonItem>
                      ) : (
                        <IonText>
                          <h2>{guest.notes}</h2>
                        </IonText>
                      )}
                    </IonCol>

                    {/* Save & Delete Buttons */}
                    <IonCol size="2">
                      <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <IonButtons slot="primary">
                          {editingGuestId === guest.id ? (
                            <IonButton size="large" slot="icon-only" fill="clear" onClick={(e) => { e.stopPropagation(); handleGuestUpdate(guest.id, 'notes', guestNotes || ''); setEditingGuestId(null); }}>
                              <IonIcon icon={saveOutline} />
                            </IonButton>
                          ) : (
                            <IonButton size="large" slot="icon-only" fill="clear" onClick={(e) => { e.stopPropagation(); setEditingGuestId(guest.id); setGuestNotes(guest.notes || ''); }}>
                              <IonIcon icon={createOutline} />
                            </IonButton>
                          )}
                        </IonButtons>
                        <IonButtons slot="secondary">
                          <IonButton size="large" slot="icon-only" fill="clear" onClick={(e) => { e.stopPropagation(); removeGuest(guest.id) }}>
                            <IonIcon icon={trashBinOutline} />
                          </IonButton>
                        </IonButtons>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            ))}
            <IonButton onClick={(e) => { e.stopPropagation(); handleExport(); }}>Export</IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
