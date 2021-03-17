import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import youtube from '../../api/youtube';
import VideoTile from '../VideoTile';

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },
  },
  hide: {
    display: 'none'
  },
}));

const Home = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const { data } = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 12
      }
    });
    setVideos(data.items);
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Grid container spacing={3} className={classes.container}>
      {videos && videos.map((video, idx) => (
        <VideoTile video={video} key={video.id}></VideoTile>
      ))}
    </Grid>
  );
}
export default Home;
