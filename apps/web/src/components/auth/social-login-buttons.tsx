import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login';

const SocialLoginButtons = () => {
  const handleGoogleSuccess = (response) => {
    // Handle Google login success
    console.log('Google login success:', response);
  };

  const handleGoogleFailure = (response) => {
    // Handle Google login failure
    console.error('Google login failed:', response);
  };

  const handleFacebookSuccess = (response) => {
    // Handle Facebook login success
    console.log('Facebook login success:', response);
  };

  const handleFacebookFailure = (response) => {
    // Handle Facebook login failure
    console.error('Facebook login failed:', response);
  };

  return (
    <div className="flex flex-col space-y-4">
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookSuccess}
        onFailure={handleFacebookFailure}
        textButton="Login with Facebook"
      />
    </div>
  );
};

export default SocialLoginButtons;