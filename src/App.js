import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import logo from './assets/logo-dark.svg';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1e1e1e',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ff4d4d',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar color="primary">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className={classes.logo}>
              <img src={logo} />
            </div>
            <Button color="secondary">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
export default App;
