import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { sendForgotPasswordEmail } from '../../../lib/auth';
import { Button, Input } from '../../../components/ui';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await sendForgotPasswordEmail(email);
      setMessage('Check your email for a password reset link.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setMessage('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;