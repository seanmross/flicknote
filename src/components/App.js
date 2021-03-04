import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../components/NavBar';
import theme from '../config/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />      
    </ThemeProvider>
  );
}
export default App;
