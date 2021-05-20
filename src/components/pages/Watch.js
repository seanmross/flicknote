import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from '../video-player/VideoPlayer';
import WatchInfo from '../watch-info/WatchInfo';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Notes from '../notes/Notes';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1500px',
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  watchInfoContainer: {
    backgroundColor: theme.palette.primary.main
  },
}));

const Watch = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  const theme = useTheme();
  const bpMatches = useMediaQuery(theme.breakpoints.up('sm'));

  const mobile = (videoId) => (
    <Grid container>
      <Grid item xs={12}>
        <VideoPlayer videoId={videoId} />
      </Grid>
      <Grid item xs={12}>
        <WatchInfo videoId={videoId} />
      </Grid>
      <Grid item xs={12}>
        <Notes />
      </Grid>
    </Grid>
  );

  const desktop = (videoId) => (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <VideoPlayer videoId={videoId} />
        <Notes />
      </Grid>
      <Grid item md={4}>
        <WatchInfo videoId={videoId} />
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      {bpMatches ? desktop(videoId) : mobile(videoId)}
    </div>
  );
}
export default Watch;
