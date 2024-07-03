import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../util/firebase";
import { useState, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonPopover,
  IonChip,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonCardContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonInput,
} from "@ionic/react";
import {
  close,
  createOutline,
  saveOutline,
  search,
  arrowDownOutline,
  arrowUpOutline,
  shareOutline,
  timeOutline,
  arrowUp,
  arrowDown,
  filter,
} from "ionicons/icons";
import { groupBy } from "lodash";
import { IonSearchbar } from "@ionic/react";
import TopMenu from "../components/TopMenu";
import './Admin.css'

export default function AdminPage() {
  const [guestData, setGuestData] = useState<any[]>([]);
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [guestNotes, setGuestNotes] = useState<string | undefined>();
  const [searchText, setSearchText] = useState<string | undefined>();
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchGuestData = async () => {
      const guestCollection = collection(firestore, "guests");
      const guestSnapshot = await getDocs(guestCollection);
      const guests = guestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Guests:", guests);
      setGuestData(guests);
    };

    fetchGuestData();
  }, []);

  // Update a guest's information and store it in Firestore
  const handleGuestUpdate = async (id: string, field: string, value: string) => {
    const updatedGuestData = guestData.map((guest) => {
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

  // Export the guest data to a CSV file for a specific date
  const handleExport = (date: string) => {
    const confirmExport = window.confirm("Are you sure you want to export this data?");
    if (confirmExport) {
      const filteredGuests = guestData.filter((guest) => guest.date === date);
      const csv = filteredGuests
        .map((guest) => `${guest.firstName},${guest.lastName},${guest.company},${guest.email},${guest.date},${guest.signInTime},${guest.signOutTime},${guest.notes}`)
        .join("\n");

      const csvHeader = `First Name,Last Name,Company,Email,Date,Sign In Time,Sign Out Time,Notes\n`;
      const csvBlob = new Blob([csvHeader + csv], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);

      const a = document.createElement("a");
      a.href = csvUrl;
      a.download = `guests_${date}.csv`;
      a.click();
    }
  };

  // Sign out a guest
  const signOutGuest = async (id: string, currentSignOutTime: string) => {
    if (currentSignOutTime !== "") {
      alert("This guest has already been signed out.");
      return;
    }

    const confirmSignOut = window.confirm("Are you sure you want to sign out this guest?");
    if (confirmSignOut) {
      try {
        const guestDoc = doc(firestore, "guests", id);
        const signOutTime = new Date().toLocaleTimeString();
        await updateDoc(guestDoc, { signOutTime });
        console.log("Guest Signed Out:", id);

        // Update the local state to reflect the sign-out time change
        setGuestData(
          guestData.map((guest) => (guest.id === id ? { ...guest, signOutTime } : guest))
        );
      } catch (error) {
        console.error("Error signing out guest:", error);
      }
    }
  };

  // Sort guest data by date
  const sortedGuestData = Object.entries(groupBy(guestData, "date")).sort(([dateA], [dateB]) => {
    return sortOrder === 'desc' ? new Date(dateA).getTime() - new Date(dateB).getTime() : new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <TopMenu />
          <IonTitle>Admin Portal</IonTitle>
          <IonButtons slot="end">
            <IonButton
              id="search-bar"
              size="large"
              slot="icon-only"
              fill="clear"
              onClick={() => setShowSearchbar(true)}
            >
              <IonIcon icon={search} />
            </IonButton>
            <IonButton
              size="large"
              slot="icon-only"
              fill="clear"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <IonIcon icon={sortOrder === 'desc' ? filter : filter} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/* Guest Entries Sorted by Date then Time */}
        <IonAccordionGroup>
          {sortedGuestData.map(([date, guests], index) => (
            <IonAccordion key={index} value={date} className="accordion">
              <IonItem slot="header" color={'clear'} lines="full">
                <IonLabel><h2>{date}</h2></IonLabel>
              </IonItem>

              {/* Guest Information */}
              <IonCardContent className="ion-padding" slot="content">

                {guests.map((guest, index) => (
                  <IonGrid key={index}>
                    <IonRow>
                      <IonCol>
                        <IonList>
                          <IonText>
                            <div className="guestName">
                              {editingGuestId === guest.id ? (
                                <IonInput
                                  onClick={(e) => e.stopPropagation()}
                                  label="First Name"
                                  labelPlacement="stacked"
                                  color={"primary"}
                                  value={guest.firstName}
                                  onIonChange={(e) => handleGuestUpdate(guest.id, "firstName", e.detail.value!)}
                                />
                              ) : (
                                <h2>{guest.firstName}</h2>
                              )}
                              {editingGuestId === guest.id ? (
                                <IonInput
                                  onClick={(e) => e.stopPropagation()}
                                  label="Last Name"
                                  labelPlacement="stacked"
                                  color={"primary"}
                                  value={guest.lastName}
                                  onIonChange={(e) => handleGuestUpdate(guest.id, "firstName", e.detail.value!)}
                                />
                              ) : (
                                <h2>{guest.lastName} </h2>
                              )}
                            </div>
                          </IonText>
                          <IonText>
                            {editingGuestId === guest.id ? (
                              <IonInput
                                onClick={(e) => e.stopPropagation()}
                                label="Company"
                                labelPlacement="stacked"
                                color={"primary"}
                                value={guest.company}
                                onIonChange={(e) => handleGuestUpdate(guest.id, "company", e.detail.value!)}
                              />
                            ) : (
                              <p>{guest.company}</p>
                            )}
                          </IonText>
                          <IonText color={"medium"}>
                            {editingGuestId === guest.id ? (
                              <IonInput

                                onClick={(e) => e.stopPropagation()}
                                label="Notes"
                                labelPlacement="stacked"
                                color={"primary"}
                                value={guestNotes}
                                onIonChange={(e) => setGuestNotes(e.detail.value!)}
                              />
                            ) : (
                              <IonText>
                                <p>{guest.notes}</p>
                              </IonText>
                            )}
                          </IonText>
                          <IonText color={"primary"}>
                            <p>{guest.email}</p>
                          </IonText>
                          <IonText color={'success'}>
                            <p>{guest.signInTime}</p>
                          </IonText>
                          <IonText color={'danger'}>
                            <p>{guest.signOutTime}</p>
                          </IonText>
                        </IonList>
                      </IonCol>
                      <IonCol size="1">
                        <IonItem lines="none">
                          <IonButtons slot="end">
                            {editingGuestId === guest.id ? (
                              <IonButton
                                size="large"
                                slot="icon-only"
                                fill="clear"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleGuestUpdate(guest.id, "notes", guestNotes || "");
                                  setEditingGuestId(null);
                                }}
                              >
                                <IonIcon icon={saveOutline} />
                              </IonButton>
                            ) : (
                              <IonButton
                                size="large"
                                slot="icon-only"
                                fill="clear"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingGuestId(guest.id);
                                  setGuestNotes(guest.notes || "");
                                }}
                              >
                                <IonIcon icon={createOutline} />
                              </IonButton>
                            )}

                            <IonButton
                              size="large"
                              slot="icon-only"
                              fill="clear"
                              onClick={(e) => {
                                e.stopPropagation();
                                signOutGuest(guest.id, guest.signOutTime);
                              }}
                            >
                              <IonIcon icon={timeOutline} />
                            </IonButton>
                          </IonButtons>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                ))}
                <IonButton shape="round" expand="block" color={'primary'} fill="clear" onClick={() => handleExport(date)}>
                  <IonIcon slot="end" icon={shareOutline} />
                  <IonText>Export Guests for {date}</IonText>
                </IonButton>
              </IonCardContent>
            </IonAccordion>
          ))}
        </IonAccordionGroup>

        {/* Search Bar Popover */}
        <IonPopover trigger="search-bar">
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            onIonClear={() => setSearchText("")}
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
