import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Bookmarks, Favorite, Home, Grade, WatchLater } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../../assets/flick-note-logo-light.svg';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar, // necessary for content to be below app bar
  },
  grow: {
    flexGrow: '1'
  },
  logoImg: {
    width: '125px',
    [theme.breakpoints.up('md')]: {
      width: '150px',
    },
  },
}));

const drawerItems = [
  { name: 'Home', icon: <Home />, link: '/' },
  { name: 'Bookmarks', icon: <Bookmarks />, link: '/bookmarks' },
  { name: 'Favorites', icon: <Favorite />, link: 'favorites' },
  { name: 'Top Notes', icon: <Grade />, link: '/top-notes' },
  { name: 'Study Later', icon: <WatchLater />, link: '/study-later' },
];

const DrawerContent = ({isMobile, handleMobileDrawerToggle, handleDrawerToggle}) => {
  const classes = useStyles();

  const renderLink = (item) => (
    <ListItem button component={Link} to={item.link} key={item.name}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );

  return (
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
        {drawerItems.slice(0, 1).map(item => renderLink(item))}
      </List>
      <Divider />
      <List>
        {drawerItems.slice(1).map(item => renderLink(item))}
      </List>
    </div>
  );
}
export default DrawerContent;
