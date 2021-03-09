import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import AccountMenu from './AccountMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from '../../assets/flick-note-logo-light.svg';
import ytLogo from '../../assets/youtube-logo-light.png';

const TopBar = (props) => {
  const {classes, open, isMobile, handleMobileDrawerToggle, handleDrawerToggle, 
    handleAccountMenuOpen, anchorEl, handleMenuClose } = props;
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {[classes.appBarShift]: open && !isMobile})}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={isMobile ? handleMobileDrawerToggle : handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, {[classes.hide]: open})}
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
            onClick={handleAccountMenuOpen}
            color="inherit"
            className={classes.accountMenuIcon}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AccountMenu 
        anchorEl={anchorEl} 
        handleMenuClose={handleMenuClose} 
      />
    </>
  );
}
export default TopBar;
