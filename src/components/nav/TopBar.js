import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import AccountMenu from './AccountMenu';
import logo from '../../assets/flick-note-logo-light.svg';
import ytLogo from '../../assets/youtube-logo-light.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(4),
    },
  },
  grow: {
    flexGrow: '1'
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  logoImg: {
    width: '125px',
    [theme.breakpoints.up('md')]: {
      width: '150px',
    },
  },
  accountMenuIcon: {
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  userPhoto: {
    height: '32px',
    width: '32px',
    borderRadius: '50%'
  }
}));

const TopBar = (props) => {
  const classes = useStyles();
  const { user, isMobile, handleMobileDrawerToggle, 
    handleDrawerToggle, onSignOut } = props;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={isMobile ? handleMobileDrawerToggle : handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <img src={logo} alt="logo" className={classes.logoImg} />
          </div>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.logo}>
            <img src={ytLogo} alt="logo" width="200px" />
          </div>
          <IconButton
            edge="end"
            onClick={handleMenuOpen}
            color="inherit"
            className={classes.accountMenuIcon}
          >
            {user ? <img src={user.photoURL} className={classes.userPhoto} alt="" /> : <AccountCircle />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <AccountMenu 
        anchorEl={menuAnchorEl} 
        handleMenuClose={handleMenuClose}
        onSignOut={onSignOut}
        user={user}
      />
    </>
  );
}
export default TopBar;
