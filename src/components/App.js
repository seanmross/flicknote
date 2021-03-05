import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../config/theme';
import ResponsiveDrawer from './ResponsiveDrawer';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveDrawer />
    </ThemeProvider>
  );
}
export default App;
