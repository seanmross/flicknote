import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DrawerContent from './DrawerContent';
import TopBar from './TopBar';
import useWindowSize from '../../hooks/useWindowSize';

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
  mainContent: {
    flexGrow: 1,
    padding: '0',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
    margin: '0 auto',
  },
}));

const ResponsiveDrawer = ({ onSignOut, user, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const windowSize = useWindowSize();
  const container = window.document.body;

  const handleDrawerToggle = () => {
    setOpen(!open);
  }

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (windowSize) {
      setIsMobile(windowSize.width < 1280);
    }
    setOpen(false);
    setMobileOpen(false);
  }, [windowSize]);

  return (
    <div className={classes.root}>
      <TopBar 
        isMobile={isMobile} 
        handleMobileDrawerToggle={handleMobileDrawerToggle}
        handleDrawerToggle={handleDrawerToggle}
        onSignOut={onSignOut}
        user={user}
      />

      {/* Mobile drawer */}
      <Hidden lgUp>
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
      <Hidden mdDown>
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
      
      <main className={classes.mainContent}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
export default ResponsiveDrawer;
