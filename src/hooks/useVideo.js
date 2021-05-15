import { useState, useEffect } from 'react';
import youtube from '../api/youtube';

/**
 * Fetch a single video
 */
const useVideo = (id) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }

  return [video, loading];
}
export default useVideo;