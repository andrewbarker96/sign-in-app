import React, { useEffect, useState } from 'react';
import { IonCard, IonItem, IonInput, IonList, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

const URL = environment.supabaseURL;
const KEY = environment.supabaseKey;

const supabase = createClient(URL, KEY);

function SignInForm() {
  const [personnelOptions, setPersonnelOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPersonnelData() {
      try {
        const { data, error } = await supabase.from('personnel').select('first_name, last_name');
        if (error) {
          console.error('Error fetching personnel data:', error.message);
        } else {
          const personnelNames = data.map(person => `${person.first_name} ${person.last_name}`);
          setPersonnelOptions(personnelNames);
        }
      } catch (error) {
        console.error('Error fetching personnel data:', error);
      }
    }
    fetchPersonnelData();
  }, []);
  

  return (
    <IonCard>
      <IonItem>
        <IonInput type='text' placeholder="First Name"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput type='text' placeholder="Last Name"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput type='email'placeholder="Email"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput type='text' placeholder="Company"></IonInput>
      </IonItem>
      <IonItem>
        <IonSelect label='Who are you meeting with?' placeholder="Select" multiple={true}>
          {personnelOptions.map((personnelName) => (
            <IonSelectOption key={personnelName} value={personnelName}>
              {personnelName}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonButton>Submit</IonButton>
      </IonItem>
    </IonCard>
  );
}

export default SignInForm;
