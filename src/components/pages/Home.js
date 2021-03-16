import { useEffect, useState } from 'react';
import youtube from '../../api/youtube';
import VideoTile from '../VideoTile';
import Grid from '@material-ui/core/Grid';

const Home = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const { data } = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 10
      }
    });
    setVideos(data.items);
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Grid container spacing={2}>
      {videos.map(video => (
        <VideoTile video={video} key={video.id}></VideoTile>
      ))}
    </Grid>
  );
}
export default Home;
