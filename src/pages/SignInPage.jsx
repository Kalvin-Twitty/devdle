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
      <div className="rounded-lg p-8 shadow-lg bg-gray-800 text-center max-w-sm w-full">
        <h1 className="text-4xl text-teal-400 font-bold mb-6">Welcome to Codele</h1>
        <p className="text-white mb-6">The best place to sharpen your coding skills daily!</p>
        <button
          onClick={signIn}
          className="text-white bg-teal-500 hover:bg-teal-600 font-semibold py-2 px-6 border border-teal-600 rounded shadow mb-4 w-full transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignInPage;
