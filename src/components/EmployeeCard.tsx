import React from 'react';
import { call } from 'ionicons/icons';

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  suffix: string;
  title: string;
  phone: string;
  direct: string;
  email: string;
  image: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ firstName, lastName, suffix, title, phone, direct, email, image }) => {
  return (
    <div className="employee-card" style={{ margin: '2%', paddingTop: '1%', display: 'flex', alignItems: 'center' }}>
      <img src={image} alt='employee' style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '2%', objectFit:'cover' }} />
      <div>
        <h2>{firstName} {lastName}, {suffix} {title}</h2>
        <h6><a href={`mailto:${email}`}>{email}</a></h6>
        <h6>C:<a href={`tel:${phone}`}>{phone}</a> | D:<a href={`tel:${direct}`}> { direct }</a></h6>
      </div>
    </div>
  );
};

export default EmployeeCard;