import React, { useState } from 'react';

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  suffix: string;
  title: string;
  phone: string;
  direct: string;
  email: string;
  image: string;
  on_site: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ firstName, lastName, suffix, title, phone, direct, email, image, on_site }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderIndicator = () => {
    if (on_site === true) {
      return <div style={{ backgroundColor: 'green', width: '10px', height: '10px', borderRadius: '50%', marginLeft:'10px' }} />;
    } else if (on_site === false) {
      return <div style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%' , marginLeft:'10px'}} />;
    } else {
      return null;
    }
  };
  
  return (
    <div className="employee-card" style={{ margin: '2%', paddingTop: '1%', paddingBottom:'2%', display: 'flex', alignItems: 'center' }}>
      {!imageLoaded && <div style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '2%', backgroundColor: '#ccc' }} />}
      <img 
        src={image} 
        alt='employee' 
        style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '2%', objectFit:'cover', display: imageLoaded ? 'block' : 'none' }} 
        onLoad={() => setImageLoaded(true)}
      />
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center' }}>{firstName} {lastName} {renderIndicator()} </h3>
        <h5 style={{display:'flex', alignItems:'center'}}>{suffix} {title}</h5>
        <h6><a href={`mailto:${email}`}>{email}</a></h6>
        <h6>C:<a href={`tel:${phone}`}>{phone}</a> | D:<a href={`tel:${direct}`}> {direct}</a></h6>
      </div>
    </div>
  );
};

export default EmployeeCard;
