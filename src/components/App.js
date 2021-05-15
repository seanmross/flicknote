import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, 
  Route, Redirect, Switch } from 'react-router-dom';
import theme from '../config/theme';
import ResponsiveDrawer from './nav/ResponsiveDrawer';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import Favorites from './pages/Favorites';
import TopNotes from './pages/TopNotes';
import StudyLater from './pages/StudyLater';

// firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FIREBASE_CONFIG } from '../config/firebase';
import Watch from './pages/Watch';

// firebase config
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [accessToken, setAccessToken] = useState(null);

  const onSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
    const userCredential = await auth.signInWithPopup(provider);
    setAccessToken(userCredential.credential.accessToken);
    console.log(accessToken)
  }

  const onSignOut = () => {
    auth.signOut();
  }

  const mainContent = (
    <Router>
      <ResponsiveDrawer onSignOut={onSignOut} user={user}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/top-notes" component={TopNotes} />
          <Route path="/study-later" component={StudyLater} />
          <Route path="/watch/:videoId" component={Watch} />
          <Redirect to="/" />
        </Switch>
      </ResponsiveDrawer>
    </Router>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user ? mainContent : 
        <Splash onSignIn={onSignIn} loading={loading} user={user} />}
    </ThemeProvider>
  );
}
export default App;
