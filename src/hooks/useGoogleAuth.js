import { useState, useEffect } from 'react';

const CLIENT_ID = '41327560252-sehu73ve1ghd0kl1apkg54gt6vpld31n.apps.googleusercontent.com';

const useGoogleAuth = () => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    setLoading(true);
    window.gapi.load('client:auth2', init);
  }, []);

  const init = async () => {
    await window.gapi.client.init({
      clientId: CLIENT_ID,
      scope: 'email'
    });
    setAuth(window.gapi.auth2.getAuthInstance());
    setLoading(false);
  }

  useEffect(() => {
    if (auth) {
      onAuthChange(auth.isSignedIn.get());
      auth.isSignedIn.listen(() => {
        onAuthChange(auth.isSignedIn.get());
      });
    }
  }, [auth]);

  const onAuthChange = (isAuth) => {
    setIsSignedIn(isAuth);
  }

  return [auth, loading, isSignedIn];
}
export default useGoogleAuth;