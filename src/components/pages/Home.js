import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import youtube from '../../api/youtube';

const Home = () => {
  const [videos, setVideos] = useState([]);
  
  const getVideos = async () => {
    const { data } = await youtube.get('/videos');
    setVideos(data.items);
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
      <Typography variant="h4">home</Typography>
      <ul>
        {videos.map(video => <li key={video.id}>{video.snippet.title}</li>)}
      </ul>
    </div>
    
  );
}
export default Home;
