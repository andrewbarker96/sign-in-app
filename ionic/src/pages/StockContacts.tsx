import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TextField,
  IconButton,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  Card,
  CardContent,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { supabase } from '../util/supabase';
import TopMenu from '../components/TopMenu';
import { IonPage } from '@ionic/react';

const DesktopContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContact, setEditedContact] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState('firstName');

  useEffect(() => {
    fetchContacts();
  }, [searchTerm]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*');

      if (error) {
        console.error('Error fetching Contacts:', error);
      } else {
        setContacts(data || []);
      }
    } catch (error) {
      console.error('Error fetching Contacts:', error);
    }
  };

  const handleEditContact = (contact: any) => {
    setEditedContact({ ...contact });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSaveContact = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(editedContact)
        .eq('id', editedContact.id);

      if (error) {
        console.error('Error updating contact:', error);
      } else if (data && data > 0) {
        setSelectedContact(data[0]);
      }

      setIsEditMode(false);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(value =>
      value &&
      typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'suffix', headerName: 'Suffix', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneWork', headerName: 'Work Phone', flex: 1 },
    { field: 'phoneMobile', headerName: 'Mobile Phone', flex: 1 },
    { field: 'phoneFax', headerName: 'Fax', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }: { row: any }) => (
        <IconButton onClick={() => handleEditContact(row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <IonPage>
      <TopMenu />
      <Typography variant="h4" align="center" gutterBottom>
        Contacts
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <IconButton onClick={() => setIsOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredContacts}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection={false}
          />
        </Grid>
      </Grid>

      {/* Contact Edit Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>{isEditMode ? 'Edit Contact' : 'View Contact'}</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <TextField
                label="First Name"
                value={editedContact?.firstName || ''}
                onChange={(e) => setEditedContact({ ...editedContact, firstName: e.target.value })}
                fullWidth
              />
              {/* Add similar fields for other contact details */}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          {isEditMode && (
            <Button onClick={handleSaveContact} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Action Sheet for Sorting */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Sort By:</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select field to sort by</InputLabel>
            <Input
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </IonPage>
  );
};

export default DesktopContactsPage;
