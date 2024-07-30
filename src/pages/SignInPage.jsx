// SignInPage.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from '../firebase/authService';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      // Sign in successful, navigate to the next page or update UI
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          {/* Your form inputs */}
          <div>
            <button type="submit" className="...">
              Sign in
            </button>
          </div>
        </form>
        {/* Link to navigate to the sign-up page */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
