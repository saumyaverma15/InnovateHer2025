import React from 'react';
import './App.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { authConfig } from './authConfig';
import SignIn from './login/Signin';
import CreateAccount from './login/CreateAccount';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>

      <Routes>


        <Route path="/" element={<SignIn/>}/>

        <Route path="/CreateAccount" element={<CreateAccount/>}/>

      </Routes>
    </Router>

    
  );
}

export default App;

