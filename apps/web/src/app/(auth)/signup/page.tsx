import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../../../lib/auth';
import SignupForm from '../../../components/auth/signup-form';

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await signup(formData);
      router.push('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
      {error && <p className="text-red-500">{error}</p>}
      <SignupForm onSubmit={handleSignup} loading={loading} />
    </div>
  );
};

export default SignupPage;