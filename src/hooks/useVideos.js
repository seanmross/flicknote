import { useState, useEffect } from 'react';
import youtube from '../api/youtube';

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const { data } = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 12,
        pageToken: ''
      }
    });
    setVideos(data.items);
    setPageToken(data.nextPageToken);
  }

  const getNextVideos = async () => {
    const { data } = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 1,
        pageToken,
      }
    });
    setVideos([...videos, ...data.items]);
    setPageToken(data.nextPageToken);
  }

  return [videos, getNextVideos];
}
export default useVideos;