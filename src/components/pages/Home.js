import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import youtube from '../../api/youtube';

const Home = () => {
  const [videos, setVideos] = useState([]);
  
  const getVideos = async (q) => {
    const { data } = await youtube.get('/search', {
      params: { q }
    });
    setVideos(data.items);
  }

  useEffect(() => {
    getVideos('game of thrones');
  }, []);

  return (
    <div>
      <Typography variant="h4">home</Typography>
      <ul>
        {videos.map(video => <li key={video.id.videoId}>{video.snippet.title}</li>)}
      </ul>
    </div>
    
  );
}
export default Home;
