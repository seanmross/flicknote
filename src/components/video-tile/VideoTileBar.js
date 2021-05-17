import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Bookmarks, WatchLater } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import './VideoTileBar.scss';
import formatNum from '../../util/formatNum';
import formatPublishedAt from '../../util/formatPublishedAt';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  hide: {
    display: 'none'
  },
  channelThumbnail: {
    paddingRight: theme.spacing(1.5),
  },
  channelImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%'
  },
  channelThumbnailBackdrop: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main
  },
  videoDetails: {
    flexGrow: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  videoTitle: {
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: theme.palette.text.secondary
  },
  bullet: {
    margin: '0 4px'
  },
  backdropLine: {
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    borderRadius: '2px'
  },
  menuButton: {
    opacity: 0,
    transition: 'opacity 300ms ease-in-out'
  },
  reveal: {
    opacity: 1
  }
}));

const VideoTileBar = ({ video, channel, loading }) => {
  const { snippet, statistics } = video;
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
  const transformOrigin = { vertical: 'top', horizontal: 'right' };

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setMenuAnchorEl(null);
  }

  return (
    <div className={classes.container}>
      {/* Channel thumbnail */}
      <div className={classes.channelThumbnail}>
        {channel && 
          <img 
            src={channel.snippet.thumbnails.default.url} 
            className={`${clsx(classes.channelImg, { [classes.hide]: loading })}`} 
            alt=""
          />
        }
        <div className={`${clsx(classes.channelThumbnailBackdrop, { [classes.hide]: !loading })}`}></div>
      </div>
      
      {/* Metadata */}
      <div className={classes.videoDetails}>
        <div className={`${clsx({ [classes.hide]: loading })}`}>
          <div className={classes.header}>
            <Typography variant="body1" className={`${classes.videoTitle} clamp-lines`}>
              {snippet.title}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.subHeaderText}>
            {snippet.channelTitle}
          </Typography>
          <Typography variant="body2" className={classes.subHeaderText}>
            {formatNum(statistics.viewCount)} views 
            <span className={classes.bullet}>•</span> 
            {formatPublishedAt(snippet.publishedAt)}
          </Typography>
        </div>
        <div className={`${clsx({ [classes.hide]: !loading })}`}>
          <div className={classes.backdropLine} style={{width: '90%'}}></div>
          <div className={classes.backdropLine} style={{width: '60%'}}></div>
        </div>
      </div>

      {/* Menu */}
      <div>
        <IconButton 
          className={`
            ${classes.menuButton}  
            hover-reveal
            ${clsx({ [classes.reveal]: menuAnchorEl !== null })}`
          } 
          size="small" 
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Bookmarks fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Save to Bookmarks</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <WatchLater fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Add to Study later</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
export default VideoTileBar;
