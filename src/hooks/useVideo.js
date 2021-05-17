import { useState, useEffect } from 'react';
import youtube from '../api/youtube';

/**
 * Fetch a single video
 */
const useVideo = (id) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getVideo(id);
  }, [id]);

  const getVideo = async (id) => {
    const { data } = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id
      }
    });
    setVideo(data.items[0]);
  }

  return [video];
}
export default useVideo;