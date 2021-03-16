import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import ClampLines from 'react-clamp-lines';
import youtube from '../api/youtube';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container: {
    display: 'flex'
  },
  channelThumbnail: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  channelPhoto: {
    width: '36px',
    height: '36px',
    borderRadius: '50%'
  },
  videoDetails: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  videoTitle: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 'bold'
  },
  subHeaderText: {
    color: theme.palette.text.secondary
  },
  bullet: {
    margin: '0 2px'
  }
}))

const VideoTile = ({ video }) => {
  const classes = useStyles();
  const [channelInfo, setChannelInfo] = useState(null);
  const { snippet, statistics, contentDetails } = video;

  useEffect(() => {
    if (video) {
      getChannelInfo(video.snippet.channelId);
    }
  }, [video]);

  const getChannelInfo = async (id) => {
    const { data } = await youtube.get('/channels', {
      params: {
        part: 'snippet',
        id
      }
    });
    setChannelInfo(data.items.shift())
  }

  const duration = (dur) => {
    const secs = moment.duration(dur).asSeconds();
    return moment.utc(secs * 1000).format('mm:ss');
  }

  const views = (viewCount) => {
    return numeral(viewCount).format('0.a').toUpperCase();
  }

  const published = (publishedAt) => {
    return moment(publishedAt).fromNow();
  }

  return (
    <Grid item xs={12} className={classes.gridItem}>
      <img src={snippet.thumbnails.medium.url} alt=""/>
      <div className={classes.container}>
        <div className={classes.channelThumbnail}>
          {channelInfo ? 
            <img src={channelInfo.snippet.thumbnails.default.url} className={classes.channelPhoto} alt=""/> : 
            <AccountCircle style={{ fontSize: 36 }} />}
        </div>
        <div className={classes.videoDetails}>
          <ClampLines
            text={snippet.title}
            id={video.id}
            lines={2}
            buttons={false}
            ellipsis="..."
            className={classes.videoTitle} 
          />
          <Typography variant="body2" className={classes.subHeaderText}>
            {snippet.channelTitle}
          </Typography>
          <Typography variant="body2" className={classes.subHeaderText}>
            {views(statistics.viewCount)} views <span className={classes.bullet}>•</span> {published(snippet.publishedAt)}
          </Typography>
          {/* <Typography>{duration(contentDetails.duration)}</Typography> */}
        </div>
      </div>
    </Grid>
  );
}
export default VideoTile;
