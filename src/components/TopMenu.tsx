import { useState, useEffect } from 'react';
import { supabase } from '../util/supabase';
import { IonButton, IonIcon } from '@ionic/react';
import { personCircleOutline, logOutOutline, menuOutline } from 'ionicons/icons';

const TopMenu = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                // Handle error
                console.error('Error fetching session:', error);
            } else if (data && data.session) {
                // User is logged in
                setIsLoggedIn(true);
            } else {
                // User is not logged in
                setIsLoggedIn(false);
            }
        };
        checkSession();
    }, []);

    const handleLogout = async () => {
      let { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Error logging out:', error);
      } else {
        setIsLoggedIn(false); 
        console.log('User logged out successfully');
        window.location.href = '/';
      }
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    if (!isLoggedIn) {
        return null; // Do not render TopMenu if user is not logged in
    }

    return (
        <div>
            <IonButton onClick={toggleMenu} fill='clear'>
              <IonIcon icon={menuOutline} onClick={toggleMenu}/>
            </IonButton>
            {showMenu && (
                <div>
                    <IonButton fill='clear' expand='block'>
                        <IonIcon icon={personCircleOutline} />
                        Profile
                    </IonButton>
                    <br />
                    <IonButton fill='clear' expand='block' onClick={handleLogout}>
                        <IonIcon icon={logOutOutline} />
                        Logout
                    </IonButton>
                </div>
            )}
        </div>
    );
};

export default TopMenu;