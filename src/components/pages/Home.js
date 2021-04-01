import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import VideoTile from '../video-tile/VideoTile';
import useVideos from '../../hooks/useVideos';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2)
  }
}));

const Home = () => {
  const classes = useStyles();
  const [videos, getNextVideos] = useVideos();

  const spinner = (
    <div className={classes.spinner}>
      <CircularProgress color="secondary" />
    </div>
  );

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getNextVideos}
      hasMore={false}
      loader={spinner}
      scrollThreshold={1}
    >
      <Grid container spacing={3} className={classes.container}>
        {videos && videos.map((video) => (
          <VideoTile video={video} key={video.id} />
        ))}  
      </Grid>
    </InfiniteScroll>
  );
}
export default Home;
