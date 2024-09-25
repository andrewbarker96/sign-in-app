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
  IonMenuButton,
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
  trashBinOutline,
} from "ionicons/icons";
import { IonSearchbar } from "@ionic/react";
import TopMenu from "../components/UI/TopMenu";
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

  const deleteGuestData = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this guest?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(firestore, "guests", id));
        setGuestData(guestData.filter((guest) => guest.id !== id));
        console.log("Guest Deleted:", id);
      } catch (error) {
        console.error("Error deleting guest:", error);
      }
    }
  };

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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonMenuButton slot="start" />
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
      <IonContent className="ion-padding">



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
