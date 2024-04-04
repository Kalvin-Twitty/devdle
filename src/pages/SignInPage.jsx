import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home'); // Adjust the path as necessary
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};

export default SignInPage;
