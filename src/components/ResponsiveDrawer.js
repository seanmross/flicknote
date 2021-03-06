import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import SearchBar from './SearchBar';
import AccountMenu from './AccountMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Bookmarks, Favorite, Home, Grade, Schedule } from '@material-ui/icons';
import logo from '../assets/flick-note-logo-light.svg';
import ytLogo from '../assets/youtube-logo-light.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(4),
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar, // necessary for content to be below app bar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '1600px',
    margin: '0 auto',
  },
  drawerPaper: {
    width: drawerWidth,
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
  grow: {
    flexGrow: '1'
  },
  accountMenuIcon: {
    marginLeft: theme.spacing(2)
  }
}));

const drawerItems = [
  { name: 'Home', icon: <Home /> },
  { name: 'Bookmarks', icon: <Bookmarks /> },
  { name: 'Favorites', icon: <Favorite /> },
  { name: 'Top Notes', icon: <Grade /> },
  { name: 'Study Later', icon: <Schedule /> },
];

const ResponsiveDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const container = window.document.body;

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  }

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth < 960);
    setOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 960);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        {isMobile && <img src={logo} className={classes.logoImg} alt="" />}
        <div className={classes.grow}></div>
        <IconButton onClick={isMobile ? handleMobileDrawerToggle : handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {drawerItems.slice(0, 1).map(item => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {drawerItems.slice(1).map(item => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
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

      {/* Mobile drawer */}
      <Hidden mdUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          classes={{paper: classes.drawerPaper}}
          ModalProps={{keepMounted: true}}
        >
          {drawer}
        </Drawer>
      </Hidden>

      {/* Desktop drawer */}
      <Hidden smDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}
export default ResponsiveDrawer;
