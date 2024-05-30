import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../util/firebase";
import { useState, useEffect } from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonPage, IonText, IonItem, IonGrid, IonRow, IonCol, IonTextarea, IonActionSheet, IonPopover } from "@ionic/react";
import TopMenu from "../components/TopMenu";
import { close, create, createOutline, filter, filterOutline, pencil, save, saveOutline, search, trash, trashBinOutline } from "ionicons/icons";
import { groupBy } from "lodash";
import { IonSearchbar } from "@ionic/react";

export default function AdminPage() {
  const [guestData, setGuestData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [guestNotes, setGuestNotes] = useState<string | undefined>();
  const [searchText, setSearchText] = useState<string | undefined>();
  const [filteredGuestData, setFilteredGuestData] = useState<any[]>([]);
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);

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
        const csv = `First Name,Last Name,Company,Email,Date,Sign In Time,Sign Out Time,Notes\n${guestData.map(guest => `${guest.firstName},${guest.lastName},${guest.company},${guest.email},${guest.date},${guest.signInTime}, ${guest.signOutTime},${guest.notes}`).join('\n')}`;
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
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Top Bar (Search & Filter) */}
        <IonGrid style={{ alignContent: 'center' }}>
          <IonRow style={{ display: 'flex', alignContent: 'center' }}>
            <IonCol size='11' style={{ display: 'flex' }}>
              <IonText>
                <h2>Admin Portal</h2>
              </IonText>
            </IonCol>
            <IonCol size='1' style={{ display: 'flex', justifyContent: 'right' }}>
              <IonButtons>
                <IonButton id='search-bar' size="large" slot="icon-only" fill="clear" onClick={() => setShowSearchbar(true)}>
                  <IonIcon icon={search} />
                </IonButton>
                <IonButton size="large" slot="icon-only" fill="clear" onClick={() => setShowActionSheet(true)}>
                  <IonIcon icon={filterOutline} />
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Guest Entries Sorted by Date then Time */}
        {Object.entries(groupBy(guestData, 'date')).map(([date, guests], index) => (
          <IonCard key={index} className="ion-padding" onClick={() => setSelectedDate(selectedDate === date ? undefined : date)}>
            <IonCardHeader>
              <IonCardTitle>{date}</IonCardTitle>
            </IonCardHeader>
            {selectedDate === date && guests.map((guest, index) => (
              <IonCardContent key={index}>
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
                  <IonRow>
                    <IonCol size="1">
                      <br />
                      <IonText>
                        <p>Signed In:</p>
                        <p>Signed Out:</p>
                      </IonText>
                    </IonCol>
                    <IonCol size="1">
                      <br />
                      <IonText>
                        <p>{guest.signInTime}</p>
                        <p>{guest.signOutTime}</p>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            ))}
            <IonButton onClick={(e) => { e.stopPropagation(); handleExport(); }}>Export</IonButton>
          </IonCard>
        ))}

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Filter by Date',
              handler: () => {
                console.log('Filter by Date clicked');
              }
            },
            {
              text: 'Filter by Time',
              handler: () => {
                console.log('Filter by Time clicked');
              }
            },
            {
              text: 'Filter by Company',
              handler: () => {
                console.log('Filter by Company clicked');
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]}
        />

        <IonPopover trigger="search-bar">
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            onIonClear={() => setSearchText('')}
            onIonCancel={() => setShowSearchbar(false)}
            placeholder="Search"
            showCancelButton="focus"
            cancelButtonIcon={close}

          />
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}
