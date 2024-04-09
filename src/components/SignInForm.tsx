import './SignInForm.css';

interface SignInFormProps {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ first_name, last_name, email, company }) => {
  return (
    <div className="container">
      <input type="text" placeholder="First Name" value={first_name} />
      <input type="text" placeholder="Last Name" value={last_name} />
      <input type="email" placeholder="Email" value={email} />
      <input type="text" placeholder="Company" value={company} />
    </div>
  );
};