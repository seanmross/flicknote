import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo-dark.svg';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    }
  },
  branding: {
    display: 'flex',
    flexGrow: 1,
  },
  logo: {
    width: '125px',
    [theme.breakpoints.up('sm')]: {
      width: '150px',
    }
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar color="primary">
        <IconButton edge="start" className={classes.menuButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <div className={classes.branding}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <Button color="secondary">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
