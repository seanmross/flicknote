import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn } from 'react-animations';
import logo from '../../assets/flick-note-logo-light.svg';
import ytLogo from '../../assets/youtube-logo-light.png';
import googleLogo from '../../assets/google-logo.svg';

const useStyles = makeStyles((theme) => ({
  splash: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: '-150px',
    marginTop: '-150px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    justifyContent: 'center'
  },
  logo: {
    width: '300px',
    height: '80px'
  },
  ytLogo: {
    width: '300px',
    height: '45px'
  },
  signInBtn: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  hidden: {
    opacity: '0'
  }
}));

const animations = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1s'
  }
});

const googleIcon = (
  <Icon>
    <img alt="" src={googleLogo} />
  </Icon>
);

const Splash = ({ onSignIn, loading, isSignedIn }) => {
  const classes = useStyles();

  return (
    <div className={classes.splash}>
      <div className={classes.content}>
        <div className={`${classes.spinner} ${!loading && classes.hidden}`}>
          <CircularProgress color="inherit" />
        </div>
        <img src={logo} alt="" className={`${classes.logo} ${css(animations.fadeIn)}`} />
        <img src={ytLogo} alt="" className={`${classes.ytLogo} ${css(animations.fadeIn)}`} />
        <div className={`${classes.signInBtn} ${(loading || isSignedIn) && classes.hidden}`}>
          <Button
            variant="contained"
            startIcon={googleIcon}
            onClick={onSignIn}
            className={`${css(animations.fadeIn)}`}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Splash;
