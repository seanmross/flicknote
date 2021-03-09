import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../config/theme';
import ResponsiveDrawer from './nav/ResponsiveDrawer';
import SplashScreen from './SplashScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    window.setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showSplash ? <SplashScreen /> : <ResponsiveDrawer />}
    </ThemeProvider>
  );
}
export default App;
