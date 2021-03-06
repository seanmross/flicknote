import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/flick-note-logo-light.svg';
import ytLogo from '../assets/youtube-logo-light.png';
import { StyleSheet, css } from 'aphrodite';
import { fadeInDown, fadeInUp } from 'react-animations';

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
    marginTop: '-62.5px',
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
}));

const animations = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '2s'
  },
  fadeInUp: {
    animationName: fadeInUp,
    animationDuration: '2s'
  }
});

const SplashScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.splash}>
      <div className={classes.content}>
        <img src={logo} alt="" className={`${classes.logo} ${css(animations.fadeInDown)}`} />
        <img src={ytLogo} alt="" className={`${classes.ytLogo} ${css(animations.fadeInUp)}`} />
      </div>
    </div>
  );
}
export default SplashScreen;
