import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import useChannel from '../../hooks/useChannel';
import VideoTileBar from './VideoTileBar';
import backdropImg from '../../assets/video-thumbnail-backdrop.png';
import './VideoTile.scss';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  link: {
    width: '100%',
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  thumbnailContainer: {
    position: 'relative'
  },
  thumbnailImg: {
    width: '100%'
  },
  thumbnailBackdrop: {
    width: '100%',
    borderRadius: '3px'
  },
  hide: {
    display: 'none'
  },
  duration: {
    position: 'absolute',
    right: '6px',
    bottom: '10px',
    backgroundColor: theme.palette.primary.main,
    padding: '0 5px'
  },
}));

const VideoTile = ({ video }) => {
  const classes = useStyles();
  const { snippet, contentDetails } = video;
  const [channel, loading] = useChannel(video.snippet.channelId);

  const duration = (dur) => {
    const secs = moment.duration(dur).asSeconds();
    return moment.utc(secs * 1000).format('mm:ss');
  }

  const thumbnail = (
    <React.Fragment>
      <img 
        src={snippet.thumbnails.medium.url} 
        className={classes.thumbnailImg} 
        alt="" 
      />
      <div className="overlay">
        <PlayCircleFilledIcon style={{ fontSize: 60 }} />
      </div>
      <div className={classes.duration}>
        {duration(contentDetails.duration)}
      </div>
    </React.Fragment>
  );

  const backdrop = (
    <img 
      src={backdropImg} 
      className={classes.thumbnailBackdrop} 
      alt="" 
    />
  );

  return (
    <Grid 
      item xs={12} sm={6} md={4} lg={3} xl={2} 
      className={classes.gridItem}
    >
      <div className="video-tile-overlay-container">
        <Link className={classes.link} to={`/watch/${video.id}`}>
          <div className={classes.thumbnailContainer}>
            {loading ? backdrop : thumbnail}
          </div>
          <VideoTileBar video={video} channel={channel} loading={loading} />
        </Link>
      </div>
    </Grid>
  );
}
export default VideoTile;
