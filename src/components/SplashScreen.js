import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { StyleSheet, css } from 'aphrodite';
import { fadeIn, fadeInDown, fadeInUp } from 'react-animations';
import logo from '../assets/flick-note-logo-light.svg';
import ytLogo from '../assets/youtube-logo-light.png';
import googleLogo from '../assets/google-logo.svg';
import Icon from "@material-ui/core/Icon";

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
    marginTop: '-100px',
    display: 'flex',
    flexDirection: 'column'
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
    marginTop: theme.spacing(4)
  }
}));

const animations = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '1s'
  },
  fadeInUp: {
    animationName: fadeInUp,
    animationDuration: '1s'
  },
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

const SplashScreen = ({ loading, user, onSignIn }) => {
  const classes = useStyles();

  const renderLoginBtn = () => {
    if (!loading && !user) {
      return (
        <Button
          variant="contained"
          startIcon={googleIcon}
          onClick={onSignIn}
          className={`${classes.signInBtn} ${css(animations.fadeIn)}`}
        >
          Sign in with Google
        </Button>
      );
    } else {
      return null;
    }
  }

  return (
    <div className={classes.splash}>
      <div className={classes.content}>
        <img src={logo} alt="" className={`${classes.logo} ${css(animations.fadeInDown)}`} />
        <img src={ytLogo} alt="" className={`${classes.ytLogo} ${css(animations.fadeInUp)}`} />
        {renderLoginBtn()}
      </div>
      
    </div>
  );
}
export default SplashScreen;
