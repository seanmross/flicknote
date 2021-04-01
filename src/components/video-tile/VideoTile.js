import clsx from 'clsx';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useChannel from '../../hooks/useChannel';
import VideoTileBar from './VideoTileBar';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    '&:hover': {
      cursor: 'pointer',
      '& img.blur': {
        filter: 'blur(2px)'
      },
    },
  },
  gridItemWrapper: {
    width: '100%'
  },
  videoThumbnail: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  videoImg: {
    width: '100%'
  },
  hide: {
    display: 'none'
  },
  duration: {
    position: 'absolute',
    right: '6px',
    bottom: '6px',
    backgroundColor: theme.palette.primary.main,
    padding: '0 4px'
  },
  videoThumbnailBackdrop: {
    width: '320px',
    height: '180px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px'
  },
}));

const VideoTile = ({ video }) => {
  const classes = useStyles();
  const { snippet, contentDetails } = video;
  const [channel, loading] = useChannel(video.snippet.channelId);
  const history = useHistory();

  const duration = (dur) => {
    const secs = moment.duration(dur).asSeconds();
    return moment.utc(secs * 1000).format('mm:ss');
  }

  const handleSelectVideo = () => {
    history.push(`/watch/${video.id}`);
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.gridItem}>
      <div onClick={handleSelectVideo} className={classes.gridItemWrapper}>
        <div className={classes.videoThumbnail}>
          <img 
            src={snippet.thumbnails.medium.url} 
            className={`${clsx(classes.videoImg, { [classes.hide]: loading })} blur`} 
            alt="" 
          />
          <div className={`${clsx(classes.videoThumbnailBackdrop, { [classes.hide]: !loading })}`}>
          </div>
          <div className={`${clsx(classes.duration, { [classes.hide]: loading })}`}>
            {duration(contentDetails.duration)}
          </div>
        </div>
        <VideoTileBar video={video} channel={channel} loading={loading} />
      </div>
    </Grid>
  );
}
export default VideoTile;
