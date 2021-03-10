import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../config/theme';
import ResponsiveDrawer from './nav/ResponsiveDrawer';
import SplashScreen from './SplashScreen';

// firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// react-firebase-hooks
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
  const [loading, setLoading] = useState(null);
  const [showSplash, setShowSplash] = useState(null);
  const [user] = useAuthState(auth);
  
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }

  const signOut = () => {
    auth.signOut();
    loadSession();
  }

  const loadSession = () => {
    setShowSplash(true);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      setShowSplash(false);
    }
  }, [loading, user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showSplash ? 
        <SplashScreen loading={loading} user={auth.currentUser} onSignIn={signInWithGoogle} /> : 
        <ResponsiveDrawer onSignOut={signOut} />}
    </ThemeProvider>
  );
}
export default App;
