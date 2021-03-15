import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerContent from './DrawerContent';
import TopBar from './TopBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.primary.main,
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
  mobileDrawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main
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
}));

const ResponsiveDrawer = ({ onSignOut, user, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <div className={classes.root}>
      <TopBar 
        isMobile={isMobile} 
        handleMobileDrawerToggle={handleMobileDrawerToggle}
        handleDrawerToggle={handleDrawerToggle}
        handleAccountMenuOpen={handleAccountMenuOpen} 
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose} 
        onSignOut={onSignOut}
        user={user}
      />

      {/* Mobile drawer */}
      <Hidden mdUp>
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          classes={{paper: classes.mobileDrawerPaper}}
          ModalProps={{keepMounted: true}}
        >
          <DrawerContent 
            isMobile={isMobile} 
            handleMobileDrawerToggle={handleMobileDrawerToggle} 
            handleDrawerToggle={handleDrawerToggle}
          />
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
          <DrawerContent 
            isMobile={isMobile} 
            handleMobileDrawerToggle={handleMobileDrawerToggle} 
            handleDrawerToggle={handleDrawerToggle} 
          />
        </Drawer>
      </Hidden>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
export default ResponsiveDrawer;
