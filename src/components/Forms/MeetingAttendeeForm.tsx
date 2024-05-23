import { useEffect, useState } from 'react';
import { IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonText, IonModal, IonActionSheet, IonIcon } from '@ionic/react';
import { supabase } from '../../util/supabase';
import { addSharp } from 'ionicons/icons';

function SignInForm() {
  const [personnelOptions, setPersonnelOptions] = useState<string[]>([]);
  const [selectedIndividuals, setSelectedIndividuals] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [addAnotherPerson, setAddAnotherPerson] = useState(false);

  useEffect(() => {
    async function fetchPersonnelData() {
      try {
        const { data, error } = await supabase.from('personnel').select('*');
        if (error) {
          console.error('Error fetching personnel data:', error.message);
        } else {
          const personnelNames = data.map(person => `${person.first_name} ${person.last_name}, ${person.suffix}`);
          setPersonnelOptions(personnelNames);
        }
      } catch (error) {
        console.error('Error fetching personnel data:', error);
      }
    }
    fetchPersonnelData();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const firstNameInput = document.getElementById('FirstName') as HTMLInputElement;
      const lastNameInput = document.getElementById('LastName') as HTMLInputElement;
      const emailInput = document.getElementById('Email') as HTMLInputElement;
      const companyInput = document.getElementById('Company') as HTMLInputElement;

      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: selectedIndividuals,
        }),
      });

      if (!response.ok) {
        console.error('Error sending email:', await response.text());
      }
      const { data, error } = await supabase.from('guests').insert([
        {
          first_name: firstNameInput.value,
          last_name: lastNameInput.value,
          email: emailInput.value,
          company: companyInput.value,
          arrival_time: new Date(),
        }
      ]);

      
      if (error) {
        console.error('Error inserting visitor:', error.message);
      } else {
        console.log('Visitor inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error inserting visitor:', error);
    }
  }

  return (
    <>
      <IonItem>
        <IonInput id='FirstName' type='text' labelPlacement='floating' placeholder='ex. John' >
          <IonText slot='label'>First Name
            <IonText color='danger'>*</IonText>
          </IonText>
        </IonInput>
      </IonItem>
      <IonItem>
        <IonInput id='LastName' type='text' labelPlacement='floating' placeholder='ex. Doe'>
          <IonText slot='label'>
            Last Name <IonText color='danger'>*</IonText>
          </IonText>
        </IonInput>
      </IonItem>
      <IonItem>
        <IonInput type='email' labelPlacement='floating' placeholder='ex. johndoe@company.com'>
          <IonText slot='label'>
            Email <IonText color='danger'>*</IonText>
          </IonText>
        </IonInput>
      </IonItem>
      <IonItem>
        <IonInput type='text' labelPlacement='floating' placeholder='ex. Stock & Associates'>
          <IonText slot='label'>
            Company <IonText color='danger'>*</IonText>
          </IonText>
        </IonInput>
      </IonItem>
      <IonItem>
        {/* <IonSelect 
          label='Who are you meeting with?' 
          interface='alert' 
          placeholder="Select" 
          multiple={true}
          onIonChange={e => setSelectedIndividuals(e.detail.value)}
        >
          {personnelOptions.map((personnelName) => (
            <IonSelectOption key={personnelName} value={personnelName}>
              {personnelName}
            </IonSelectOption>
          ))}
        </IonSelect> */}
      </IonItem>
      <IonButton expand='block' color={'medium'} onClick={() => setShowActionSheet(true)}><IonIcon icon={addSharp} slot='start' /> Add Another Person</IonButton>
      <IonButton expand='block' onClick={handleFormSubmit}>Submit</IonButton>
    </>
  );
}

export default SignInForm;
