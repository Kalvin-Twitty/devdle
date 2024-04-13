import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SignInPage = () => {
  const { signIn, signInAnonymously, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously();
    } catch (error) {
      console.error("Error during anonymous sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-8">Welcome to Codele</h1>
        <button
          onClick={signIn}
          className="text-white bg-teal-500 hover:bg-teal-700 font-semibold py-2 px-4 border border-teal-700 rounded shadow mb-4"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleAnonymousSignIn}
          className="text-white bg-gray-700 hover:bg-gray-800 font-semibold py-2 px-4 border border-gray-800 rounded shadow"
        >
          Continue Anonymously
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
