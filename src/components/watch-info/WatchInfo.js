import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useVideo from '../../hooks/useVideo';
import useChannel from '../../hooks/useChannel';
import Typography from '@material-ui/core/Typography';
import formatNum from '../../util/formatNum';
import formatPublishedAt from '../../util/formatPublishedAt';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2)
  },
  stats: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
  },
  bullet: {
    margin: '0 4px'
  },
  channelInfo: {
    display: 'flex'
  },
  channelImg: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginRight: theme.spacing(1.5)
  },
  channelTitle: {
    fontWeight: 'bold'
  },
  subscribers: {
    color: theme.palette.text.secondary
  }
}));

const WatchInfo = ({ videoId }) => {
  const classes = useStyles();
  const [video, videoLoading] = useVideo(videoId);
  const [channel, channelLoading] = useChannel(video?.snippet.channelId);

  return (
    <div className={classes.root}>
      {video && channel && (
        <>
          <Typography variant="h6">{video.snippet.title}</Typography>
          <Typography variant="body2" className={classes.stats}>
            {formatNum(video.statistics.viewCount)} views 
            <span className={classes.bullet}>•</span> 
            {formatPublishedAt(video.snippet.publishedAt)}
          </Typography>
          <div className={classes.channelInfo}>
            <img 
              className={classes.channelImg}
              src={channel.snippet.thumbnails.default.url}  
              alt=""
            />
            <div>
              <Typography variant="body1" className={classes.channelTitle}>
                {channel.snippet.title}
              </Typography>
              <Typography variant="body2" className={classes.subscribers}>
                {formatNum(channel.statistics.subscriberCount)} subscribers
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default WatchInfo;
