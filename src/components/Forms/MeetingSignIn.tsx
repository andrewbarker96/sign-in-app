import React, { useEffect, useState } from 'react';
import { IonCard, IonItem, IonInput, IonList, IonSelect, IonSelectOption, IonButton, IonText } from '@ionic/react';
import { supabase } from '../../data/supabase';

function SignInForm() {
  const [personnelOptions, setPersonnelOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPersonnelData() {
      try {
        const { data, error } = await supabase.from('personnel').select('*');
        if (error) {
          console.error('Error fetching personnel data:', error.message);
        } else {
          const personnelNames = data.map(person => `${person.first_name} ${person.last_name}, ${person.title}`);
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

            const { data, error } = await supabase.from('visitors').insert([
                {
                    first_name: firstNameInput.value,
                    last_name: lastNameInput.value,
                    email: emailInput.value,
                    company: companyInput.value,
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
    <IonCard style={{marginLeft:'10%', marginRight:'10%'}}>
        <IonItem>
            <IonInput id='FirstName' type='text' labelPlacement='floating' placeholder="First Name" >
                <div slot='label'>
                    First Name <IonText color='danger'>*</IonText>
                </div>
            </IonInput>
        </IonItem>
        <IonItem>
            <IonInput id='LastName' type='text' placeholder="Last Name" labelPlacement='floating'>
                <div slot='label'>
                    Last Name <IonText color='danger'>*</IonText>
                </div>
            </IonInput>
        </IonItem>
        <IonItem>
            <IonInput type='email' placeholder="Email" labelPlacement='floating'>
                <div slot='label'>
                    Email <IonText color='danger'>*</IonText>
                </div>
            </IonInput>
        </IonItem>
        <IonItem>
            <IonInput type='text' placeholder="Company" labelPlacement='floating'>
                <div slot='label'>
                    Company <IonText color='danger'>*</IonText>
                </div>
            </IonInput>
        </IonItem>
        <IonItem>
            <IonSelect label='Who are you meeting with?' labelPlacement='floating' interface='alert' placeholder="Select" multiple={true}>
                {personnelOptions.map((personnelName) => (
                    <IonSelectOption key={personnelName} value={personnelName}>
                        {personnelName}
                    </IonSelectOption>
                ))}
                <div slot='label'>
                    <IonText color='danger'>*</IonText>
                </div>
            </IonSelect>
        </IonItem>
        <IonItem>
            <IonButton style={{margin:'auto'}} onClick={handleFormSubmit}>Submit</IonButton>
        </IonItem>
    </IonCard>
);
}

export default SignInForm;
