import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
// import NavBar from '../components/NavBar';
import theme from '../config/theme';
import MuiNavBar from '../components/MuiNavBar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiNavBar />      
    </ThemeProvider>
  );
}
export default App;
