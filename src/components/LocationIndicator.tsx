import React from 'react'
import { supabase } from '../util/supabase'

const LocationIndicator = () => {
  const [onSite, setOnSite] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const fetchOnSiteStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('personnel')
          .select('on_site')
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setOnSite(data.on_site);
        }
      } catch (error) {
        console.error('Error fetching on-site status:', error);
      }
    };

    fetchOnSiteStatus();
  }, []);

  const renderIndicator = () => {
    if (onSite === true) {
      return <div style={{ backgroundColor: 'green', width: '10px', height: '10px', borderRadius: '50%' }} />;
    } else if (onSite === false) {
      return <div style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />;
    } else {
      return null;
    }
  };

  return (
    <div>
      {renderIndicator()}
    </div>
  );
}

export default LocationIndicator