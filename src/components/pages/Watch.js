import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from '../video-player/VideoPlayer';
import WatchInfo from '../watch-info/WatchInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1515px',
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  watchInfoContainer: {
    backgroundColor: theme.palette.primary.main
  }
}));

const Watch = () => {
  const classes = useStyles();
  const { videoId } = useParams();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <VideoPlayer videoId={videoId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <WatchInfo videoId={videoId} />
        </Grid>
      </Grid>
    </div>
  );
}
export default Watch;
