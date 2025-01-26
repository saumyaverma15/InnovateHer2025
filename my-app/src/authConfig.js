import { Auth0Client } from '@auth0/auth0-spa-js';

export const authConfig = {
    domain: "dev-w0ivmxdqoaz5pywq.us.auth0.com",
    clientId: "0YN1GyKaUk50aMVRGt00sKgCm4UOtocQ",
    redirectUri: window.location.origin + '/callback'
  };
  
  
  export const auth0Client = new Auth0Client({
    ...authConfig,
    responseType: 'code',
    scope: 'openid profile email'
  });
  
  export const handleAuth0Login = async () => {
    try {
      await auth0Client.loginWithRedirect({
        appState: { returnTo: '/dashboard' }
      });
    } catch (error) {
      console.error('Auth0 Login Error:', error);
      alert('Login failed. Please try again.');
    }
  };
  
  export const handleCallback = async () => {
    try {
      const result = await auth0Client.handleRedirectCallback();
      const user = await auth0Client.getUser();
      
      window.location.replace(result.appState?.returnTo || '/dashboard');
      return user;
    } catch (error) {
      console.error('Callback Error:', error);
      window.location.replace('/login');
    }
  };