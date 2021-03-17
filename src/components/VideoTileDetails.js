import { useState } from 'react';
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
  flex: {
    display: 'flex'
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
}));

const VideoTileDetails = ({ video }) => {
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
    setMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  }

  return (
    <div>
      <div className={classes.flex}>
        <Typography variant="body1" className={`${classes.videoTitle} line-clamp`}>
          {snippet.title}
        </Typography>
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
      <Typography variant="body2" className={classes.subHeaderText}>
        {snippet.channelTitle}
      </Typography>
      <Typography variant="body2" className={classes.subHeaderText}>
        {views(statistics.viewCount)} views <span className={classes.bullet}>•</span> {published(snippet.publishedAt)}
      </Typography>
    </div>
  );
}
export default VideoTileDetails;

