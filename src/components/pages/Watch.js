import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import WatchInfo from '../watch-info/WatchInfo';
import Notes from '../notes/Notes';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1280px',
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
  aspectWrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingTop: '56.25%', /* 16:9 Aspect Ratio */
  },
  iframe: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px',
    border: '0',
  }
}));

const Watch = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  const theme = useTheme();
  const bpMatches = useMediaQuery(theme.breakpoints.up('md'));
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const onPlayerReady = event => {
      console.log('player ready');
    };

    const loadVideo = () => {
      const player = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
      setPlayer(player);
    };

    if (videoId) {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
  
        window.onYouTubeIframeAPIReady = loadVideo;
  
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else { 
        loadVideo();
      }
    }
  }, [videoId]);

  const renderPlayer = (videoId) => (
    <div className={classes.aspectWrapper}>
      <div id={`youtube-player-${videoId}`} className={classes.iframe} />
    </div>
  );
  
  const renderMobile = (videoId) => (
    <Grid container>
      <Grid item xs={12}>
        {renderPlayer(videoId)}
      </Grid>
      <Grid item xs={12}>
        <WatchInfo videoId={videoId} />
      </Grid>
      <Grid item xs={12}>
        <Notes player={player} />
      </Grid>
    </Grid>
  );

  const renderDesktop = (videoId) => (
    <Grid container spacing={3}>
      <Grid item md={8}>
        {renderPlayer(videoId)}
        <Notes player={player} />
      </Grid>
      <Grid item md={4}>
        <WatchInfo videoId={videoId} />
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      {bpMatches ? renderDesktop(videoId) : renderMobile(videoId)}
    </div>
  );
}
export default Watch;
