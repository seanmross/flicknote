import clsx from 'clsx';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import VideoTileDetails from './VideoTileDetails';
import useChannel from '../hooks/useChannel';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '336px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  videoThumbnail: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  videoImg: {
    width: '320px',
    height: '180px'
  },
  duration: {
    position: 'absolute',
    right: '6px',
    bottom: '6px',
    backgroundColor: theme.palette.primary.main,
    padding: '0 4px'
  },
  container: {
    display: 'flex',
    width: '320px'
  },
  channelThumbnail: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  channelImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%'
  },
  videoDetails: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  hide: {
    display: 'none'
  },
  videoThumbnailBackdrop: {
    width: '320px',
    height: '180px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px'
  },
  channelThumbnailBackdrop: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main
  },
  videoDetailsBackdrop: {
    width: '276px',
    height: '92px',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  backdropLine: {
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    borderRadius: '2px'
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

  return (
    <Grid item xs={12} sm={6} md={3} lg={2} xl={1} className={classes.gridItem}>
      <div className={classes.videoThumbnail}>
        <div className={classes.videoThumbnail}></div>
        <img 
          src={snippet.thumbnails.medium.url} 
          className={`${clsx(classes.videoImg, { [classes.hide]: loading })}`} 
          alt="" 
        />
        <div className={`${clsx(classes.duration, { [classes.hide]: loading })}`}>
          {duration(contentDetails.duration)}
        </div>
        <div className={`${clsx(classes.videoThumbnailBackdrop, { [classes.hide]: !loading })}`}>
        </div>
      </div>
      <div className={classes.container}>
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
        <div className={`${clsx(classes.videoDetails, { [classes.hide]: loading })}`}>
          <VideoTileDetails video={video} />
        </div>
        <div className={`${clsx(classes.videoDetailsBackdrop, { [classes.hide]: !loading })}`}>
          <div className={classes.backdropLine} style={{width: '90%'}}></div>
          <div className={classes.backdropLine} style={{width: '60%'}}></div>
        </div>
      </div>
    </Grid>
  );
}
export default VideoTile;
