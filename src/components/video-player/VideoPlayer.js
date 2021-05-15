import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '1067px',
    maxHeight: '600px'
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

const VideoPlayer = ({ videoId }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.aspectWrapper}>
        <iframe 
          className={classes.iframe}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
        >
        </iframe>
      </div>
    </div>
  );
}
export default VideoPlayer;
