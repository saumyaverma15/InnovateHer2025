import { Link } from "react-router-dom"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
//import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { createAuth0Client } from '@auth0/auth0-spa-js';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
  backgroundColor: '#eb6596', 
}));

export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [auth0Client, setAuth0Client] = React.useState(null);

  React.useEffect(() => {
    const initAuth0 = async () => {
      const client = await createAuth0Client({
        domain: "dev-w0ivmxdqoaz5pywq.us.auth0.com",
        clientId: "0YN1GyKaUk50aMVRGt00sKgCm4UOtocQ",
        redirectUri: window.location.origin + '/callback'
      });
      setAuth0Client(client);
    };

    initAuth0();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
  
    // Validate input fields before proceeding
    if (!validateInputs()) {
      return;
    }
  
    const data = new FormData(event.currentTarget);
    const username = data.get('email'); // Assuming the email is used as the username
    console.log(username);
    const password = data.get('password');
    console.log(password);
  
    // Call the verifyUser endpoint to check credentials
    const verificationResponse = await handleVerifyUser(username, password);
  
    // Check if verification was successful
    if (verificationResponse.success) {
      // Redirect to the dashboard or another page upon successful login
      window.location.href = '/dashboard';
    } else {
      // Show error message if login fails
      setEmailError(true);
      setEmailErrorMessage(verificationResponse.message);
      setPasswordError(true);
      setPasswordErrorMessage('Invalid username or password');
    }
  };
  
  const handleVerifyUser = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3001/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        return { success: true };
      } else {
        return { success: false, message: result.error || 'Authentication failed' };
      }
    } catch (error) {
      //console.error('Error verifying user:', error);
      return { success: false, message: error.message };
    }
  };
  

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleAuth0Login = async () => {
    if (auth0Client) {
      try {
        await auth0Client.loginWithRedirect({
          appState: { returnTo: '/dashboard' }
        });
      } catch (error) {
        console.error('Auth0 Login Error:', error);
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: '#c2185b' }}>
                Email
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{
                  backgroundColor: '#fce4ec',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d81b60',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d81b60',
                    },
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: '#c2185b' }}>
                Password
              </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                sx={{
                  backgroundColor: '#fce4ec',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#d81b60',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d81b60',
                    },
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#4285F4',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#357ae8',
                },
              }}
              onClick={handleAuth0Login}
            >
              Sign in with Auth0
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link to="/CreateAccount">Sign Up</Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}