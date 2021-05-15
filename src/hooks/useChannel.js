import { useState, useEffect } from 'react';
import youtube from '../api/youtube';

const useChannel = (channelId) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChannel(channelId);
  }, [channelId]);

  const getChannel = async (id) => {
    const { data } = await youtube.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id
      }
    });
    setChannel(data.items.shift());
    setLoading(false);
  }

  return [channel, loading];
}
export default useChannel;