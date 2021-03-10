import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../config/theme';
import ResponsiveDrawer from './nav/ResponsiveDrawer';
import Splash from './pages/Splash';

// firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// firebase config
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyA2AG9Srr56VotdORkGDNCwUpHzD78EmE4",
    authDomain: "flicknote-7a643.firebaseapp.com",
    projectId: "flicknote-7a643",
    storageBucket: "flicknote-7a643.appspot.com",
    messagingSenderId: "27120572529",
    appId: "1:27120572529:web:62da7b36aba7842e84a3d0",
    measurementId: "G-0NVN21QJV0"
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

const App = () => {
  const [user, loading] = useAuthState(auth);

  const onSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  const onSignOut = () => {
    auth.signOut();
  }

  console.log(user)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user ? 
        <ResponsiveDrawer onSignOut={onSignOut} user={user} /> : 
        <Splash onSignIn={onSignIn} loading={loading} user={user} />}
    </ThemeProvider>
  );
}
export default App;
