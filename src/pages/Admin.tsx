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
  IonActionSheet,
  IonPopover,
  IonChip,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonCardContent,
} from "@ionic/react";
import {
  close,
  createOutline,
  filterOutline,
  logIn,
  logInOutline,
  logOut,
  logOutOutline,
  saveOutline,
  search,
  time,
  timeOutline,
} from "ionicons/icons";
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

  // Export the guest data to a CSV file
  const handleExport = () => {
    const confirmExport = window.confirm("Are you sure you want to export this data?");
    if (confirmExport) {
      const csv = guestData
        .map(
          (guest) =>
            `${guest.firstName},${guest.lastName},${guest.company},${guest.email},${guest.date},${guest.signInTime},${guest.signOutTime},${guest.notes}`
        )
        .join("\n");

      const csvHeader = `First Name,Last Name,Company,Email,Date,Sign In Time,Sign Out Time,Notes\n`;
      const csvBlob = new Blob([csvHeader + csv], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);

      const a = document.createElement("a");
      a.href = csvUrl;
      a.download = "guests.csv";
      a.click();
    }
  };

  // Remove a guest from the database
  const removeGuest = async (id: string) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this guest?");
    if (confirmRemove) {
      try {
        await deleteDoc(doc(firestore, "guests", id));
        const updatedGuestData = guestData.filter((guest) => guest.id !== id);
        setGuestData(updatedGuestData);
      } catch (error) {
        console.error("Error removing guest:", error);
      }
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

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Top Bar (Search & Filter) */}
        <IonGrid style={{ alignContent: "center" }}>
          <IonRow style={{ display: "flex", alignContent: "center" }}>
            <IonCol size="11" style={{ display: "flex" }}>
              <IonText>
                <h2>Admin Portal</h2>
              </IonText>
            </IonCol>
            <IonCol size="1" style={{ display: "flex", justifyContent: "right" }}>
              <IonButtons>
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
                  onClick={() => setShowActionSheet(true)}
                >
                  <IonIcon icon={filterOutline} />
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Guest Entries Sorted by Date then Time */}
        <IonAccordionGroup>
          {Object.entries(groupBy(guestData, "date")).map(([date, guests], index) => (
            <IonAccordion key={index} value={date}>
              <IonItem slot="header" color={'primary'}>
                <IonLabel><h2>{date}</h2></IonLabel>
              </IonItem>

              {/* Guest Information */}
              <IonCardContent className="ion-padding" slot="content">
                {guests.map((guest, index) => (
                  <IonGrid key={index}>
                    <IonRow>
                      <IonCol sizeLg="5">
                        <IonText>
                          <h2>{guest.firstName} {guest.lastName}</h2>
                        </IonText>
                        <IonText>
                          <p>{guest.company}</p>
                        </IonText>
                        <IonText color={"primary"}>
                          <p>{guest.email}</p>
                        </IonText>
                        <IonChip color={"success"}>
                          <IonText>{guest.signInTime}</IonText>
                        </IonChip>
                        <IonChip color={"danger"}>
                          <IonText>{guest.signOutTime}</IonText>
                        </IonChip>
                      </IonCol>

                      {/* Notes */}
                      <IonCol sizeLg="1" style={{ display: "flex", justifyContent: "right" }}>
                        <IonText>
                          <p>Notes:</p>
                        </IonText>
                      </IonCol>

                      {/* Notes Editable Text Area */}
                      <IonCol sizeLg="5">
                        {editingGuestId === guest.id ? (
                          <IonItem onClick={(e) => e.stopPropagation()}>
                            <IonTextarea
                              value={guestNotes}
                              onIonChange={(e) => setGuestNotes(e.detail.value!)}
                            />
                          </IonItem>
                        ) : (
                          <IonText>
                            <h2>{guest.notes}</h2>
                          </IonText>
                        )}
                      </IonCol>

                      {/* Save & Sign Out Buttons */}
                      <IonCol sizeLg="1">
                        <IonButtons>
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
                            <IonIcon icon={logOutOutline} />
                          </IonButton>
                        </IonButtons>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                ))}
                <IonButton expand="block" onClick={(e) => handleExport()}>
                  Export Guests for {date}
                </IonButton>
              </IonCardContent>
            </IonAccordion>
          ))}
        </IonAccordionGroup>

        {/* Action Sheet for Filtering */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Filter by Date",
              handler: () => {
                console.log("Filter by Date clicked");
              },
            },
            {
              text: "Filter by Time",
              handler: () => {
                console.log("Filter by Time clicked");
              },
            },
            {
              text: "Filter by Company",
              handler: () => {
                console.log("Filter by Company clicked");
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        />

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
