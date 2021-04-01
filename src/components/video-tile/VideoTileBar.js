import { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import numeral from 'numeral';
import { makeStyles } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Bookmarks, WatchLater } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import './VideoTileDetails.scss';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    paddingTop: theme.spacing(1)
  },
  channelThumbnail: {
    paddingRight: theme.spacing(1.5),
  },
  channelImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%'
  },
  hide: {
    display: 'none'
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
  // videoDetailsBackdrop: {
  //   width: '276px',
  //   height: '92px',
  //   paddingTop: theme.spacing(1),
  //   paddingLeft: theme.spacing(1),
  // },
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
    margin: '0 2px'
  },
  backdropLine: {
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    borderRadius: '2px'
  },
}));

const VideoTileBar = ({ video, channel, loading }) => {
  const { snippet, statistics } = video;
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
  const transformOrigin = { vertical: 'top', horizontal: 'right' };

  const views = (viewCount) => {
    return numeral(viewCount).format('0.a').toUpperCase();
  }

  const published = (publishedAt) => {
    return moment(publishedAt).fromNow();
  }

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setMenuAnchorEl(null);
  }

  return (
    <div className={classes.container}>
      {/* Channel thumbnail */}
      <div className={classes.channelThumbnail}>
        {channel && 
          <img 
            src={channel.snippet.thumbnails.default.url} 
            className={`${clsx(
              classes.channelImg, 
              { [classes.hide]: loading })
            }`} 
            alt=""
          />
        }
        <div className={`${clsx(classes.channelThumbnailBackdrop, { [classes.hide]: !loading })}`}></div>
      </div>
      
      {/* Metadata */}
      <div className={classes.videoDetails}>
        <div className={`${clsx({ [classes.hide]: loading })}`}>
          <div className={classes.header}>
            <Typography variant="body1" className={`${classes.videoTitle} line-clamp`}>
              {snippet.title}
            </Typography>
          </div>
          <Typography variant="body2" className={classes.subHeaderText}>
            {snippet.channelTitle}
          </Typography>
          <Typography variant="body2" className={classes.subHeaderText}>
            {views(statistics.viewCount)} views <span className={classes.bullet}>•</span> {published(snippet.publishedAt)}
          </Typography>
        </div>
        <div className={`${clsx({ [classes.hide]: !loading })}`}>
          <div className={classes.backdropLine} style={{width: '90%'}}></div>
          <div className={classes.backdropLine} style={{width: '60%'}}></div>
        </div>
      </div>

      {/* Menu */}
      <div>
        <IconButton onClick={handleMenuOpen}>
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
            <Typography variant="inherit">Save to Study later</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
export default VideoTileBar;
