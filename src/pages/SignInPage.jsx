import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-8">Welcome to Codele</h1>
        <button
          onClick={signIn}
          className="text-white bg-teal-500 hover:bg-teal-700 font-semibold py-2 px-4 border border-teal-700 rounded shadow"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
